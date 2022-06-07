const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  editUser,
} = require("../controllers/userController");
const { authProtection }= require('../middleware/authMiddleware')

router.get("/profile",authProtection, getUser);

router.put("/:id", authProtection, editUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
