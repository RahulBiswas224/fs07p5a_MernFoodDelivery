import express from 'express'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/my', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus)

export default router
