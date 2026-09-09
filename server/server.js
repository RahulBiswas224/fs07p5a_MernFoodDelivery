import dotenv from 'dotenv'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import connectDB from './config/db.js'
import app from './app.js'

dotenv.config()

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

// Connect to MongoDB
connectDB()

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
