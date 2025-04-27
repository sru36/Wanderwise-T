// packages.js - Handles travel packages display and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load packages
    loadPackages();
});

function loadPackages() {
    const packagesGrid = document.getElementById('packages-grid');
    if (!packagesGrid) return;
    
    // Clear existing packages
    packagesGrid.innerHTML = '';
    
    // Load packages from the data file
    travelPackages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';
        
        // Create HTML for the package card
        packageCard.innerHTML = `
            <h3>${pkg.name}</h3>
            <p>${pkg.description}</p>
            <p><strong>Destinations:</strong> ${pkg.destinations.join(', ')}</p>
            <p><strong>Highlights:</strong> ${pkg.highlights.join(', ')}</p>
            <p><strong>Duration:</strong> ${pkg.days} days</p>
            <p class="price-tag">₹${pkg.price}</p>
            <button class="submit-btn book-package-btn" data-package="${pkg.name}">Book Now</button>
        `;
        
        packagesGrid.appendChild(packageCard);
    });
    
    // Add event listeners to all Book Now buttons
    const bookButtons = document.querySelectorAll('.book-package-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            bookPackage(packageName);
        });
    });
}

function bookPackage(packageName) {
    // Find the selected package from the data
    const selectedPackage = travelPackages.find(pkg => pkg.name === packageName);
    
    if (!selectedPackage) {
        console.error('Package not found:', packageName);
        return;
    }
    
    // Store selected package in session storage for booking process
    sessionStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
    
    // Redirect to booking page
    window.location.href = 'booking.html';
}