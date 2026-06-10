const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Transaction = require('../models/Transaction')

// @route   POST api/transactions
// @desc    Add a new transaction record
// @access  Private
router.post('/', auth, async (req, res) => {
  const { type, amount, category, date, note } = req.body

  try {
    const newTransaction = new Transaction({
      user: req.user.id, // Set securely from your verified token payload
      type,
      amount,
      category,
      date,
      note
    })

    const transaction = await newTransaction.save()
    res.status(201).json(transaction)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error: Failed to save entry.')
  }
})

// @route   GET api/transactions
// @desc    Fetch all transactions for logged in account
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 })
    res.json(transactions)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error: Failed to fetch records.')
  }
})

// @route   PUT api/transactions/:id
// @desc    Update an existing transaction record entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { type, amount, category, date, note } = req.body

  try {
    let transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction record profile target not found.' })
    }

    // Access protection safety lock check
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User unauthorized to modify this transaction resource.' })
    }

    // Update with incoming modified input values or keep old ones
    transaction.type = type || transaction.type
    transaction.amount = amount !== undefined ? amount : transaction.amount
    transaction.category = category || transaction.category
    transaction.date = date || transaction.date
    transaction.note = note !== undefined ? note : transaction.note

    await transaction.save()
    res.json(transaction)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error: Failed to execute record modification updates.')
  }
})

// @route   DELETE api/transactions/:id
// @desc    Remove a specific transaction entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction record not found.' })
    }

    // Access control safety check
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User unauthorized to modify this resource.' })
    }

    await transaction.deleteOne()
    res.json({ message: 'Transaction removed successfully.' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error: Failed to process deletion.')
  }
})

module.exports = router