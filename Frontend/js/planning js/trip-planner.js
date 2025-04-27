// trip-planner.js - Handles trip planning and itinerary generation

// Import destination data
import { getDestinationData } from './destinations.js';

// Generate trip plan based on user inputs
function generateTripPlan(destination, days, budget) {
    // Get destination data
    const destinationData = getDestinationData(destination);
    const dailyBudget = budget / days;
    
    // Clear previous results
    const travelOptions = document.getElementById('travel-options');
    const accommodationOptions = document.getElementById('accommodation-options');
    const placesToVisit = document.getElementById('places-to-visit');
    
    travelOptions.innerHTML = '';
    accommodationOptions.innerHTML = '';
    placesToVisit.innerHTML = '';
    
    // Generate travel options
    generateTravelCards(travelOptions, destinationData.travel, budget);
    
    // Generate accommodation options
    generateAccommodationCards(accommodationOptions, destinationData.accommodations, dailyBudget);
    
    // Generate places to visit
    generatePlacesCards(placesToVisit, destinationData.places, days);
}

// Generate travel recommendations
function generateTravelRecommendations(destination, duration, budget) {
    const travelContainer = document.getElementById('travel-recommendations');
    const dailyBudget = budget / duration;
    let recommendations = '';

    // Different travel options based on budget
    if (dailyBudget < 1000) {
        recommendations += `
        <div class="recommendation-card">
            <h5>Budget Travel Options</h5>
            <p>Based on your budget of ₹${budget} for ${duration} days:</p>
            <ul>
                <li>Local buses and trains are your best options for travel within ${destination}</li>
                <li>Consider shared auto-rickshaws for shorter distances</li>
                <li>Look for state transport buses for day trips</li>
            </ul>
        </div>
        `;
    } else if (dailyBudget < 3000) {
        recommendations += `
        <div class="recommendation-card">
            <h5>Mid-range Travel Options</h5>
            <p>Based on your budget of ₹${budget} for ${duration} days:</p>
            <ul>
                <li>Auto-rickshaws and taxis for city travel</li>
                <li>Private cabs for day excursions</li>
                <li>Consider domestic flights or AC trains if traveling between cities</li>
            </ul>
        </div>
        `;
    } else {
        recommendations += `
        <div class="recommendation-card">
            <h5>Premium Travel Options</h5>
            <p>Based on your budget of ₹${budget} for ${duration} days:</p>
            <ul>
                <li>Private car rental with driver for the entire trip</li>
                <li>Domestic flights for inter-city travel</li>
                <li>Premium taxi services for city exploration</li>
            </ul>
        </div>
        `;
    }

    travelContainer.innerHTML = recommendations;
}

// Generate accommodation recommendations
function generateAccommodationRecommendations(destination, duration, budget) {
    const accommodationContainer = document.getElementById('accommodation-recommendations');
    const dailyBudget = budget / duration;
    let accommodationBudget = dailyBudget * 0.4; // Allocate 40% of daily budget to accommodation
    let recommendations = '';

    if (accommodationBudget < 800) {
        recommendations += `
        <div class="recommendation-card">
            <h5>Budget Accommodation</h5>
            <p>Recommended daily accommodation budget: ₹${Math.round(accommodationBudget)}</p>
            <ul>
                <li>Hostels and guest houses</li>
                <li>Budget hotels with basic amenities</li>
                <li>Homestays in less central locations</li>
            </ul>
        </div>
        `;
    } else if (accommodationBudget < 3000) {
        recommendations += `
        <div class="recommendation-card">
            <h5>Mid-range Accommodation</h5>
            <p>Recommended daily accommodation budget: ₹${Math.round(accommodationBudget)}</p>
            <ul>
                <li>3-star hotels with good amenities</li>
                <li>Well-rated homestays and guesthouses</li>
                <li>Boutique hotels with character</li>
            </ul>
        </div>
        `;
    } else {
        recommendations += `
        <div class="recommendation-card">
            <h5>Luxury Accommodation</h5>
            <p>Recommended daily accommodation budget: ₹${Math.round(accommodationBudget)}</p>
            <ul>
                <li>4-5 star hotels with premium amenities</li>
                <li>Luxury resorts and heritage properties</li>
                <li>Premium villas and service apartments</li>
            </ul>
        </div>
        `;
    }

    accommodationContainer.innerHTML = recommendations;
}

