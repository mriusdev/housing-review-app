const asyncHandler = require('express-async-handler')

const Review = require('../models/reviewModel')

// @desc    post review
// @route   POST /api/review/create
// @access  Private
const postReview = asyncHandler(async (req, res) => {
  const { description, rating, images } = req.body
  if(description === '' || rating < 1 || images.length === 0) {
    res.status(400)
    throw new Error('Please fill out all fields')
  }

  const createdReview = await Review.create({
    relatedUser: req.authorizedUser.id,
    description,
    rating,
    images
  })

  if(createdReview) {
    res.status(201).json({
      message: 'Review posted'
    })
  } else {
    res.status(400)
    throw new Error('Something went wrong')
  }
})

// @desc    edit review
// @route   PUT /api/review/edit/:id
// @access  Private
const editReview = asyncHandler(async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-_id -relatedUser -createdAt -__v')
  res.status(200).json(updatedReview)
})

module.exports = {
  postReview,
  editReview
}