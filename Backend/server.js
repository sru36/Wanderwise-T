// Backend/server.js
import authroutes from './Routes/authroutes.js';
import userroutes from './Routes/userroutes.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup - updated to include the development server origin
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://wanderwise.com' 
    : ['http://localhost:3000', 'http://127.0.0.1:5501', 'http://localhost:5501'],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wanderwise', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/auth', authroutes);
app.use('/users', userroutes);

// Serve static files from Frontend directory
//app.use(express.static(path.join(__dirname, '../Frontend')));

// Route all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/html/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});