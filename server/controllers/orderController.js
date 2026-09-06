import Order from '../models/Order.js'

// POST /api/orders  (requires auth — creates order for logged-in user)
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' })
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    })

    // Emit real-time event so the user's order-tracking view updates instantly (Sprint 6)
    const io = req.app.get('io')
    if (io) io.to(`order_${order._id}`).emit('orderStatusUpdate', order)

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/orders/my  (requires auth — logged-in user's own order history)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.menuItem', 'name price')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/orders/:id  (requires auth — must be the order's owner)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItem', 'name price')
    if (!order) return res.status(404).json({ message: 'Order not found' })

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' })
    }

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/orders/:id/status  (admin only — update order status, e.g. from a delivery dashboard)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })

    // Push the update to anyone tracking this order in real time
    const io = req.app.get('io')
    if (io) io.to(`order_${order._id}`).emit('orderStatusUpdate', order)

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
