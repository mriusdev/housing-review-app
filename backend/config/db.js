const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected at: ${conn.connection.host}`.magenta.underline.bold)
  } catch (error) {
    console.log(error)

    // turn off server
    process.exit(1)
  }
}

module.exports = connectToDB