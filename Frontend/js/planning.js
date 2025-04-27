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
                    { name: 'Amber Fort', description: 'Magnificent hilltop fort with elephant rides', time: '3-4 hours', entryFee: 200 },
                    { name: 'Hawa Mahal', description: 'Palace of Winds with unique architecture', time: '1-2 hours', entryFee: 50 },
                    { name: 'City Palace', description: 'Royal residence with museums', time: '2-3 hours', entryFee: 300 },
                    { name: 'Jantar Mantar', description: 'UNESCO site with astronomical instruments', time: '1-2 hours', entryFee: 100 },
                    { name: 'Jal Mahal', description: 'Beautiful palace in the middle of Man Sagar Lake', time: '1 hour', entryFee: 0 },
                    { name: 'Nahargarh Fort', description: 'Stunning views of the Pink City', time: '2-3 hours', entryFee: 50 }
                ]
            },
            agra: {
                travel: [
                    { mode: 'Flight', description: 'Flights to nearby cities with road transfer', price: 5000 },
                    { mode: 'Train', description: 'Well-connected by Indian Railways', price: 1300 },
                    { mode: 'Bus', description: 'Luxury and regular buses available', price: 900 }
                ],
                accommodations: [
                    { name: 'Luxury Hotel', description: 'Five-star amenities with Taj Mahal views', rating: 5, price: 9000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay with good amenities', rating: 4, price: 3500 },
                    { name: 'Budget Hotel', description: 'Clean and basic accommodations', rating: 3, price: 1500 },
                    { name: 'Hostel', description: 'Affordable option for backpackers', rating: 3.5, price: 600 }
                ],
                places: [
                    { name: 'Taj Mahal', description: 'UNESCO World Heritage Site and symbol of love', time: '3-4 hours', entryFee: 1100 },
                    { name: 'Agra Fort', description: 'UNESCO site and historical Mughal fortress', time: '2-3 hours', entryFee: 650 },
                    { name: 'Fatehpur Sikri', description: 'Ancient city built by Emperor Akbar', time: '3-4 hours', entryFee: 610 },
                    { name: 'Mehtab Bagh', description: 'Garden complex with Taj Mahal views', time: '1-2 hours', entryFee: 300 },
                    { name: 'Itimad-ud-Daulah', description: 'Baby Taj with intricate marble work', time: '1-2 hours', entryFee: 250 },
                    { name: 'Akbar\'s Tomb', description: 'Beautiful mausoleum in Sikandra', time: '1-2 hours', entryFee: 310 }
                ]
            },
            varanasi: {
                travel: [
                    { mode: 'Flight', description: 'Direct flights available from major cities', price: 5500 },
                    { mode: 'Train', description: 'Well-connected by Indian Railways', price: 1500 },
                    { mode: 'Bus', description: 'Luxury and regular buses available', price: 1100 }
                ],
                accommodations: [
                    { name: 'Heritage Hotel', description: 'Historic building with Ganga views', rating: 5, price: 6000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay with good amenities', rating: 4, price: 2500 },
                    { name: 'Budget Hotel', description: 'Clean and basic accommodations', rating: 3, price: 1200 },
                    { name: 'Hostel', description: 'Affordable option for backpackers', rating: 3.5, price: 500 }
                ],
                places: [
                    { name: 'Dashashwamedh Ghat', description: 'Famous ghat with evening aarti ceremony', time: '2-3 hours', entryFee: 0 },
                    { name: 'Kashi Vishwanath Temple', description: 'One of the most famous Hindu temples', time: '1-2 hours', entryFee: 0 },
                    { name: 'Sarnath', description: 'Buddhist pilgrimage site', time: 'Half day', entryFee: 200 },
                    { name: 'Morning Boat Ride', description: 'Experience sunrise on the Ganges', time: '2-3 hours', entryFee: 500 },
                    { name: 'Ramnagar Fort', description: 'Royal residence with museum', time: '2-3 hours', entryFee: 100 },
                    { name: 'BHU Campus', description: 'Prestigious university with Vishwanath Temple', time: '2-3 hours', entryFee: 0 }
                ]
            },
            kolkata: {
                travel: [
                    { mode: 'Flight', description: 'Direct flights available from major cities', price: 5800 },
                    { mode: 'Train', description: 'Well-connected by Indian Railways', price: 1800 },
                    { mode: 'Bus', description: 'Luxury and regular buses available', price: 1300 }
                ],
                accommodations: [
                    { name: 'Luxury Hotel', description: 'Five-star amenities in central Kolkata', rating: 5, price: 7000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay with good amenities', rating: 4, price: 3000 },
                    { name: 'Budget Hotel', description: 'Clean and basic accommodations', rating: 3, price: 1500 },
                    { name: 'Hostel', description: 'Affordable option for backpackers', rating: 3.5, price: 600 }
                ],
                places: [
                    { name: 'Victoria Memorial', description: 'Beautiful marble building and museum', time: '2-3 hours', entryFee: 30 },
                    { name: 'Howrah Bridge', description: 'Iconic cantilever bridge', time: '1 hour', entryFee: 0 },
                    { name: 'Park Street', description: 'Famous street with restaurants and nightlife', time: '3-4 hours', entryFee: 0 },
                    { name: 'Indian Museum', description: 'Oldest and largest museum in India', time: '2-3 hours', entryFee: 20 },
                    { name: 'Dakshineswar Kali Temple', description: 'Hindu temple on the banks of Hooghly River', time: '2-3 hours', entryFee: 0 },
                    { name: 'Science City', description: 'Science museum with interactive exhibits', time: '3-4 hours', entryFee: 50 }
                ]
            },
            chennai: {
                travel: [
                    { mode: 'Flight', description: 'Direct flights available from major cities', price: 5500 },
                    { mode: 'Train', description: 'Well-connected by Indian Railways', price: 1700 },
                    { mode: 'Bus', description: 'Luxury and regular buses available', price: 1200 }
                ],
                accommodations: [
                    { name: 'Luxury Hotel', description: 'Five-star amenities in central Chennai', rating: 5, price: 8000 },
                    { name: 'Mid-range Hotel', description: 'Comfortable stay with good amenities', rating: 4, price: 3500 },
                    { name: 'Budget Hotel', description: 'Clean and basic accommodations', rating: 3, price: 1800 },
                    { name: 'Hostel', description: 'Affordable option for backpackers', rating: 3.5, price: 700 }
                ],
                places: [
                    { name: 'Marina Beach', description: 'Second longest urban beach in the world', time: '2-3 hours', entryFee: 0 },
                    { name: 'Kapaleeshwarar Temple', description: 'Ancient Dravidian architecture', time: '1-2 hours', entryFee: 0 },
                    { name: 'Fort St. George', description: 'First English fortress in India', time: '2-3 hours', entryFee: 100 },
                    { name: 'Government Museum', description: 'Second oldest museum in India', time: '2-3 hours', entryFee: 15 },
                    { name: 'San Thome Basilica', description: 'Neo-Gothic style church', time: '1-2 hours', entryFee: 0 },
                    { name: 'Mahabalipuram', description: 'UNESCO World Heritage Site with rock-cut temples', time: 'Full day', entryFee: 600 }
                ]
            }
        };
        
        // Convert destination to lowercase and find matching data
        const lowerDestination = destination.toLowerCase();
        return destinationData[lowerDestination] || {
            travel: [
                { mode: 'Flight', description: 'Check for flights to this destination', price: 5000 },
                { mode: 'Train', description: 'Railway connections may be available', price: 1500 },
                { mode: 'Bus', description: 'Bus services to major cities', price: 1000 }
            ],
            accommodations: [
                { name: 'Various accommodations', description: 'Options available based on your budget', rating: 4, price: 3000 }
            ],
            places: [
                { name: 'Local attractions', description: 'Explore the local culture and sights', time: 'Varies', entryFee: 0 }
            ]
        };
    }

    // Add event listeners for recommendations
    document.querySelectorAll('.recommendation').forEach(rec => {
        rec.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            document.getElementById('destination').value = destination;
        });
    });

    // Initialize popular destinations section
    initializePopularDestinations();

    // Initialize popular destinations clickable cards
    function initializePopularDestinations() {
        const popularDestinations = [
            { name: 'Delhi', image: '/api/placeholder/300/200' },
            { name: 'Mumbai', image: '/api/placeholder/300/200' },
            { name: 'Jaipur', image: '/api/placeholder/300/200' },
            { name: 'Goa', image: '/api/placeholder/300/200' },
            { name: 'Varanasi', image: '/api/placeholder/300/200' },
            { name: 'Agra', image: '/api/placeholder/300/200' }
        ];
        
        const container = document.getElementById('popular-destinations');
        if (container) {
            container.innerHTML = '';
            
            popularDestinations.forEach(dest => {
                const card = document.createElement('div');
                card.className = 'destination-card';
                card.innerHTML = `
                    <div class="destination-image" style="background-image: url('${dest.image}')"></div>
                    <h3>${dest.name}</h3>
                `;
                
                card.addEventListener('click', function() {
                    document.getElementById('destination').value = dest.name;
                    // Scroll to trip form
                    document.getElementById('plan-trip-section').scrollIntoView({ behavior: 'smooth' });
                });
                
                container.appendChild(card);
            });
        }
    }

    // Initialize testimonials carousel if exists
    initializeTestimonials();

    function initializeTestimonials() {
        const testimonialContainer = document.getElementById('testimonials-container');
        if (testimonialContainer) {
            const testimonials = [
                { name: 'Rahul Sharma', text: 'This travel planner helped me organize an amazing trip to Jaipur. All recommendations were within my budget!', rating: 5 },
                { name: 'Priya Patel', text: 'My Goa vacation was perfectly planned. The beach hut recommendation was exactly what I was looking for.', rating: 5 },
                { name: 'Amit Singh', text: 'Planned my family trip to Kerala in just minutes. The suggested itinerary was perfect for all ages.', rating: 4 }
            ];
            
            let currentTestimonial = 0;
            const testimonialElement = document.getElementById('current-testimonial');
            const nameElement = document.getElementById('testimonial-name');
            const starsElement = document.getElementById('testimonial-stars');
            
            function updateTestimonial() {
                const testimony = testimonials[currentTestimonial];
                testimonialElement.textContent = testimony.text;
                nameElement.textContent = testimony.name;
                
               

                //update stars
starsElement.appendChild(star);
}

// Show updated testimonial
updateTestimonial();

// Set up testimonial rotation
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}, 5000); // Change testimonial every 5 seconds
}
}
}

