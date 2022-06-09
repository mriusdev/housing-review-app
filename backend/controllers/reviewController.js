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

// @desc    get a single review
// @route   GET /api/review/:id
// @access  Private
const getSingleReview = asyncHandler(async (req, res) => {
  const singleReviewData = await Review.findById(req.params.id).select('-_id -__v')
  if(singleReviewData) {
    res.status(200).json(singleReviewData)
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// @desc    delete a single review
// @route   DELETE /api/review/delete/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id)
  console.log(deletedReview)
  if(deletedReview) {
    res.status(200).json({
      message: 'Review deleted'
    })
  } else {
    res.status(400)
    throw new Error('Could not delete review')
  }
})

// @desc    get all reviews
// @route   PUT /api/review/delete/:id
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
  if(reviews) {
    res.status(200).json(reviews)
  } else {
    res.status(400)
    throw new Error('No reviews found')
  }
})

module.exports = {
  postReview,
  editReview,
  deleteReview,
  getSingleReview,
  getReviews
}