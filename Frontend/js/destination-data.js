// destinations-data.js - Contains all destination-specific data

const destinationsData = {
    delhi: {
        attractions: [
            { name: 'Red Fort', description: 'UNESCO World Heritage Site and historical monument', entryFee: 500 },
            { name: 'Qutub Minar', description: 'UNESCO World Heritage Site with the tallest brick minaret', entryFee: 300 },
            { name: 'India Gate', description: 'War memorial dedicated to soldiers of the Indian Army', entryFee: 0 },
            { name: 'Humayun\'s Tomb', description: 'UNESCO World Heritage Site and architectural marvel', entryFee: 400 },
            { name: 'Lotus Temple', description: 'Magnificent Bahai House of Worship', entryFee: 0 }
        ],
        transport: {
            local: ['Metro', 'Auto Rickshaw', 'Taxi', 'Bus'],
            intercity: ['Flight', 'Train', 'Bus']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '7000-20000', examples: ['Taj Palace', 'The Oberoi', 'The Leela Palace'] },
            { type: 'Mid-range', priceRange: '3000-7000', examples: ['Radisson Blu', 'Holiday Inn', 'Crowne Plaza'] },
            { type: 'Budget', priceRange: '1000-3000', examples: ['OYO Rooms', 'FabHotels', 'Zostel Hostel'] }
        ]
    },
    mumbai: {
        attractions: [
            { name: 'Gateway of India', description: 'Historic arch monument overlooking the Arabian Sea', entryFee: 0 },
            { name: 'Marine Drive', description: 'Scenic boulevard along the coastline', entryFee: 0 },
            { name: 'Elephanta Caves', description: 'UNESCO World Heritage Site with ancient cave temples', entryFee: 600 },
            { name: 'Juhu Beach', description: 'Famous beach and recreational spot', entryFee: 0 },
            { name: 'Chhatrapati Shivaji Terminus', description: 'UNESCO World Heritage Site and historic railway station', entryFee: 200 }
        ],
        transport: {
            local: ['Local Train', 'Metro', 'Bus', 'Taxi', 'Auto Rickshaw'],
            intercity: ['Flight', 'Train', 'Bus']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '10000-30000', examples: ['Taj Mahal Palace', 'The Oberoi', 'Trident Nariman Point'] },
            { type: 'Mid-range', priceRange: '4000-10000', examples: ['Novotel', 'Ramada Plaza', 'Courtyard by Marriott'] },
            { type: 'Budget', priceRange: '1500-4000', examples: ['FabHotel', 'Treebo', 'OYO Rooms'] }
        ]  
    },
    goa: {
        attractions: [
            { name: 'Calangute Beach', description: 'Goa\'s largest and most popular beach', entryFee: 0 },
            { name: 'Dudhsagar Falls', description: 'One of India\'s tallest waterfalls', entryFee: 400 },
            { name: 'Fort Aguada', description: '17th-century Portuguese fort overlooking the Arabian Sea', entryFee: 250 },
            { name: 'Anjuna Flea Market', description: 'Famous hippie market with unique souvenirs', entryFee: 0 },
            { name: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage Site and historic church', entryFee: 0 }
        ],
        transport: {
            local: ['Scooter/Bike Rental', 'Taxi', 'Auto Rickshaw', 'Bus'],
            intercity: ['Flight', 'Train', 'Bus']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '8000-25000', examples: ['Taj Exotica', 'Grand Hyatt', 'W Goa'] },
            { type: 'Mid-range', priceRange: '3000-8000', examples: ['Novotel Goa', 'Country Inn & Suites', 'Radisson Blu'] },
            { type: 'Budget', priceRange: '1000-3000', examples: ['Beach Hostels', 'Guest Houses', 'OYO Rooms'] }
        ]  
    },
    jaipur: {
        attractions: [
            { name: 'Amber Fort', description: 'Magnificent fort with stunning architecture', entryFee: 500 },
            { name: 'Hawa Mahal', description: 'Palace with unique honeycomb facade', entryFee: 200 },
            { name: 'City Palace', description: 'Royal palace with museums and gardens', entryFee: 500 },
            { name: 'Jantar Mantar', description: 'UNESCO World Heritage Site with astronomical instruments', entryFee: 200 },
            { name: 'Jaigarh Fort', description: 'Impressive fort with the world\'s largest cannon on wheels', entryFee: 200 }
        ],
        transport: {
            local: ['Auto Rickshaw', 'Taxi', 'Bus', 'Metro'],
            intercity: ['Flight', 'Train', 'Bus']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '7000-20000', examples: ['Taj Rambagh Palace', 'ITC Rajputana', 'Oberoi Rajvilas'] },
            { type: 'Mid-range', priceRange: '3000-7000', examples: ['Marriott', 'Hilton', 'Radisson'] },
            { type: 'Budget', priceRange: '1000-3000', examples: ['OYO Rooms', 'Heritage Haveli Stays', 'Zostel'] }
        ]  
    },
    kerala: {
        attractions: [
            { name: 'Alleppey Backwaters', description: 'Scenic network of canals and lagoons', entryFee: 0 },
            { name: 'Munnar Tea Gardens', description: 'Beautiful hill station with vast tea plantations', entryFee: 0 },
            { name: 'Kovalam Beach', description: 'Popular crescent-shaped beach', entryFee: 0 },
            { name: 'Periyar Wildlife Sanctuary', description: 'Protected area known for elephants and tigers', entryFee: 450 },
            { name: 'Fort Kochi', description: 'Historic area with colonial buildings and Chinese fishing nets', entryFee: 0 }
        ],
        transport: {
            local: ['Auto Rickshaw', 'Taxi', 'Bus', 'Ferry'],
            intercity: ['Flight', 'Train', 'Bus']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '8000-20000', examples: ['Kumarakom Lake Resort', 'Taj Malabar', 'The Leela'] },
            { type: 'Mid-range', priceRange: '3000-8000', examples: ['Houseboat Stays', 'Beach Resorts', 'Homestays'] },
            { type: 'Budget', priceRange: '1000-3000', examples: ['Hostels', 'Budget Hotels', 'Homestays'] }
        ]  
    },
    varanasi: {
        attractions: [
            { name: 'Dashashwamedh Ghat', description: 'Famous riverfront steps for the evening Ganga Aarti', entryFee: 0 },
            { name: 'Kashi Vishwanath Temple', description: 'One of the most famous Hindu temples', entryFee: 0 },
            { name: 'Sarnath', description: 'Buddhist pilgrimage site where Buddha gave his first sermon', entryFee: 300 },
            { name: 'Assi Ghat', description: 'Popular ghat for yoga and morning boat rides', entryFee: 0 },
            { name: 'Ramnagar Fort', description: '18th century fort and museum', entryFee: 150 }
        ],
        transport: {
            local: ['Auto Rickshaw', 'Cycle Rickshaw', 'Boat Ride', 'Walking'],
            intercity: ['Flight', 'Train', 'Bus']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '6000-15000', examples: ['Taj Ganges', 'Radisson', 'Ramada'] },
            { type: 'Mid-range', priceRange: '2500-6000', examples: ['Riverview Hotels', 'Heritage Hotels', 'BrijRama Palace'] },
            { type: 'Budget', priceRange: '800-2500', examples: ['Ghat-side Guesthouses', 'Hostels', 'Ashrams'] }
        ]  
    },
    agra: {
        attractions: [
            { name: 'Taj Mahal', description: 'UNESCO World Heritage Site and one of the Seven Wonders', entryFee: 1100 },
            { name: 'Agra Fort', description: 'UNESCO World Heritage Site and historical fort', entryFee: 650 },
            { name: 'Fatehpur Sikri', description: 'UNESCO World Heritage Site and ancient city', entryFee: 610 },
            { name: 'Mehtab Bagh', description: 'Garden complex with Taj Mahal views', entryFee: 300 },
            { name: 'Itimad-ud-Daulah', description: 'Also known as Baby Taj', entryFee: 310 }
        ],
        transport: {
            local: ['Auto Rickshaw', 'Cycle Rickshaw', 'Taxi', 'Bus'],
            intercity: ['Train', 'Bus', 'Flight to Delhi then Train']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '7000-20000', examples: ['The Oberoi Amarvilas', 'ITC Mughal', 'Taj Hotel & Convention Centre'] },
            { type: 'Mid-range', priceRange: '3000-7000', examples: ['Radisson', 'Courtyard by Marriott', 'Crystal Sarovar Premiere'] },
            { type: 'Budget', priceRange: '1000-3000', examples: ['OYO Rooms', 'Zostel', 'Budget Hotels'] }
        ]  
    },
    shimla: {
        attractions: [
            { name: 'The Ridge', description: 'Large open space with panoramic views', entryFee: 0 },
            { name: 'Mall Road', description: 'Main street with shops and restaurants', entryFee: 0 },
            { name: 'Jakhu Temple', description: 'Ancient temple with giant Hanuman statue', entryFee: 0 },
            { name: 'Kufri', description: 'Hill station with snow activities in winter', entryFee: 50 },
            { name: 'Viceregal Lodge', description: 'Historic building and botanical gardens', entryFee: 150 }
        ],
        transport: {
            local: ['Walking', 'Local Taxi', 'Toy Train'],
            intercity: ['Train', 'Bus', 'Flight to Chandigarh then Taxi']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '7000-15000', examples: ['The Oberoi Cecil', 'Wildflower Hall', 'Radisson Jass'] },
            { type: 'Mid-range', priceRange: '3000-7000', examples: ['Clarkes Hotel', 'Woodville Palace', 'Honeymoon Inn'] },
            { type: 'Budget', priceRange: '1000-3000', examples: ['YMCA', 'OYO Rooms', 'Homestays'] }
        ]  
    },
    darjeeling: {
        attractions: [
            { name: 'Tiger Hill', description: 'Famous for sunrise views of Kanchenjunga', entryFee: 40 },
            { name: 'Batasia Loop', description: 'Scenic railway loop with war memorial', entryFee: 20 },
            { name: 'Tea Gardens', description: 'Famous tea plantations and factories', entryFee: 100 },
            { name: 'Himalayan Mountaineering Institute', description: 'Museum dedicated to mountaineering', entryFee: 100 },
            { name: 'Peace Pagoda', description: 'Buddhist monument with panoramic views', entryFee: 0 }
        ],
        transport: {
            local: ['Shared Jeep', 'Taxi', 'Toy Train', 'Walking'],
            intercity: ['Train to NJP then Jeep', 'Flight to Bagdogra then Taxi', 'Bus']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '5000-12000', examples: ['Mayfair Resort', 'The Elgin', 'Cedar Inn'] },
            { type: 'Mid-range', priceRange: '2500-5000', examples: ['Summit Hermon', 'Sinclairs', 'Dekeling Resort'] },
            { type: 'Budget', priceRange: '800-2500', examples: ['Homestays', 'Hostels', 'Guesthouses'] }
        ]  
    },
    manali: {
        attractions: [
            { name: 'Rohtang Pass', description: 'High mountain pass with snow-capped peaks', entryFee: 550 },
            { name: 'Solang Valley', description: 'Adventure sports hub with paragliding and skiing', entryFee: 0 },
            { name: 'Hidimba Temple', description: 'Ancient cave temple dedicated to Hidimba Devi', entryFee: 0 },
            { name: 'Old Manali', description: 'Charming area with cafes and shops', entryFee: 0 },
            { name: 'Beas River', description: 'River rafting and scenic views', entryFee: 0 }
        ],
        transport: {
            local: ['Local Bus', 'Taxi', 'Auto Rickshaw', 'Bike Rental'],
            intercity: ['Bus', 'Flight to Chandigarh then Taxi', 'Taxi']
        },
        accommodations: [
            { type: 'Luxury', priceRange: '6000-15000', examples: ['The Himalayan', 'Span Resort', 'Manuallaya Resort'] },
            { type: 'Mid-range', priceRange: '2500-6000', examples: ['Johnson Lodge', 'Apple Country Resort', 'Snowcrest Manor'] },
            { type: 'Budget', priceRange: '800-2500', examples: ['Backpacker Hostels', 'Homestays', 'Guesthouses'] }
        ]  
    }
};

