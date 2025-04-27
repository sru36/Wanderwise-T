// Backend/Routes/authroutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authcontroller');
const authMiddleware = require('../Middleware/authmiddleware');

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Protected routes
router.get('/current-user', authMiddleware, authController.getCurrentUser);

module.exports = router;