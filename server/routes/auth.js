const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')

// Helper to generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // Check if user already exists
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create user
      user = await User.create({
        name,
        email,
        password: hashedPassword
      })

      // Return token
      res.status(201).json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)


// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      // Check if user exists
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Compare password with hashed password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Return token
      res.json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

module.exports = router