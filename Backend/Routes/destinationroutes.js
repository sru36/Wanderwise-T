// Backend/Routes/destinationroutes.js
const express = require('express');
const router = express.Router();
const destinationController = require('../Controllers/destinationcontroller');
const authMiddleware = require('../Middleware/authmiddleware');

// Public routes
router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);

// Protected routes for admin use
// In a real application, you would add admin middleware here
router.post('/', authMiddleware, destinationController.createDestination);
router.put('/:id', authMiddleware, destinationController.updateDestination);
router.delete('/:id', authMiddleware, destinationController.deleteDestination);

module.exports = router;