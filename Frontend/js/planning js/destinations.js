
// destinations.js
document.addEventListener('DOMContentLoaded', function() {
    initializePopularDestinations();
});

function initializePopularDestinations() {
    const destinations = [
        {name: 'Delhi'}, {name: 'Mumbai'}, {name: 'Jaipur'}
    ];
    const container = document.getElementById('popular-destinations');
    if (!container) return;
    container.innerHTML = '';
    destinations.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'destination-card';
        card.innerHTML = `<h3>${dest.name}</h3>`;
        container.appendChild(card);
    });
}