// Check if user is logged in, otherwise redirect to login page
function checkUserAuth() {
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
window.location.href = 'login.html';
return false;
}
return true;
}

// Initialize trip planner form
function initializeTripPlanner() {
const plannerSection = document.getElementById('plan-trip-section');
if (!plannerSection) return;

// Create the trip planner form
plannerSection.innerHTML = `
<div class="trip-planner-container">
<h2>Plan Your Perfect Trip</h2>
<div class="planner-form">
    <div class="form-group">
        <label for="destination">Destination</label>
        <input type="text" id="destination" placeholder="Where do you want to go?">
    </div>
    <div class="form-group">
        <label for="trip-duration">Trip Duration (days)</label>
        <input type="number" id="trip-duration" min="1" max="30" value="3">
    </div>
    <div class="form-group">
        <label for="budget">Budget (₹)</label>
        <input type="number" id="budget" placeholder="Your budget in rupees">
    </div>
    <button id="plan-trip-button" class="btn-primary">Go - Plan My Trip</button>
</div>
</div>
<div id="trip-results" class="hidden">
<h3>Your Personalized Trip Plan</h3>
<div class="results-container">
    <div class="travel-options">
        <h4>Travel Options</h4>
        <div id="travel-recommendations"></div>
    </div>
    <div class="accommodation-options">
        <h4>Accommodation Options</h4>
        <div id="accommodation-recommendations"></div>
    </div>
    <div class="places-to-visit">
        <h4>Places to Visit</h4>
        <div id="places-recommendations"></div>
    </div>
</div>
</div>
<div class="package-recommendations">
<h3>Popular Travel Packages</h3>
<div id="package-container" class="package-grid"></div>
</div>
`;

// Set up event listener for the plan trip button
const planTripButton = document.getElementById('plan-trip-button');
planTripButton.addEventListener('click', generateTripPlan);

// Initialize package recommendations
initializePackages();
}

