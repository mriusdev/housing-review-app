const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc    register user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if(name === '' || email === '' || password === '') {
    res.status(400)
    throw new Error('Please fill out all fields')
  }

  const user = await User.findOne({email}).select("email")

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
    institution: ''
  })

  if(createdUser) {
    res.status(201).json({
      _id: createdUser._id,
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
      _id: user._id,
      email: user.email,
      token: generateToken(user.id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid login details')
  }
})

// @desc    get logged in user details
// @route   GET /api/user/profile
// @access  Private
const getUserPrivate = asyncHandler(async (req, res) => {
  const id = req.authorizedUser._id
  const user = await User.findById(id).select('-password')
  res.status(200).json(user)
})

// @desc    get any user's profile details
// @route   GET /api/user/profile/:id
// @access  Public
const getUserPublic = asyncHandler(async (req, res) => {
  const userId = req.params.id
  const userData = await User.findById(userId).select('name institution -_id')
  res.status(200).json(userData)
})

// @desc    edit user details
// @route   PUT /api/user/profile/edit
// @access  Private
const editUser = asyncHandler(async (req, res) => {
  const id = req.authorizedUser._id
  const user = await User.findById(id).select('name institution email -_id')

  if(req.body) {
    
    if(user.name === req.body.name) {
      delete req.body.name
    }
    if(user.email === req.body.email) {
      delete req.body.email
    }
    if(user.institution === req.body.institution) {
      delete req.body.institution
    }
    
    if(Object.keys(req.body).length > 0) {
      await User.findByIdAndUpdate(req.authorizedUser.id, req.body, { new: true }).select('-password -_id -__v')
      res.status(200).json("Data updated")
    } else {
      res.status(200).json("Data updated")
    }
    
  }

  
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
  getUserPrivate,
  getUserPublic,
  editUser
}