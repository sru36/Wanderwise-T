// Combined JavaScript for the updated planning page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize trip form handling
    const tripForm = document.getElementById('tripForm');
    tripForm?.addEventListener('submit', handleTripPlan);

    // Load packages
    loadPackages();
});

function handleTripPlan(e) {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const days = document.getElementById('days').value;
    const budget = document.getElementById('budget').value;
    
    if (!destination || !days || !budget) {
        alert('Please fill in all fields');
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
    
    // Simulate loading
    setTimeout(() => {
        // Hide loading spinner
        loading.classList.add('hidden');
        
        // Show results
        tripResults.style.display = 'block';
        
        // Generate trip plan
        generateTripPlan(destination, days, budget);
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

function generateTripPlan(destination, days, budget) {
    // Travel options
    const travelOptions = document.getElementById('travel-options');
    travelOptions.innerHTML = '';
    
    const transports = [
        { type: 'Flight', cost: Math.round(budget * 0.3), details: 'Direct flights available' },
        { type: 'Train', cost: Math.round(budget * 0.15), details: 'Comfortable overnight options' },
        { type: 'Bus', cost: Math.round(budget * 0.1), details: 'AC buses with reclining seats' }
    ];
    
    transports.forEach(transport => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${transport.type}</h4>
            <p>${transport.details}</p>
            <div class="price-tag">₹${transport.cost}</div>
        `;
        travelOptions.appendChild(card);
    });
    
    // Accommodation options
    const accommodationOptions = document.getElementById('accommodation-options');
    accommodationOptions.innerHTML = '';
    
    const accommodations = [
        { type: 'Luxury Hotel', cost: Math.round(budget * 0.5 / days), details: '5-star amenities' },
        { type: 'Mid-range Hotel', cost: Math.round(budget * 0.3 / days), details: 'Comfortable and affordable' },
        { type: 'Budget Hostel', cost: Math.round(budget * 0.15 / days), details: 'Basic amenities, great for backpackers' }
    ];
    
    accommodations.forEach(accommodation => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${accommodation.type}</h4>
            <p>${accommodation.details}</p>
            <div class="price-tag">₹${accommodation.cost} per night</div>
        `;
        accommodationOptions.appendChild(card);
    });
    
    // Places to visit
    const placesToVisit = document.getElementById('places-to-visit');
    placesToVisit.innerHTML = '';
    
    let attractions;
    
    switch(destination.toLowerCase()) {
        case 'delhi':
            attractions = ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayun\'s Tomb'];
            break;
        case 'mumbai':
            attractions = ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Juhu Beach'];
            break;
        case 'goa':
            attractions = ['Calangute Beach', 'Dudhsagar Falls', 'Fort Aguada', 'Anjuna Flea Market'];
            break;
        case 'jaipur':
            attractions = ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar'];
            break;
        case 'kerala':
            attractions = ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Kovalam Beach', 'Periyar Wildlife Sanctuary'];
            break;
        case 'varanasi':
            attractions = ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Sarnath', 'Evening Aarti'];
            break;
        case 'agra':
            attractions = ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'];
            break;
        case 'shimla':
            attractions = ['The Ridge', 'Mall Road', 'Jakhu Temple', 'Kufri'];
            break;
        case 'darjeeling':
            attractions = ['Tiger Hill', 'Batasia Loop', 'Tea Gardens', 'Himalayan Mountaineering Institute'];
            break;
        case 'manali':
            attractions = ['Rohtang Pass', 'Solang Valley', 'Hidimba Temple', 'Old Manali'];
            break;
        default:
            attractions = ['Popular Landmarks', 'Cultural Sites', 'Nature Spots', 'Local Markets'];
    }
    
    attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h4>${attraction}</h4>`;
        placesToVisit.appendChild(card);
    });
    
    // Add event listener to save itinerary button
    const saveItineraryBtn = document.getElementById('saveItineraryBtn');
    saveItineraryBtn.addEventListener('click', () => {
        alert('Itinerary saved successfully!');
    });
}

function loadPackages() {
    const packagesGrid = document.getElementById('packages-grid');
    if (!packagesGrid) return;
    
    const packages = [
        {
            name: 'Golden Triangle Tour',
            description: 'Explore Delhi, Agra, and Jaipur in this classic Indian tour',
            price: 25000,
            days: 6
        },
        {
            name: 'Goa Beach Vacation',
            description: 'Relax on the beautiful beaches of Goa',
            price: 20000,
            days: 4
        },
        {
            name: 'Kerala Backwaters',
            description: 'Experience the serene backwaters and lush landscapes',
            price: 30000,
            days: 5
        },
        {
            name: 'Himalayan Adventure',
            description: 'Trek through beautiful mountain scenery in Himachal',
            price: 35000,
            days: 7
        }
    ];
    
    packages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';
        packageCard.innerHTML = `
            <h3>${pkg.name}</h3>
            <p>${pkg.description}</p>
            <p>${pkg.days} days</p>
            <p class="price-tag">₹${pkg.price}</p>
            <button class="submit-btn">Book Now</button>
        `;
        packagesGrid.appendChild(packageCard);
    });
}