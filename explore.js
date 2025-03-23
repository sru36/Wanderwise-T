// Global variables
let currentUser = null;
let currentDestination = null;
let selectedRating = 0;

// DOM Elements
const destinationsContainer = document.getElementById('destinationsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const destinationModal = document.getElementById('destinationModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalLocation = document.getElementById('modalLocation');
const modalRating = document.getElementById('modalRating');
const modalDescription = document.getElementById('modalDescription');
const reviewFormContainer = document.getElementById('reviewFormContainer');
const reviewsList = document.getElementById('reviewsList');

// Auth elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeUser = document.getElementById('welcomeUser');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');

// Check if user is logged in
function checkAuthStatus() {
    fetch('/auth/check')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                currentUser = {
                    id: data.userId,
                    username: data.username
                };
                loginBtn.style.display = 'none';
                signupBtn.style.display = 'none';
                logoutBtn.style.display = 'inline';
                welcomeUser.style.display = 'inline';
                welcomeUser.textContent = `Welcome, ${data.username}!`;
            } else {
                currentUser = null;
                loginBtn.style.display = 'inline';
                signupBtn.style.display = 'inline';
                logoutBtn.style.display = 'none';
                welcomeUser.style.display = 'none';
            }
        })
        .catch(error => console.error('Error checking auth status:', error));
}

// Load destinations based on category
function loadDestinations(category = 'all', searchTerm = '') {
    destinationsContainer.innerHTML = '<div class="loading">Loading destinations...</div>';
    
    let url = '/destinations';
    if (category !== 'all') {
        url += `?category=${category}`;
    }
    
    if (searchTerm) {
        url = `/destinations/search/${searchTerm}`;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(destinations => {
            if (destinations.length === 0) {
                destinationsContainer.innerHTML = '<div class="loading">No destinations found.</div>';
                return;
            }
            
            destinationsContainer.innerHTML = '';
            destinations.forEach(destination => {
                const card = createDestinationCard(destination);
                destinationsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading destinations:', error);
            destinationsContainer.innerHTML = '<div class="loading">Error loading destinations. Please try again.</div>';
        });
}

// Create a destination card element
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    
    const stars = getStarRating(destination.rating || 0);
    
    card.innerHTML = `
        <img src="${destination.image_url || 'images/placeholder.jpg'}" alt="${destination.name}" class="destination-img">
        <div class="destination-info">
            <h3 class="destination-name">${destination.name}</h3>
            <div class="destination-location">
                <i class="fas fa-map-marker-alt"></i> ${destination.location}
            </div>
            <div class="destination-rating">${stars}</div>
            <p class="destination-description">${destination.description.substring(0, 100)}...</p>
            <button class="view-btn" data-id="${destination.id}">View Details</button>
        </div>
    `;
    
    const viewBtn = card.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => openDestinationModal(destination.id));
    
    return card;
}

// Generate star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Open destination modal with details
function openDestinationModal(destinationId) {
    fetch(`/destinations/${destinationId}`)
        .then(response => response.json())
        .then(destination => {
            currentDestination = destination;
            
            modalImg.src = destination.image_url || 'images/placeholder.jpg';
            modalImg.alt = destination.name;
            modalName.textContent = destination.name;
            modalLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${destination.location}`;
            modalRating.innerHTML = getStarRating(destination.rating || 0);
            modalDescription.textContent = destination.description;
            
            // Load reviews
            loadReviews(destination);
            
            // Show review form if logged in
            updateReviewForm();
            
            destinationModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error loading destination details:', error);
            alert('Error loading destination details. Please try again.');
        });
}

// Load reviews for a destination
function loadReviews(destination) {
    const reviews = destination.reviews || [];
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
        return;
    }
    
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        
        const date = new Date(review.created_at);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
        });
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.username}</span>
                <span class="review-date">${formattedDate}</span>
            </div>
            <div class="review-rating">${getStarRating(review.rating)}</div>
            <p class="review-text">${review.comment || 'No comment provided.'}</p>
        `;
        
        reviewsList.appendChild(reviewElement);
    });
}

// Update review form based on login status
function updateReviewForm() {
    if (!currentUser) {
        reviewFormContainer.innerHTML = `
            <div class="auth-message">
                <p>Please <a href="#" class="auth-link login-link">login</a> or <a href="#" class="auth-link signup-link">sign up</a> to leave a review.</p>
            </div>
        `;
        
        const loginLink = reviewFormContainer.querySelector('.login-link');
        const signupLink = reviewFormContainer.querySelector('.signup-link');
        
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            destinationModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
        
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            destinationModal.style.display = 'none';
            signupModal.style.display = 'block';
        });
        
        return;
    }
    
    // Check if user already reviewed this destination
    const userReview = currentDestination.reviews?.find(review => review.user_id === currentUser.id);
    
    if (userReview) {
        reviewFormContainer.innerHTML = `
            <div class="auth-message">
                <p>You have already reviewed this destination.</p>
            </div>
        `;
        return;
    }
    
    reviewFormContainer.innerHTML = `
        <form id="reviewForm" class="review-form">
            <div class="rating-selector">
                <span>Your Rating:</span>
                <span class="rating-star" data-rating="1"><i class="far fa-star"></i></span>
                <span class="rating-star" data-rating="2"><i class="far fa-star"></i></span>
                <span class="rating-star" data-rating="3"><i class="far fa-star"></i></span>
                <span class="rating-star" data-rating="4"><i class="far fa-star"></i></span>
                <span class="rating-star" data-rating="5"><i class="far fa-star"></i></span>
            </div>
            <textarea id="reviewComment" class="review-input" placeholder="Share your experience..."></textarea>
            <div id="reviewError" class="error-message"></div>
            <button type="submit" class="submit-review">Submit Review</button>
        </form>
    `;
    
    // Set up rating stars
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            
            // Update stars UI
            ratingStars.forEach(s => {
                const starIcon = s.querySelector('i');
                if (parseInt(s.dataset.rating) <= selectedRating) {
                    starIcon.className = 'fas fa-star';
                    s.classList.add('active');
                } else {
                    starIcon.className = 'far fa-star';
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseover', () => {
            const hoverRating = parseInt(star.dataset.rating);
            
            ratingStars.forEach(s => {
                const starIcon = s.querySelector('i');
                if (parseInt(s.dataset.rating) <= hoverRating) {
                    starIcon.className = 'fas fa-star';
                } else {
                    if (parseInt(s.dataset.rating) <= selectedRating) {
                        starIcon.className = 'fas fa-star';
                    } else {
                        starIcon.className = 'far fa-star';
                    }
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            ratingStars.forEach(s => {
                const starIcon = s.querySelector('i');
                if (parseInt(s.dataset.rating) <= selectedRating) {
                    starIcon.className = 'fas fa-star';
                } else {
                    starIcon.className = 'far fa-star';
                }
            });
        });
    });
    
    // Set up review form submission
    const reviewForm = document.getElementById('reviewForm');
    const reviewError = document.getElementById('reviewError');
    
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (selectedRating === 0) {
            reviewError.textContent = 'Please select a rating';
            return;
        }
        
        const comment = document.getElementById('reviewComment').value;
        
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                destinationId: currentDestination.id,
                rating: selectedRating,
                comment: comment
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                reviewError.textContent = data.error;
                return;
            }
            
            // Refresh destination info and reviews
            openDestinationModal(currentDestination.id);
        })
        .catch(error => {
            console.error('Error submitting review:', error);
            reviewError.textContent = 'Error submitting review. Please try again.';
        });
    });
}

