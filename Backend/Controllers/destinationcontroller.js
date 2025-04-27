// Backend/Controllers/destinationcontroller.js
const Destination = require('../Models/Destination');

exports.getAllDestinations = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = {};
    
    // Apply category filter if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Apply search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    const destinations = await Destination.find(query)
      .select('name description location imageUrl category averageRating')
      .sort({ averageRating: -1 });
    
    res.status(200).json({ destinations });
  } catch (error) {
    console.error('Get all destinations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const destination = await Destination.findById(id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'fullName'
        }
      });
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.status(200).json({ destination });
  } catch (error) {
    console.error('Get destination by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// For admin use only - these would be protected with admin middleware in production
exports.createDestination = async (req, res) => {
  try {
    const { name, description, location, imageUrl, category } = req.body;
    
    const newDestination = new Destination({
      name,
      description,
      location,
      imageUrl,
      category
    });
    
    await newDestination.save();
    
    res.status(201).json({
      message: 'Destination created successfully',
      destination: newDestination
    });
  } catch (error) {
    console.error('Create destination error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, imageUrl, category } = req.body;
    
    const destination = await Destination.findByIdAndUpdate(
      id,
      { name, description, location, imageUrl, category },
      { new: true }
    );
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.status(200).json({
      message: 'Destination updated successfully',
      destination
    });
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    
    const destination = await Destination.findByIdAndDelete(id);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    // Consider also deleting related reviews
    
    res.status(200).json({
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    console.error('Delete destination error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};