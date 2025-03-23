const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
require('./config/database'); // Using the first code's database configuration

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'wanderwise-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destinations');
const reviewRoutes = require('./routes/reviews');

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/destinations', destinationRoutes);
app.use('/reviews', reviewRoutes);

// Serve the main HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/explore', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'explore.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Update session management for production
app.use(session({
  secret: process.env.SESSION_SECRET || 'wanderwise-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