// Generate trip plan based on user input
function generateTripPlan() {
const destination = document.getElementById('destination').value;
const duration = parseInt(document.getElementById('trip-duration').value);
const budget = parseInt(document.getElementById('budget').value);

if (!destination || isNaN(duration) || isNaN(budget)) {
alert('Please fill in all fields correctly.');
return;
}

// Show the results section
document.getElementById('trip-results').classList.remove('hidden');

// Generate travel recommendations based on budget and duration
generateTravelRecommendations(destination, duration, budget);

// Generate accommodation recommendations
generateAccommodationRecommendations(destination, duration, budget);

// Generate places to visit
generatePlacesToVisit(destination, duration);

// Scroll to results
document.getElementById('trip-results').scrollIntoView({ behavior: 'smooth' });
}

// Generate travel recommendations based on budget
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
        <li>Quality homestays in good locations</li>
        <li>Serviced apartments for longer stays</li>
    </ul>
</div>
`;
} else {
recommendations += `
<div class="recommendation-card">
    <h5>Premium Accommodation</h5>
    <p>Recommended daily accommodation budget: ₹${Math.round(accommodationBudget)}</p>
    <ul>
        <li>4-5 star hotels and resorts</li>
        <li>Luxury heritage properties</li>
        <li>Premium villas and boutique hotels</li>
    </ul>
