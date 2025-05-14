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
        document.getElementById('tripForm').reset();
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Save itinerary button
    const saveItineraryBtn = document.getElementById('saveItineraryBtn');
    saveItineraryBtn?.addEventListener('click', function () {
        const destination = document.getElementById('destination').value;
        const days = document.getElementById('days').value;
        const budget = document.getElementById('budget').value;
    
        const transportCards = document.querySelectorAll('#travel-options .card');
        const accommodationCards = document.querySelectorAll('#accommodation-options .card');
        const placesCards = document.querySelectorAll('#places-to-visit .card');
    
        let content = `--- Trip Itinerary ---\n\nDestination: ${destination.toUpperCase()}\nDays: ${days}\nBudget: ₹${budget}\n\n`;
    
        content += `Travel Options:\n`;
        transportCards.forEach(card => {
            content += `- ${card.querySelector('h4')?.innerText}: ${card.querySelector('p')?.innerText} | ${card.querySelector('.price-tag')?.innerText}\n`;
        });
    
        content += `\nAccommodation Options:\n`;
        accommodationCards.forEach(card => {
            content += `- ${card.querySelector('h4')?.innerText}\n  ${card.querySelectorAll('p')[0]?.innerText}\n  ${card.querySelectorAll('.price-tag')[0]?.innerText}, ${card.querySelectorAll('.price-tag')[1]?.innerText}\n`;
        });
    
        content += `\nPlaces to Visit:\n`;
        placesCards.forEach(card => {
            content += `- ${card.querySelector('h4')?.innerText}: ${card.querySelector('p')?.innerText} | ${card.querySelector('.price-tag')?.innerText}\n`;
        });
    
        // Create a Blob and download the file
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.download = `trip-itinerary-${destination}.txt`;
        link.href = window.URL.createObjectURL(blob);
        link.click();
    });
    
});

