const express = require('express');
const router = express.Router();
const db = require('../database');

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'You must be logged in to submit a review' });
  }
  next();
};

// Get all reviews for a destination
router.get('/destination/:id', (req, res) => {
  const { id } = req.params;
  
  db.all(`
    SELECT r.*, u.username 
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.destination_id = ?
    ORDER BY r.created_at DESC
  `, [id], (err, reviews) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(reviews);
  });
});

// Add a new review (must be logged in)
router.post('/', isAuthenticated, (req, res) => {
  const { destinationId, rating, comment } = req.body;
  const userId = req.session.userId;
  
  // Validate input
  if (!destinationId || !rating) {
    return res.status(400).json({ error: 'Destination ID and rating are required' });
  }
  
  // Check if destination exists
  db.get('SELECT * FROM destinations WHERE id = ?', [destinationId], (err, destination) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    
    // Check if user already reviewed this destination
    db.get('SELECT * FROM reviews WHERE user_id = ? AND destination_id = ?', 
      [userId, destinationId], (err, existingReview) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
        if (existingReview) {
          return res.status(400).json({ error: 'You have already reviewed this destination' });
        }
        
        // Add the review
        db.run(`
          INSERT INTO reviews (user_id, destination_id, rating, comment)
          VALUES (?, ?, ?, ?)
        `, [userId, destinationId, rating, comment || ''], function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          
          // Update destination's average rating
          updateDestinationRating(destinationId);
          
          res.status(201).json({ 
            message: 'Review added successfully',
            reviewId: this.lastID 
          });
        });
    });
  });
});

// Update a review (must be the author)
router.put('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.session.userId;
  
  // Validate input
  if (!rating) {
    return res.status(400).json({ error: 'Rating is required' });
  }
  
  // Check if review exists and belongs to user
  db.get('SELECT * FROM reviews WHERE id = ?', [id], (err, review) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    if (review.user_id !== userId) {
      return res.status(403).json({ error: 'You can only update your own reviews' });
    }
    
    // Update the review
    db.run(`
      UPDATE reviews
      SET rating = ?, comment = ?, created_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [rating, comment || '', id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Update destination's average rating
      updateDestinationRating(review.destination_id);
      
      res.json({ message: 'Review updated successfully' });
    });
  });
});

// Delete a review (must be the author)
router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;
  
  // Check if review exists and belongs to user
  db.get('SELECT * FROM reviews WHERE id = ?', [id], (err, review) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    if (review.user_id !== userId) {
      return res.status(403).json({ error: 'You can only delete your own reviews' });
    }
    
    // Delete the review
    db.run('DELETE FROM reviews WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Update destination's average rating
      updateDestinationRating(review.destination_id);
      
      res.json({ message: 'Review deleted successfully' });
    });
  });
});

// Helper function to update destination's average rating
function updateDestinationRating(destinationId) {
  db.get(`
    SELECT AVG(rating) as avgRating
    FROM reviews
    WHERE destination_id = ?
  `, [destinationId], (err, result) => {
    if (err || !result) {
      console.error('Error calculating average rating:', err);
      return;
    }
    
    const avgRating = result.avgRating || 0;
    
    db.run(`
      UPDATE destinations
      SET rating = ?
      WHERE id = ?
    `, [avgRating, destinationId], (err) => {
      if (err) {
        console.error('Error updating destination rating:', err);
      }
    });
  });
}

module.exports = router;