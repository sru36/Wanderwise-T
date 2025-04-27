
// testimonials.js
document.addEventListener('DOMContentLoaded', function() {
    initializeTestimonials();
});

function initializeTestimonials() {
    const testimonialContainer = document.getElementById('testimonials-container');
    if (!testimonialContainer) return;
    const testimonials = [
        {name: 'Rahul Sharma', text: 'Amazing trip!', rating: 5},
        {name: 'Priya Patel', text: 'Loved the experience.', rating: 5},
    ];
    let index = 0;
    setInterval(() => {
        const current = testimonials[index];
        testimonialContainer.innerHTML = `<p>${current.text}</p><h4>${current.name}</h4>`;
        index = (index + 1) % testimonials.length;
    }, 5000);
}
