import Razorpay from 'razorpay'
import crypto from 'crypto'
import Order from '../models/Order.js'

const getRazorpayInstance = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })

// POST /api/payments/create-order  (requires auth)
// Creates a Razorpay order for a given amount, to be paid via Razorpay Checkout on the frontend
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body
    if (!amount || !orderId) {
      return res.status(400).json({ message: 'amount and orderId are required' })
    }

    const order = await Order.findById(orderId)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized for this order' })
    }

    const razorpay = getRazorpayInstance()
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: 'INR',
      receipt: `receipt_${orderId}`,
    })

    res.status(201).json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/payments/verify  (requires auth)
// Verifies the payment signature Razorpay Checkout returns, then marks the order as paid
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed: signature mismatch' })
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: 'paid', status: 'preparing' },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })

    const io = req.app.get('io')
    if (io) io.to(`order_${order._id}`).emit('orderStatusUpdate', order)

    res.json({ message: 'Payment verified successfully', order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
