// Backend/Routes/reviewroutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewcontroller');
const authMiddleware = require('../Middleware/authmiddleware');

// All routes are protected
router.use(authMiddleware);

// Create review with file upload
router.post('/', reviewController.upload, reviewController.createReview);

// Get reviews by destination
router.get('/destination/:destinationId', reviewController.getReviews);

// Get user's reviews
router.get('/user', reviewController.getUserReviews);

module.exports = router;