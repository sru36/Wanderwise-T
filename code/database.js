const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database or connect to existing one
const dbPath = path.join(__dirname, 'wanderwise.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the wanderwise database.');
    initializeDatabase();
  }
});

// Initialize database tables if they don't exist
function initializeDatabase() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Destinations table
  db.run(`CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    rating REAL DEFAULT 0,
    popular BOOLEAN DEFAULT 0
  )`);

  // Reviews table
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    destination_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (destination_id) REFERENCES destinations (id)
  )`);

  // Insert some sample destinations
  const sampleDestinations = [
    {
      name: 'Paris',
      location: 'France',
      description: 'The City of Light, known for the Eiffel Tower and world-class cuisine.',
      image_url: 'images/paris.jpg',
      category: 'Cities',
      popular: 1
    },
    {
      name: 'Bali',
      location: 'Indonesia',
      description: 'Tropical paradise with beautiful beaches and vibrant culture.',
      image_url: 'images/bali.jpg',
      category: 'Beaches',
      popular: 1
    },
    {
      name: 'Swiss Alps',
      location: 'Switzerland',
      description: 'Stunning mountain ranges perfect for hiking and skiing.',
      image_url: 'images/swiss-alps.jpg',
      category: 'Mountains',
      popular: 1
    }
  ];

  // Check if destinations table is empty before inserting samples
  db.get('SELECT COUNT(*) as count FROM destinations', (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    
    if (row.count === 0) {
      // Insert sample destinations
      const stmt = db.prepare('INSERT INTO destinations (name, location, description, image_url, category, popular) VALUES (?, ?, ?, ?, ?, ?)');
      
      sampleDestinations.forEach(dest => {
        stmt.run(dest.name, dest.location, dest.description, dest.image_url, dest.category, dest.popular);
      });
      
      stmt.finalize();
      console.log('Sample destinations added to database');
    }
  });
}

module.exports = db;