// Generate activity recommendations
function generateActivityRecommendations(destination, duration, budget) {
    const activityContainer = document.getElementById('activity-recommendations');
    const dailyBudget = budget / duration;
    let activityBudget = dailyBudget * 0.3; // Allocate 30% of daily budget to activities
    let recommendations = '';

    // Get recommended activities based on budget
    if (activityBudget < 500) {
        recommendations += `
        <div class="recommendation-card">
            <h5>Budget-friendly Activities</h5>
            <p>Recommended daily activity budget: ₹${Math.round(activityBudget)}</p>
            <ul>
                <li>Free walking tours and public parks</li>
                <li>Local markets and street food exploration</li>
                <li>Budget museums and cultural sites</li>
            </ul>
        </div>
        `;
    } else if (activityBudget < 2000) {
        recommendations += `
        <div class="recommendation-card">
            <h5>Mid-range Activities</h5>
            <p>Recommended daily activity budget: ₹${Math.round(activityBudget)}</p>
            <ul>
                <li>Guided tours of major attractions</li>
                <li>Cooking classes and cultural experiences</li>
                <li>Adventure activities and outdoor excursions</li>
            </ul>
        </div>
        `;
    } else {
        recommendations += `
        <div class="recommendation-card">
            <h5>Premium Activities</h5>
            <p>Recommended daily activity budget: ₹${Math.round(activityBudget)}</p>
            <ul>
                <li>Private guided tours with expert guides</li>
                <li>Premium cultural experiences and performances</li>
                <li>Exclusive adventure activities and excursions</li>
            </ul>
        </div>
        `;
    }

    activityContainer.innerHTML = recommendations;
}

// Generate travel cards
function generateTravelCards(container, travelOptions, budget) {
    travelOptions.forEach(option => {
        if (option.cost <= budget) {
            const card = document.createElement('div');
            card.className = 'travel-card';
            card.innerHTML = `
                <h4>${option.type}</h4>
                <p class="price">₹${option.cost}</p>
                <p>${option.description}</p>
                <ul>
                    ${option.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="btn btn-primary select-travel" data-id="${option.id}">Select</button>
            `;
            container.appendChild(card);
        }
    });
}

// Generate accommodation cards
function generateAccommodationCards(container, accommodations, dailyBudget) {
    accommodations.forEach(accommodation => {
        if (accommodation.cost <= dailyBudget) {
            const card = document.createElement('div');
            card.className = 'accommodation-card';
            card.innerHTML = `
                <h4>${accommodation.name}</h4>
                <p class="price">₹${accommodation.cost} per night</p>
                <p>${accommodation.description}</p>
                <p><strong>Location:</strong> ${accommodation.location}</p>
                <p><strong>Rating:</strong> ${accommodation.rating}/5</p>
                <button class="btn btn-primary select-accommodation" data-id="${accommodation.id}">Select</button>
            `;
            container.appendChild(card);
        }
    });
}

