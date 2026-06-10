const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Income', 'Expense', 'income', 'expense'],
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: false,   // ← was true; Income entries have no category
    default: ''        // ← was 'General'; empty string is cleaner
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  note: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Transaction', TransactionSchema)