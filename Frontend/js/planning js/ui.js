// ui.js - Handles UI interactions and display

// Switch between tabs (login/signup)
function setupTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formContainers = document.querySelectorAll('.form-container');
    
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
}

// Initialize testimonials carousel if exists
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
            
            // Create stars based on rating
            starsElement.innerHTML = '';
            for (let i = 0; i < testimony.rating; i++) {
                const star = document.createElement('span');
                star.className = 'star';
                star.innerHTML = '★';
                starsElement.appendChild(star);
            }
        }

        // Show initial testimonial
        updateTestimonial();

        // Set up testimonial rotation
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000); // Change testimonial every 5 seconds
    }
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
}

// Export functions for use in other modules
export {
    setupTabSwitching,
    initializeTestimonials,
    initializeTripPlanner
};