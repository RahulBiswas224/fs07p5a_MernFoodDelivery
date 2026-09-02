import User from '../models/User.js'
import bcrypt from 'bcryptjs'

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/users  (basic create — full signup w/ JWT comes in Sprint 3)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, and password are required' })
    }

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already registered' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword, phone, address })

    const { password: _pw, ...userWithoutPassword } = user.toObject()
    res.status(201).json(userWithoutPassword)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body }
    delete updates.password // password changes handled separately for security

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
