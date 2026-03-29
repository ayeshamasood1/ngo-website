// ============================================
// Campaign Data - Array of Objects
// Stores all campaign data for the NGO app
// ============================================

let campaigns = [
    {
        id: 1,
        title: "Food Drive",
        location: "Multan",
        category: "Food & Nutrition",
        goal: 50000,
        collected: 32000,
        rating: 4.5,
        dateAdded: "2026-01-15",
        description: "Providing meals to underprivileged families in Multan rural areas."
    },
    {
        id: 2,
        title: "Education Program",
        location: "Lahore",
        category: "Education",
        goal: 100000,
        collected: 75000,
        rating: 4.8,
        dateAdded: "2026-02-10",
        description: "Scholarships and school supplies for deserving students in Lahore."
    },
    {
        id: 3,
        title: "Medical Camp",
        location: "Karachi",
        category: "Healthcare",
        goal: 70000,
        collected: 45000,
        rating: 4.2,
        dateAdded: "2026-01-20",
        description: "Free medical checkups and medicine distribution in Karachi slums."
    },
    {
        id: 4,
        title: "Clean Water Project",
        location: "Multan",
        category: "Water & Sanitation",
        goal: 120000,
        collected: 120000,
        rating: 5.0,
        dateAdded: "2025-11-05",
        description: "Installing water filtration plants in rural Multan communities."
    },
    {
        id: 5,
        title: "Women Empowerment",
        location: "Lahore",
        category: "Education",
        goal: 80000,
        collected: 60000,
        rating: 4.6,
        dateAdded: "2026-03-01",
        description: "Vocational training and micro-loans for women entrepreneurs."
    },
    {
        id: 6,
        title: "Shelter Homes",
        location: "Karachi",
        category: "Shelter",
        goal: 200000,
        collected: 95000,
        rating: 4.0,
        dateAdded: "2025-12-15",
        description: "Building temporary shelter homes for homeless families in Karachi."
    }
];

let campaignId = 7;

// Get all unique categories
const getCategories = () => [...new Set(campaigns.map(c => c.category))];

// Get all unique locations
const getLocations = () => [...new Set(campaigns.map(c => c.location))];
