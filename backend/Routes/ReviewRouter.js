// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const {submitReview, getReviews} = require('../Controllers/ReviewController');
const ensureAuthenticated = require('../Middlewares/Auth');

// Route to submit a review
router.post('/product/:productId', ensureAuthenticated, submitReview);
router.get("/:productId",ensureAuthenticated, getReviews);

module.exports = router;
