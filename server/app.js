import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

// Express app is built here, separately from server.js, so tests can
// import and exercise it with supertest without opening a real port
// or requiring a live MongoDB / Socket.io connection.
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Food Delivery API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong on the server' })
})

export default app
