// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch user data
async function fetchUserData(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Create a new trip
async function createTrip(tripData) {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(tripData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating trip:', error);
  }
}

// Get trip recommendations
async function getRecommendations(location, interests) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations?location=${location}&interests=${interests.join(',')}`);
    return await response.json();
  } catch (error) {
    console.error('Error getting recommendations:', error);
  }
}