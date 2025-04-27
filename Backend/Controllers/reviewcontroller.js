// Backend/Controllers/reviewcontroller.js
const Review = require('../Models/reviewmodel.js');
const Destination = require('../Models/destinationmodel.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../Frontend/assets/uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'review-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

exports.upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
}).single('reviewImage');

exports.createReview = async (req, res) => {
  try {
    const { rating, reviewText, destinationId } = req.body;
    
    // Check if destination exists
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Create new review
    const newReview = new Review({
      user: req.userId,
      rating: parseInt(rating),
      reviewText,
      reviewImage: req.file ? `/assets/uploads/${req.file.filename}` : null
    });

    await newReview.save();

    // Add review to destination
    destination.reviews.push(newReview._id);
    
    // Update average rating
    const allReviews = await Review.find({ _id: { $in: destination.reviews } });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    destination.averageRating = totalRating / allReviews.length;
    
    await destination.save();

    res.status(201).json({
      message: 'Review submitted successfully!',
      redirect: '../../Frontend/html/thankyou.html',
      review: newReview
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error during review submission' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { destinationId } = req.params;
    
    let query = {};
    if (destinationId) {
      const destination = await Destination.findById(destinationId);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      query = { _id: { $in: destination.reviews } };
    }
    
    const reviews = await Review.find(query)
      .populate('user', 'fullName')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};