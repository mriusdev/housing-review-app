const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')


// @desc    register user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, institution } = req.body
  if(name === '' || email === '' || password === '') {
    res.status(400)
    throw new Error('Please fill out all fields')
  }

  const user = await User.findOne({email}).select("email").lean()

  if(user) {
    res.status(400)
    throw new Error('Email already taken')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
    institution
  })

  if(createdUser) {
    res.status(201).json({
      message: 'user created',
      email: createdUser.email,
      token: generateToken(createdUser.id)
    })
  } else {
    res.status(400)
    throw new Error('Something went wrong')
  }

})

// @desc    let a user log in to their account
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if(email === '' || password === '') {
    res.status(400)
    throw new Error('Please fill out all fields')
  }

  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      message: 'user logged in',
      email: user.email,
      token: generateToken(user.id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid login details')
  }
})

// @desc    get user details
// @route   GET /api/user/profile
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({message:'check single profile'})
})

// @desc    edit user details
// @route   PUT /api/user/:id
// @access  Private
const editUser = asyncHandler(async (req, res) => {
  res.status(200).json({message:`update goal ${req.params.id}`})
})

// generating jwt
// to validate a user, we send the token to a relevant route and get
// the id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  editUser
}