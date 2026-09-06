import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

const app = express()
const server = http.createServer(app)

// Socket.io setup for real-time order tracking
const io = new SocketIOServer(server, {
  cors: { origin: '*' },
})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  // Client joins a room specific to the order they want to track
  socket.on('trackOrder', (orderId) => {
    socket.join(`order_${orderId}`)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Make io accessible in route controllers via req.app.get('io')
app.set('io', io)

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Food Delivery API is running' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong on the server' })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
