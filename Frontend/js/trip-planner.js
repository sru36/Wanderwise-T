// trip-planner.js - Handles trip planning functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize trip form handling
    const tripForm = document.getElementById('tripForm');
    tripForm?.addEventListener('submit', handleTripPlan);
    
    // Add event listener for new search button
    const newSearchBtn = document.getElementById('newSearchBtn');
    newSearchBtn?.addEventListener('click', function() {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.classList.add('hidden');
        
        // Reset form
        document.getElementById('tripForm').reset();
        
        // Scroll to top of form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Add event listener for save itinerary button
    const saveItineraryBtn = document.getElementById('saveItineraryBtn');
    saveItineraryBtn?.addEventListener('click', function() {
        alert('Your itinerary has been saved successfully!');
    });
});

function handleTripPlan(e) {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const days = parseInt(document.getElementById('days').value);
    const budget = parseInt(document.getElementById('budget').value);
    
    if (!destination || !days || !budget) {
        alert('Please fill in all fields to plan your trip');
        return;
    }
    
    // Show results container
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');
    
    // Show loading spinner
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');
    
    // Hide previous results if any
    const tripResults = document.getElementById('trip-results');
    tripResults.style.display = 'none';
    
    // Simulate loading (you can remove this in production)
    setTimeout(() => {
        // Hide loading spinner
        loading.classList.add('hidden');
        
        // Show results
        tripResults.style.display = 'block';
        
        // Generate trip plan
        generateTripPlan(destination, days, budget);
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

function generateTripPlan(destination, days, budget) {
    // Get destination data
    const destData = destinationsData[destination.toLowerCase()];
    if (!destData) {
        alert('Destination data not found');
        return;
    }
    
    // Calculate budget allocation
    const dailyBudget = budget / days;
    const transportBudget = Math.round(budget * 0.3); // 30% for transport
    const accommodationBudget = Math.round(dailyBudget * 0.4 * days); // 40% of daily budget for accommodation
    const activityBudget = Math.round(dailyBudget * 0.3 * days); // 30% of daily budget for activities
    
    // Generate travel options
    generateTravelOptions(destination, transportBudget, destData);
    
    // Generate accommodation options
    generateAccommodationOptions(destination, accommodationBudget, days, destData);
    
    // Generate places to visit
    generatePlacesToVisit(destination, activityBudget, destData);
}

function generateTravelOptions(destination, budget, destData) {
    const travelOptions = document.getElementById('travel-options');
    travelOptions.innerHTML = '';
    
    // Create a card for each intercity transport option
    const intercityTransports = [
        { type: 'Flight', cost: Math.round(budget * 0.7), details: 'Fastest option, direct flights available' },
        { type: 'Train', cost: Math.round(budget * 0.4), details: 'Comfortable overnight options, scenic routes' },
        { type: 'Bus', cost: Math.round(budget * 0.25), details: 'AC buses with reclining seats, budget-friendly' }
    ];
    
    intercityTransports.forEach(transport => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${transport.type}</h4>
            <p>${transport.details}</p>
            <div class="price-tag">₹${transport.cost}</div>
            <p class="local-options">Local transport options: ${destData.transport.local.join(', ')}</p>
        `;
        travelOptions.appendChild(card);
    });
}

function generateAccommodationOptions(destination, budget, days, destData) {
    const accommodationOptions = document.getElementById('accommodation-options');
    accommodationOptions.innerHTML = '';
    
    // Get accommodation data from destData
    destData.accommodations.forEach(accommodation => {
        // Calculate per day cost based on accommodation type
        let dailyCost;
        if (accommodation.type === 'Luxury') {
            dailyCost = Math.min(Math.round(budget * 0.7 / days), 15000);
        } else if (accommodation.type === 'Mid-range') {
            dailyCost = Math.min(Math.round(budget * 0.4 / days), 5000);
        } else {
            dailyCost = Math.min(Math.round(budget * 0.2 / days), 2000);
        }
        
        const totalCost = dailyCost * days;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${accommodation.type} (₹${accommodation.priceRange}/night)</h4>
            <p>Examples: ${accommodation.examples.join(', ')}</p>
            <div class="price-tag">₹${dailyCost} per night</div>
            <div class="price-tag">₹${totalCost} for ${days} days</div>
        `;
        accommodationOptions.appendChild(card);
    });
}

function generatePlacesToVisit(destination, budget, destData) {
    const placesToVisit = document.getElementById('places-to-visit');
    placesToVisit.innerHTML = '';
    
    // Get attractions data from destData
    destData.attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${attraction.name}</h4>
            <p>${attraction.description}</p>
            <div class="price-tag">Entry Fee: ₹${attraction.entryFee}</div>
        `;
        placesToVisit.appendChild(card);
    });
    
    // Add a suggested itinerary note
    const itineraryNote = document.createElement('div');
    itineraryNote.className = 'itinerary-note';
    itineraryNote.innerHTML = `
        <h4>Suggested Itinerary for ${days} days</h4>
        <p>With your budget of ₹${budget}, you can visit all these attractions over ${days} days.</p>
        <p>Click 'Save Itinerary' to get a detailed day-by-day plan.</p>
    `;
    placesToVisit.appendChild(itineraryNote);
}