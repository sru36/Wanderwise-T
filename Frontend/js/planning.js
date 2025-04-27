document.addEventListener('DOMContentLoaded', function() {
    // Variables to store DOM elements
    const authContainer = document.getElementById('auth-container');
    const planningContainer = document.getElementById('planning-container');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formContainers = document.querySelectorAll('.form-container');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tripForm = document.getElementById('tripForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const resultsContainer = document.getElementById('results-container');
    const loadingIndicator = document.getElementById('loading');
    const saveItineraryBtn = document.getElementById('saveItineraryBtn');

    // Check if user is already logged in
    checkAuthStatus();

    // Tab switching functionality
    tabBtns.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show active form container
            formContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === `${tabName}-form`) {
                    container.classList.add('active');
                }
            });
        });
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here we're simulating login - in a real app, you'd validate with a server
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Show planning interface
        authContainer.classList.remove('active');
        planningContainer.classList.add('active');
        loadPackages(); // Load package suggestions
    });

    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Here we're simulating signup - in a real app, you'd send this to a server
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        
        // Show planning interface
        authContainer.classList.remove('active');
        planningContainer.classList.add('active');
        loadPackages(); // Load package suggestions
    });

    // Trip planning form submission
    tripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.getElementById('destination').value;
        const days = document.getElementById('days').value;
        const budget = document.getElementById('budget').value;
        
        // Show loading state
        resultsContainer.classList.remove('hidden');
        loadingIndicator.classList.remove('hidden');
        document.getElementById('trip-results').classList.add('hidden');
        
        // Generate trip suggestions
        setTimeout(() => {
            generateTripPlan(destination, days, budget);
            loadingIndicator.classList.add('hidden');
            document.getElementById('trip-results').classList.remove('hidden');
        }, 1500); // Simulating loading time
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        // Show auth interface
        planningContainer.classList.remove('active');
        authContainer.classList.add('active');
        
        // Reset forms
        loginForm.reset();
        signupForm.reset();
        tripForm.reset();
        resultsContainer.classList.add('hidden');
    });

    // Save itinerary button
    saveItineraryBtn.addEventListener('click', function() {
        alert('Itinerary saved successfully! You can access it in your account.');
    });

    // Check if user is already logged in
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (isLoggedIn === 'true') {
            authContainer.classList.remove('active');
            planningContainer.classList.add('active');
            loadPackages(); // Load package suggestions
        }
    }

    // Load travel packages
    function loadPackages() {
        const packagesGrid = document.getElementById('packages-grid');
        packagesGrid.innerHTML = ''; // Clear existing packages
        
        // Sample travel packages - in a real application, this would come from a server
        const packages = [
            {
                name: 'Golden Triangle Tour',
                description: 'Visit Delhi, Agra, and Jaipur - the golden triangle of Indian tourism.',
                price: 25000,
                days: 6,
                image: '/api/placeholder/400/300'
            },
            {
                name: 'Kerala Backwaters',
                description: 'Experience the serene backwaters and lush greenery of God\'s own country.',
                price: 30000,
                days: 5,
                image: '/api/placeholder/400/300'
            },
            {
                name: 'Goa Beach Vacation',
                description: 'Relax on the pristine beaches of Goa with exciting water activities.',
                price: 20000,
                days: 4,
                image: '/api/placeholder/400/300'
            },
            {
                name: 'Varanasi Spiritual Journey',
                description: 'Discover the spiritual essence of India in the holy city of Varanasi.',
                price: 15000,
                days: 3,
                image: '/api/placeholder/400/300'
            },
            {
                name: 'Himachal Adventure',
                description: 'Trek through the beautiful mountains of Himachal Pradesh.',
                price: 28000,
                days: 7,
                image: '/api/placeholder/400/300'
            },
            {
                name: 'Royal Rajasthan',
                description: 'Experience the royal heritage and culture of Rajasthan.',
                price: 35000,
                days: 8,
                image: '/api/placeholder/400/300'
            }
        ];
        
        // Create package cards
        packages.forEach(pkg => {
            const packageCard = document.createElement('div');
            packageCard.className = 'package-card';
            
            packageCard.innerHTML = `
                <div class="package-image" style="background-image: url('${pkg.image}')"></div>
                <div class="package-details">
                    <h3>${pkg.name}</h3>
                    <p>${pkg.description}</p>
                    <p>${pkg.days} days</p>
                    <p class="package-price">₹${pkg.price} per person</p>
                    <button class="package-btn" onclick="alert('Package selected! You can customize it in your itinerary.')">View Details</button>
                </div>
            `;
            
            packagesGrid.appendChild(packageCard);
        });
    }

    // Generate trip plan based on user inputs
    function generateTripPlan(destination, days, budget) {
        // In a real application, this would make API calls to get real data
        const travelOptions = document.getElementById('travel-options');
        const accommodationOptions = document.getElementById('accommodation-options');
        const placesToVisit = document.getElementById('places-to-visit');
        
        // Clear previous results
        travelOptions.innerHTML = '';
        accommodationOptions.innerHTML = '';
        placesToVisit.innerHTML = '';
        
        // Destination-specific data
        const destinationData = getDestinationData(destination);
        const dailyBudget = budget / days;
        
        // Generate travel options
        generateTravelCards(travelOptions, destinationData.travel, budget);
        
        // Generate accommodation options
        generateAccommodationCards(accommodationOptions, destinationData.accommodations, dailyBudget);
        
        // Generate places to visit
        generatePlacesCards(placesToVisit, destinationData.places, days);
    }

    // Generate travel option cards
    function generateTravelCards(container, options, budget) {
        options.forEach(option => {
            if (option.price <= budget * 0.3) { // Assuming travel should be max 30% of total budget
                const card = document.createElement('div');
                card.className = 'card';
                
                card.innerHTML = `
                    <h4>${option.mode}</h4>
                    <p>${option.description}</p>
                    <span class="price-tag">₹${option.price}</span>
                `;
                
                container.appendChild(card);
            }
        });
    }

    // Generate accommodation option cards
    function generateAccommodationCards(container, options, dailyBudget) {
        options.forEach(option => {
            if (option.price <= dailyBudget * 0.5) { // Assuming accommodation should be max 50% of daily budget
                const card = document.createElement('div');
                card.className = 'card';
                
                card.innerHTML = `
                    <h4>${option.name}</h4>
                    <p>${option.description}</p>
                    <p>Rating: ${option.rating}/5</p>
                    <span class="price-tag">₹${option.price} per night</span>
                `;
                
                container.appendChild(card);
            }
        });
    }

    // Generate places to visit cards
    function generatePlacesCards(container, places, days) {
        // Limit places based on trip duration (assuming 2-3 places per day)
        const placesToShow = places.slice(0, Math.min(places.length, days * 2));
        
        placesToShow.forEach(place => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <h4>${place.name}</h4>
                <p>${place.description}</p>
                <p>Recommended time: ${place.time}</p>
                ${place.entryFee ? `<span class="price-tag">Entry: ₹${place.entryFee}</span>` : ''}
            `;
            
            container.appendChild(card);
        });
    }

    // Get destination-specific data
    function getDestinationData(destination) {
        // This would ideally come from a database or API
        const destinationData = {
            delhi: {
                travel: [
                    { mode: 'Flight', description: 'Direct flights available from major cities', price: 5000 },
                    { mode: 'Train', description: 'Well-connected by Indian Railways', price: 1500 },
                    { mode: 'Bus', description: 'Luxury and regular buses available', price: 1000 }
                ],
                accommodations: [
                    { name: 'Luxury Hotel', description: 'Five-star amenities in central Delhi', rating: 5, price: 8000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay with good amenities', rating: 4, price: 3000 },
                    { name: 'Budget Hotel', description: 'Clean and basic accommodations', rating: 3, price: 1500 },
                    { name: 'Hostel', description: 'Affordable option for backpackers', rating: 3.5, price: 600 }
                ],
                places: [
                    { name: 'Red Fort', description: 'UNESCO World Heritage Site and historic monument', time: '2-3 hours', entryFee: 150 },
                    { name: 'Qutub Minar', description: 'Tallest brick minaret in the world', time: '1-2 hours', entryFee: 100 },
                    { name: 'India Gate', description: 'War memorial in central Delhi', time: '1 hour', entryFee: 0 },
                    { name: 'Humayun\'s Tomb', description: 'Beautiful Mughal architecture', time: '2 hours', entryFee: 120 },
                    { name: 'Chandni Chowk', description: 'Historic market with delicious street food', time: '3-4 hours', entryFee: 0 },
                    { name: 'Lotus Temple', description: 'Beautiful Bahá\'í House of Worship', time: '1-2 hours', entryFee: 0 }
                ]
            },
            mumbai: {
                travel: [
                    { mode: 'Flight', description: 'Direct flights available from major cities', price: 6000 },
                    { mode: 'Train', description: 'Well-connected by Indian Railways', price: 2000 },
                    { mode: 'Bus', description: 'Luxury and regular buses available', price: 1200 }
                ],
                accommodations: [
                    { name: 'Luxury Hotel', description: 'Five-star amenities in South Mumbai', rating: 5, price: 10000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay with good amenities', rating: 4, price: 4000 },
                    { name: 'Budget Hotel', description: 'Clean and basic accommodations', rating: 3, price: 2000 },
                    { name: 'Hostel', description: 'Affordable option for backpackers', rating: 3.5, price: 800 }
                ],
                places: [
                    { name: 'Gateway of India', description: 'Historic monument overlooking the Arabian Sea', time: '1-2 hours', entryFee: 0 },
                    { name: 'Marine Drive', description: 'Scenic boulevard along the coastline', time: '1-2 hours', entryFee: 0 },
                    { name: 'Elephanta Caves', description: 'Ancient cave temples on Elephanta Island', time: '4-5 hours', entryFee: 100 },
                    { name: 'Chhatrapati Shivaji Terminus', description: 'Historic railway station and UNESCO site', time: '1 hour', entryFee: 0 },
                    { name: 'Juhu Beach', description: 'Popular beach with street food and entertainment', time: '2-3 hours', entryFee: 0 },
                    { name: 'Sanjay Gandhi National Park', description: 'Large protected area with wildlife', time: '4-5 hours', entryFee: 80 }
                ]
            },
            goa: {
                travel: [
                    { mode: 'Flight', description: 'Direct flights available from major cities', price: 5500 },
                    { mode: 'Train', description: 'Scenic route via Konkan Railway', price: 1800 },
                    { mode: 'Bus', description: 'Luxury and sleeper buses available', price: 1300 }
                ],
                accommodations: [
                    { name: 'Beach Resort', description: 'Luxury beachfront resort', rating: 5, price: 7000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay near popular beaches', rating: 4, price: 3500 },
                    { name: 'Beach Hut', description: 'Simple huts close to the beach', rating: 3, price: 1800 },
                    { name: 'Hostel', description: 'Social accommodation for backpackers', rating: 3.5, price: 700 }
                ],
                places: [
                    { name: 'Calangute Beach', description: 'Popular beach with water sports', time: '3-4 hours', entryFee: 0 },
                    { name: 'Dudhsagar Falls', description: 'Spectacular four-tiered waterfall', time: 'Full day', entryFee: 100 },
                    { name: 'Fort Aguada', description: '17th-century Portuguese fort', time: '2-3 hours', entryFee: 50 },
                    { name: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage Site with remains of St. Francis Xavier', time: '1-2 hours', entryFee: 0 },
                    { name: 'Anjuna Flea Market', description: 'Popular market for souvenirs and handicrafts', time: '3-4 hours', entryFee: 0 },
                    { name: 'Cruise on Mandovi River', description: 'Evening cruise with entertainment', time: '2 hours', entryFee: 500 }
                ]
            },
            jaipur: {
                travel: [
                    { mode: 'Flight', description: 'Direct flights available from major cities', price: 4500 },
                    { mode: 'Train', description: 'Well-connected by Indian Railways', price: 1200 },
                    { mode: 'Bus', description: 'Luxury and regular buses available', price: 800 }
                ],
                accommodations: [
                    { name: 'Heritage Hotel', description: 'Stay in converted palaces and havelis', rating: 5, price: 8000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay with Rajasthani decor', rating: 4, price: 3000 },
                    { name: 'Budget Hotel', description: 'Clean and basic accommodations', rating: 3, price: 1500 },
                    { name: 'Hostel', description: 'Affordable option for backpackers', rating: 3.5, price: 600 }
                ],
                places: [
                    { name: '