</div>
`;
}

accommodationContainer.innerHTML = recommendations;
}

// Generate places to visit recommendations
function generatePlacesToVisit(destination, duration) {
const placesContainer = document.getElementById('places-recommendations');

// Database of popular Indian destinations and their attractions
const destinationData = {
'Jaipur': {
attractions: ['Amer Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Jal Mahal', 'Albert Hall Museum', 'Nahargarh Fort'],
dailyRecommended: 3
},
'Goa': {
attractions: ['Calangute Beach', 'Baga Beach', 'Fort Aguada', 'Dudhsagar Falls', 'Basilica of Bom Jesus', 'Anjuna Flea Market', 'Chapora Fort'],
dailyRecommended: 2
},
'Kerala': {
attractions: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Kovalam Beach', 'Thekkady Wildlife Sanctuary', 'Fort Kochi', 'Wayanad', 'Kumarakom'],
dailyRecommended: 2
},
'Delhi': {
attractions: ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayun\'s Tomb', 'Lotus Temple', 'Akshardham Temple', 'Chandni Chowk'],
dailyRecommended: 3
},
'Mumbai': {
attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Juhu Beach', 'Siddhi Vinayak Temple', 'Colaba Causeway', 'Bandra-Worli Sea Link'],
dailyRecommended: 3
},
'Agra': {
attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Itimad-ud-Daulah', 'Akbar\'s Tomb', 'Jama Masjid'],
dailyRecommended: 2
},
'Varanasi': {
attractions: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Sarnath', 'Assi Ghat', 'Ramnagar Fort', 'Banaras Hindu University', 'Manikarnika Ghat'],
dailyRecommended: 2
}
};

// Default destination if the entered one is not in our database
const defaultAttraction = {
attractions: ['Local Markets', 'Historical Monuments', 'Natural Attractions', 'Religious Sites', 'Local Cuisine Experience'],
dailyRecommended: 2
};

const destinationInfo = destinationData[destination] || defaultAttraction;

// Calculate how many attractions to recommend based on trip duration
const totalAttractions = Math.min(destinationInfo.attractions.length, duration * destinationInfo.dailyRecommended);
const recommendedAttractions = destinationInfo.attractions.slice(0, totalAttractions);

// Create the itinerary
let itinerary = `
<div class="recommendation-card">
<h5>${destination} Attractions</h5>
<p>Recommended places to visit during your ${duration}-day trip:</p>
<ul>
`;

recommendedAttractions.forEach(attraction => {
itinerary += `<li>${attraction}</li>`;
});

itinerary += `
</ul>
<p>We recommend visiting ${destinationInfo.dailyRecommended} attractions per day for the best experience.</p>
</div>
`;

placesContainer.innerHTML = itinerary;
}

// Initialize travel packages
function initializePackages() {
const packageContainer = document.getElementById('package-container');

// Define popular travel packages
const packages = [
{
destination: 'Golden Triangle',
image: 'images/golden-triangle.jpg',
days: 6,
price: 25000,
description: 'Visit Delhi, Agra, and Jaipur in this classic Indian tour package.'
},
{
destination: 'Kerala Backwaters',
image: 'images/kerala.jpg',
days: 5,
price: 22000,
description: 'Experience the serene backwaters and lush hill stations of Kerala.'
},
{
destination: 'Goa Beach Getaway',
image: 'images/goa.jpg',
days: 4,
price: 18000,
description: 'Relax on beautiful beaches and enjoy the vibrant nightlife of Goa.'
},
{
destination: 'Rajasthan Heritage Tour',
image: 'images/rajasthan.jpg',
days: 8,
price: 35000,
description: 'Explore the royal palaces, forts, and rich culture of Rajasthan.'
},
{
destination: 'Himachal Adventure',
image: 'images/himachal.jpg',
days: 7,
price: 28000,
description: 'Trek through gorgeous mountains and experience adventure sports.'
},
{
destination: 'Andaman Island Escape',
image: 'images/andaman.jpg',
days: 6,
price: 40000,
description: 'Discover pristine beaches and amazing marine life in the Andaman Islands.'
}
];

// Generate package cards
let packageHTML = '';
packages.forEach(pkg => {
packageHTML += `
<div class="package-card">
    <div class="package-image">
        <img src="${pkg.image}" alt="${pkg.destination}" onerror="this.src='images/placeholder.jpg'">
    </div>
    <div class="package-details">
        <h4>${pkg.destination}</h4>
        <p><span class="package-days">${pkg.days} Days</span> | <span class="package-price">₹${pkg.price}</span></p>
        <p>${pkg.description}</p>
        <button class="btn-secondary view-package-btn" data-package="${pkg.destination}">View Package</button>
    </div>
</div>
`;
});

packageContainer.innerHTML = packageHTML;

// Add event listeners to package buttons
const viewButtons = document.querySelectorAll('.view-package-btn');
viewButtons.forEach(button => {
button.addEventListener('click', function() {
const packageName = this.getAttribute('data-package');
viewPackageDetails(packageName);
});
});
}

// Show detailed package information
function viewPackageDetails(packageName) {
// In a real application, this would fetch detailed package information
alert(`You selected the ${packageName} package. In a complete application, this would show detailed information and booking options.`);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
// Check if user is logged in
if (!checkUserAuth()) return;

// Initialize popular destinations
initializePopularDestinations();

// Initialize testimonials if they exist
initializeTestimonials();

// Initialize trip planner
initializeTripPlanner();
});