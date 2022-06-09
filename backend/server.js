const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectToDB = require('./config/db')

const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

connectToDB()

const app = express()

// middleware to process the data that gets sent to the server
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/review', require('./routes/reviewRoutes'))

app.use(errorHandler)


app.listen(port, () => console.log(`server started on port ${port}`))