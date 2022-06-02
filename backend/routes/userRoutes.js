const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUser, editUser} = require('../controllers/userController')

router.get('/profile', getUser)

router.put('/:id', editUser)

router.post('/register', registerUser)

router.post('/login', loginUser)

module.exports = router