// Event listeners for modals
closeModal.addEventListener('click', () => {
    destinationModal.style.display = 'none';
});

closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

closeSignupModal.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

// Switch between login and signup
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            loginError.textContent = data.error;
            return;
        }
        
        // Login successful
        loginModal.style.display = 'none';
        checkAuthStatus();
    })
    .catch(error => {
        console.error('Error logging in:', error);
        loginError.textContent = 'Error logging in. Please try again.';
    });
});

// Signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        signupError.textContent = 'Passwords do not match';
        return;
    }
    
    fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            signupError.textContent = data.error;
            return;
        }
        
        // Signup successful
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
        loginError.textContent = '';
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = '';
    })
    .catch(error => {
        console.error('Error signing up:', error);
        signupError.textContent = 'Error signing up. Please try again.';
    });
});

// Logout functionality
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    fetch('/auth/logout', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        checkAuthStatus();
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
});

// Search functionality
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        loadDestinations('all', searchTerm);
        
        // Reset active category
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Category filters
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        // Update active class
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Clear search input
        searchInput.value = '';
        
        // Load destinations by category
        loadDestinations(category);
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === destinationModal) {
        destinationModal.style.display = 'none';
    }
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Initialize the app
function initApp() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Load initial destinations
    loadDestinations();
    
    // Set active category
    document.querySelector('[data-category="all"]').classList.add('active');
}

// Run on page load
document.addEventListener('DOMContentLoaded', initApp);