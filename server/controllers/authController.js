import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

// POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, and password are required' })
    }

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already registered' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword, phone, address })

    const token = generateToken(user)
    const { password: _pw, ...userWithoutPassword } = user.toObject()

    res.status(201).json({ user: userWithoutPassword, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' })

    const token = generateToken(user)
    const { password: _pw, ...userWithoutPassword } = user.toObject()

    res.json({ user: userWithoutPassword, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/auth/me  (requires auth middleware)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
