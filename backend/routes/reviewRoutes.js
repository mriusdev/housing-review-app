const express = require("express");
const router = express.Router();
const {
  postReview,
  editReview,
  deleteReview,
  getReviews,
  getSingleReview,
} = require("../controllers/reviewController");
const { authProtection }= require('../middleware/authMiddleware')


router.get("/get-all", getReviews);

router.post("/create", authProtection, postReview);

router.put("/edit/:id", authProtection, editReview);

router.delete("/delete/:id", authProtection, deleteReview);

router.get("/:id", getSingleReview);

module.exports = router;
