const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all destinations
router.get('/', (req, res) => {
  const category = req.query.category;
  let query = 'SELECT * FROM destinations';
  let params = [];
  
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  
  db.all(query, params, (err, destinations) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(destinations);
  });
});

// Get popular destinations for homepage
router.get('/popular', (req, res) => {
  db.all('SELECT * FROM destinations WHERE popular = 1 LIMIT 6', (err, destinations) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(destinations);
  });
});

// Get destination by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM destinations WHERE id = ?', [id], (err, destination) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    
    // Get reviews for this destination
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
      
      destination.reviews = reviews;
      res.json(destination);
    });
  });
});

// Search destinations
router.get('/search/:term', (req, res) => {
  const { term } = req.params;
  const searchTerm = `%${term}%`;
  
  db.all(`
    SELECT * FROM destinations 
    WHERE name LIKE ? OR location LIKE ? OR description LIKE ?
  `, [searchTerm, searchTerm, searchTerm], (err, destinations) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(destinations);
  });
});

// Get destinations by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  
  db.all('SELECT * FROM destinations WHERE category = ?', [category], (err, destinations) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(destinations);
  });
});

module.exports = router;