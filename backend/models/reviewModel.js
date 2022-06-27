const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  institution: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true
  },
  images: [ String ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)