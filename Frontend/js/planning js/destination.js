// destinations.js - Contains all destination-related data

// Database of destinations and their details
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

// Popular destinations for UI display
const popularDestinations = [
    { name: 'Delhi', image: '/api/placeholder/300/200' },
    { name: 'Mumbai', image: '/api/placeholder/300/200' },
    { name: 'Jaipur', image: '/api/placeholder/300/200' },
    { name: 'Goa', image: '/api/placeholder/300/200' },
    { name: 'Varanasi', image: '/api/placeholder/300/200' },
    { name: 'Agra', image: '/api/placeholder/300/200' }
];

// Travel packages data
const travelPackages = [
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

// Get destination-specific data
function getDestinationData(destination) {
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

export {
    destinationData,
    popularDestinations,
    travelPackages,
    getDestinationData
};