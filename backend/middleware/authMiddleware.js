const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const authProtection = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      // get user from the token ( because we have the user_id in the payload )
      // we also assign it to req.authorizedUser for any route that's protected
      req.authorizedUser = await User.findById(decodedToken.id).select('-password')

      // calling the next action, letting user move on
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})

module.exports = {
  authProtection
}