function handleTripPlan(e) {
    e.preventDefault();
    const destination = document.getElementById('destination').value.toLowerCase();
    const days = parseInt(document.getElementById('days').value);
    const budget = parseInt(document.getElementById('budget').value);

    if (!destination || !days || !budget) {
        alert('Please fill in all fields to plan your trip');
        return;
    }

    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');

    const loading = document.getElementById('loading');
    const tripResults = document.getElementById('trip-results');

    loading.classList.remove('hidden');
    tripResults.style.display = 'none';

    setTimeout(() => {
        loading.classList.add('hidden');
        tripResults.style.display = 'block';
        generateTripPlan(destination, days, budget);
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

function generateTripPlan(destination, days, budget) {
    const destData = destinationsData[destination];
    if (!destData) {
        alert('Destination data not found');
        return;
    }

    // Adjust budget allocation
    const transportBudget = Math.round(budget * 0.3); // 30% for transport
    const accommodationBudget = Math.round(budget * 0.4); // 40% for accommodation
    const activityBudget = Math.round(budget * 0.3); // 30% for activities

    generateTravelOptions(destination, transportBudget, destData, days);
    generateAccommodationOptions(destination, accommodationBudget, days, destData);
    generatePlacesToVisit(destination, activityBudget, destData, days);

    generateTripSummary(destination, days, budget, destData);
}

function generateTravelOptions(destination, budget, destData, days) {
    const travelOptions = document.getElementById('travel-options');
    travelOptions.innerHTML = '';

    // Set minimum realistic costs for transport
    const intercityTransports = [
        { type: 'Flight', cost: 3000, details: 'Fastest option, direct flights available' },
        { type: 'Train', cost: 1200, details: 'Comfortable overnight options, scenic routes' },
        { type: 'Bus', cost: 800, details: 'AC buses with reclining seats, budget-friendly' }
    ];

    // Daily local transport cost - more realistic minimum
    const dailyLocalTransportCost = 200; // Minimum ₹200 per day for local transport
    const totalLocalCost = dailyLocalTransportCost * days;

    let found = false;

    intercityTransports.forEach(transport => {
        // Calculate total transport cost: intercity (round trip) + daily local
        const totalTransportCost = transport.cost + totalLocalCost;
        
        if (totalTransportCost <= budget) {
            found = true;
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.totalCost = totalTransportCost; // Store cost as data attribute
            card.innerHTML = `
                <h4>${transport.type}</h4>
                <p>${transport.details}</p>
                <div class="price-tag">Estimated: ₹${transport.cost}</div>
                <p class="local-options">Local transport: ${destData.transport.local.join(', ')} (approx. ₹${dailyLocalTransportCost}/day)</p>
                <div class="total-transport">Total Transport: ₹${totalTransportCost}</div>
            `;
            travelOptions.appendChild(card);
        }
    });

    if (!found) {
        travelOptions.innerHTML = `<p>No travel options fit within your transport budget of ₹${budget}. The most affordable option would be at least ₹${800 + totalLocalCost}.</p>`;
    }
}



function generateAccommodationOptions(destination, budget, days, destData) {
    const accommodationOptions = document.getElementById('accommodation-options');
    accommodationOptions.innerHTML = '';

    const dailyBudget = budget / days;
    let found = false;
    let cheapestOption = Infinity;
    let cheapestType = '';

    destData.accommodations.forEach(accommodation => {
        // Extract lower and upper limits from price range string
        const [minPrice, maxPrice] = accommodation.priceRange.split('-').map(Number);
        
        // Track cheapest option for error message
        if (minPrice < cheapestOption) {
            cheapestOption = minPrice;
            cheapestType = accommodation.type;
        }

        if (dailyBudget >= minPrice) {
            found = true;
            const card = document.createElement('div');
            const totalMin = minPrice * days;
            const totalMax = maxPrice * days;
            card.className = 'card';
            card.dataset.minCost = totalMin; // Store min cost as data attribute
            card.innerHTML = `
                <h4>${accommodation.type} (₹${accommodation.priceRange}/night)</h4>
                <p>Examples: ${accommodation.examples.join(', ')}</p>
                <div class="price-tag">Daily: ₹${minPrice} – ₹${maxPrice}</div>
                <div class="total-price">Total: ₹${totalMin} – ₹${totalMax} for ${days} days</div>
            `;
            accommodationOptions.appendChild(card);
        }
    });

    if (!found) {
        accommodationOptions.innerHTML = `<p>No accommodations available within your budget of ₹${dailyBudget.toFixed(2)}/day.

        The most affordable ${cheapestType} option starts at ₹${cheapestOption}/night (₹${cheapestOption * days} total).</p>`;
    }
}


function generatePlacesToVisit(destination, budget, destData, days) {
    const placesToVisit = document.getElementById('places-to-visit');
    placesToVisit.innerHTML = '';

    // We'll find attractions within budget
    let found = false;
    const affordableAttractions = [];

    destData.attractions.forEach(attraction => {
        if (attraction.entryFee <= budget) {
            found = true;
            affordableAttractions.push(attraction);
            
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h4>${attraction.name}</h4>
                <p>${attraction.description}</p>
                <div class="price-tag">Entry Fee: ₹${attraction.entryFee}</div>
            `;
            placesToVisit.appendChild(card);
        }
    });

    // Get formatted destination name
    const formattedDestination = destination.charAt(0).toUpperCase() + destination.slice(1);

    if (!found) {
        placesToVisit.innerHTML = `<p>No attractions can be visited within your daily activity budget of ₹${budget}.</p>`;
    } else {
        const itineraryNote = document.createElement('div');
        itineraryNote.className = 'itinerary-note';
        itineraryNote.innerHTML = `
            <h4>Suggested Itinerary for ${days} days in ${formattedDestination}</h4>
            <p>With your budget, you can explore ${affordableAttractions.length} attractions.</p>
        `;
        placesToVisit.appendChild(itineraryNote);
    }
}

function generateTripSummary(destination, days, totalBudget, destData) {
    const summaryDiv = document.getElementById('trip-summary');
    summaryDiv.innerHTML = '';

    // TRANSPORT: Get costs or minimum required
    let transportCost = 0;
    let minimumTransportCost = 800 + (200 * days); // Minimum bus + basic local transport
    const transportCards = document.querySelectorAll('#travel-options .card');
    const transportMsg = document.querySelector('#travel-options p');
    
    if (transportCards.length > 0) {
        // Find the cheapest transport option
        transportCost = Math.min(...Array.from(transportCards).map(card => 
            parseInt(card.dataset.totalCost) || Infinity));
    }

    // ACCOMMODATION: Get costs or minimum required
    let accommodationCost = 0;
    let minimumAccommodationCost = 0;
    const accommodationCards = document.querySelectorAll('#accommodation-options .card');
    if (accommodationCards.length > 0) {
        // Find the cheapest accommodation
        accommodationCost = Math.min(...Array.from(accommodationCards).map(card => 
            parseInt(card.dataset.minCost) || Infinity));
    } else {
        // Find the cheapest accommodation in data
        minimumAccommodationCost = Math.min(...destData.accommodations.map(acc => {
            const [minPrice] = acc.priceRange.split('-').map(Number);
            return minPrice * days;
        }));
    }

    // ATTRACTIONS: Sum all attraction costs
    let attractionCost = 0;
    const attractionCards = document.querySelectorAll('#places-to-visit .card');
    if (attractionCards.length > 0) {
        attractionCost = [...attractionCards].reduce((sum, card) => {
            const feeText = card.querySelector('.price-tag')?.innerText;
            const fee = feeText ? parseInt(feeText.match(/\d+/g)?.[0] || 0) : 0;
            return sum + fee;
        }, 0);
    }

    const totalEstimate = transportCost + accommodationCost + attractionCost;
    const minimumBudgetNeeded = (transportCost || minimumTransportCost) + 
                               (accommodationCost || minimumAccommodationCost) + 
                               attractionCost;

    // Recommendation
    let message = '';
    if (transportCost === 0 || accommodationCost === 0) {
        message = `🔴 Your budget of ₹${totalBudget} is too low. A minimum budget of around ₹${minimumBudgetNeeded} would be needed for ${days} days in ${destination.toUpperCase()}.`;
    } else {
        const difference = totalBudget - totalEstimate;
        if (difference >= 1000) {
            message = `✅ You're under budget by ₹${difference}. You can splurge a bit or add an activity!`;
        } else if (difference >= 0) {
            message = `🟡 Right on budget! You've planned well.`;
        } else if (difference > -2000) {
            message = `⚠️ Slightly over budget by ₹${-difference}. Consider removing one item.`;
        } else {
            message = `🔴 Over budget by ₹${-difference}. Try reducing days or choosing budget options.`;
        }
    }

    // Format the destination name nicely for display
    const formattedDestination = destination.charAt(0).toUpperCase() + destination.slice(1);

    // Inject summary
    summaryDiv.innerHTML = `
        <div class="card">
            <h4>Estimated Total Cost: ₹${totalEstimate || 'N/A'}</h4>
            <p>Travel: ₹${transportCost || 'N/A'} | Stay: ₹${accommodationCost || 'N/A'} | Attractions: ₹${attractionCost}</p>
            <strong>${message}</strong>
            ${transportCost === 0 || accommodationCost === 0 ? 
              `<p>Recommended: Increase your budget or reduce stay duration in ${formattedDestination}.</p>` : ''}
        </div>
    `;
}
