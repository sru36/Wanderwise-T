// Backend/Routes/userroutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usercontroller');
const authMiddleware = require('../Middleware/authmiddleware');

// All routes are protected
router.use(authMiddleware);

// User profile routes
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.post('/change-password', userController.changePassword);

module.exports = router;