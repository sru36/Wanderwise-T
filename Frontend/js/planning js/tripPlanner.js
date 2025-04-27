
// tripPlanner.js
document.addEventListener('DOMContentLoaded', function() {
    const tripForm = document.getElementById('tripForm');
    tripForm?.addEventListener('submit', handleTripPlan);
});

function handleTripPlan(e) {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const days = document.getElementById('days').value;
    const budget = document.getElementById('budget').value;
    if (!destination || !days || !budget) return alert('Please fill in all fields');
    loadTripPlan(destination, days, budget);
}

function loadTripPlan(destination, days, budget) {
    // Placeholder logic for generating trip plan
    console.log(`Trip planned for ${destination} for ${days} days with ₹${budget} budget.`);
}