// Travel packages data
const travelPackages = [
    {
        name: 'Golden Triangle Tour',
        description: 'Explore Delhi, Agra, and Jaipur in this classic Indian tour',
        price: 25000,
        days: 6,
        destinations: ['Delhi', 'Agra', 'Jaipur'],
        highlights: ['Taj Mahal', 'Red Fort', 'Amber Fort', 'Qutub Minar']
    },
    {
        name: 'Goa Beach Vacation',
        description: 'Relax on the beautiful beaches of Goa',
        price: 20000,
        days: 4,
        destinations: ['Goa'],
        highlights: ['Calangute Beach', 'Fort Aguada', 'Dudhsagar Falls', 'Water Sports']
    },
    {
        name: 'Kerala Backwaters',
        description: 'Experience the serene backwaters and lush landscapes',
        price: 30000,
        days: 5,
        destinations: ['Kerala'],
        highlights: ['Houseboat Stay', 'Munnar Tea Gardens', 'Kovalam Beach', 'Ayurvedic Spa']
    },
    {
        name: 'Himalayan Adventure',
        description: 'Trek through beautiful mountain scenery in Himachal',
        price: 35000,
        days: 7,
        destinations: ['Shimla', 'Manali'],
        highlights: ['Rohtang Pass', 'Solang Valley', 'Mall Road', 'Adventure Sports']
    },
    {
        name: 'Heritage Rajasthan',
        description: 'Discover the royal heritage of Rajasthan',
        price: 40000,
        days: 8,
        destinations: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
        highlights: ['City Palace', 'Desert Safari', 'Lake Pichola', 'Mehrangarh Fort']
    },
    {
        name: 'Spiritual Journey',
        description: 'Explore the spiritual side of India',
        price: 22000,
        days: 6,
        destinations: ['Varanasi', 'Bodh Gaya', 'Sarnath'],
        highlights: ['Ganga Aarti', 'Morning Boat Ride', 'Buddhist Temples', 'Meditation']
    }
];