// Generate places to visit cards
function generatePlacesCards(container, places, days) {
    // Limit places based on trip duration
    const recommendedPlaces = places.slice(0, Math.min(places.length, days * 2));
    
    recommendedPlaces.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
            <h4>${place.name}</h4>
            <p><strong>Category:</strong> ${place.category}</p>
            <p><strong>Time Required:</strong> ${place.timeRequired}</p>
            <p>${place.description}</p>
            <p><strong>Entry Fee:</strong> ${place.entryFee ? '₹' + place.entryFee : 'Free'}</p>
            <button class="btn btn-primary add-to-itinerary" data-id="${place.id}">Add to Itinerary</button>
        `;
        container.appendChild(card);
    });
}

// Generate full itinerary
function generateItinerary(destination, duration, budget, selectedTravel, selectedAccommodation, selectedPlaces) {
    const itineraryContainer = document.getElementById('itinerary-container');
    const dailyBudget = budget / duration;
    let itineraryHTML = `
        <h3>Your ${duration}-day Trip to ${destination}</h3>
        <p>Total Budget: ₹${budget}</p>
        <h4>Travel Details</h4>
        <div class="itinerary-section">
            <p><strong>${selectedTravel.type}</strong> - ₹${selectedTravel.cost}</p>
            <p>${selectedTravel.description}</p>
        </div>
        <h4>Accommodation</h4>
        <div class="itinerary-section">
            <p><strong>${selectedAccommodation.name}</strong> - ₹${selectedAccommodation.cost} per night (Total: ₹${selectedAccommodation.cost * duration})</p>
            <p>${selectedAccommodation.description}</p>
        </div>
        <h4>Daily Itinerary</h4>
    `;

    // Generate daily itinerary
    for (let day = 1; day <= duration; day++) {
        itineraryHTML += `
            <div class="day-plan">
                <h5>Day ${day}</h5>
                <div class="day-activities">
        `;

        // Get activities for this day (assuming 2 places per day)
        const dayStart = (day - 1) * 2;
        const dayPlaces = selectedPlaces.slice(dayStart, dayStart + 2);

        dayPlaces.forEach(place => {
            itineraryHTML += `
                <div class="activity">
                    <h6>${place.name}</h6>
                    <p>${place.description}</p>
                    <p><strong>Time Required:</strong> ${place.timeRequired}</p>
                    <p><strong>Entry Fee:</strong> ${place.entryFee ? '₹' + place.entryFee : 'Free'}</p>
                </div>
            `;
        });

        itineraryHTML += `
                </div>
            </div>
        `;
    }

    // Calculate remaining budget
    const travelCost = selectedTravel.cost;
    const accommodationCost = selectedAccommodation.cost * duration;
    const activitiesCost = selectedPlaces.reduce((total, place) => total + (place.entryFee || 0), 0);
    const remainingBudget = budget - travelCost - accommodationCost - activitiesCost;

    itineraryHTML += `
        <div class="budget-summary">
            <h4>Budget Summary</h4>
            <ul>
                <li>Travel: ₹${travelCost}</li>
                <li>Accommodation: ₹${accommodationCost}</li>
                <li>Activities: ₹${activitiesCost}</li>
                <li>Remaining for food and misc: ₹${Math.max(0, remainingBudget)}</li>
            </ul>
        </div>
    `;

    itineraryContainer.innerHTML = itineraryHTML;
}

// Save itinerary to local storage
function saveItinerary(itinerary) {
    let savedItineraries = JSON.parse(localStorage.getItem('savedItineraries')) || [];
    savedItineraries.push({
        id: Date.now(),
        itinerary: itinerary,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('savedItineraries', JSON.stringify(savedItineraries));
}

// Load saved itineraries
function loadSavedItineraries() {
    const savedContainer = document.getElementById('saved-itineraries');
    savedContainer.innerHTML = '';
    
    const savedItineraries = JSON.parse(localStorage.getItem('savedItineraries')) || [];
    
    if (savedItineraries.length === 0) {
        savedContainer.innerHTML = '<p>No saved itineraries yet.</p>';
        return;
    }
    
    savedItineraries.forEach(saved => {
        const card = document.createElement('div');
        card.className = 'saved-itinerary-card';
        card.innerHTML = `
            <h4>${saved.itinerary.destination} - ${saved.itinerary.duration} days</h4>
            <p>Created on: ${new Date(saved.createdAt).toLocaleDateString()}</p>
            <p>Budget: ₹${saved.itinerary.budget}</p>
            <div class="saved-actions">
                <button class="btn btn-primary load-itinerary" data-id="${saved.id}">Load</button>
                <button class="btn btn-danger delete-itinerary" data-id="${saved.id}">Delete</button>
            </div>
        `;
        savedContainer.appendChild(card);
    });
}

// Export functions
export {
    generateTripPlan,
    generateTravelRecommendations,
    generateAccommodationRecommendations,
    generateActivityRecommendations,
    generateItinerary,
    saveItinerary,
    loadSavedItineraries
};