const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserPrivate,
  getUserPublic,
  editUser,
} = require("../controllers/userController");
const { authProtection }= require('../middleware/authMiddleware')

router.get("/profile",authProtection, getUserPrivate);

router.put("/profile/edit", authProtection, editUser);

router.get("/profile/:id", getUserPublic);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
