const registerUser = (req, res) => {
  res.status(200).json({message:'create account'})
}

const loginUser = (req, res) => {
  res.status(200).json({message:'login to account'})
}

const getUser = (req, res) => {
  res.status(200).json({message:'check single profile'})
}

const editUser = (req, res) => {
  res.status(200).json({message:`update goal ${req.params.id}`})
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  editUser
}