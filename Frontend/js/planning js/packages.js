
// packages.js
document.addEventListener('DOMContentLoaded', function() {
    loadPackages();
});

function loadPackages() {
    const packagesGrid = document.getElementById('packages-grid');
    if (!packagesGrid) return;
    const packages = [
        {name: 'Golden Triangle Tour', description: 'Delhi, Agra, Jaipur', price: 25000, days: 6},
        {name: 'Goa Beach Vacation', description: 'Relax on the beaches of Goa', price: 20000, days: 4},
    ];
    packages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';
        packageCard.innerHTML = `
            <h3>${pkg.name}</h3>
            <p>${pkg.description}</p>
            <p>${pkg.days} days</p>
            <p>₹${pkg.price}</p>
        `;
        packagesGrid.appendChild(packageCard);
    });
}
