const express = require('express');
const router = express.Router();
const db = require('./database');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if username or email already exists
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (user) {
        return res.status(400).json({ error: 'Username or email already in use' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insert new user
      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
        [username, email, hashedPassword], function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          
          // Set session
          req.session.userId = this.lastID;
          req.session.username = username;
          
          return res.status(201).json({ 
            message: 'User registered successfully',
            userId: this.lastID 
          });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user by email
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      
      // Set session
      req.session.userId = user.id;
      req.session.username = user.username;
      
      res.json({ 
        message: 'Login successful',
        userId: user.id,
        username: user.username
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout user
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Check if user is logged in
router.get('/check', (req, res) => {
  if (req.session.userId) {
    res.json({ 
      isLoggedIn: true,
      userId: req.session.userId,
      username: req.session.username
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

module.exports = router;