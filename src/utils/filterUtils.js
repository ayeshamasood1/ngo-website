// ============================================
// Filter & Search Utilities (Task 3)
// Uses: filter, map, sort, reduce, includes,
//       find, every, some
// ============================================

// Search by name, title, location, description, category
const searchByTitle = (data, query) => {
    const q = cleanInput(normalizeSearch(query));
    if (!q) return data;
    return data.filter(c =>
        containsText(c.title, q) ||
        containsText(c.location, q) ||
        containsText(c.description, q) ||
        containsText(c.category, q)
    );
};

// Filter by location
const filterByLocation = (data, location) =>
    data.filter(c => normalizeSearch(c.location) === normalizeSearch(location));

// Filter by category
const filterByCategory = (data, category) =>
    data.filter(c => normalizeSearch(c.category) === normalizeSearch(category));

// Filter by goal range
const filterByGoalRange = (data, type) => {
    if (type === 'high') return data.filter(c => c.goal >= 80000);
    if (type === 'low') return data.filter(c => c.goal < 80000);
    return data;
};

// Filter by funding status
const filterByFundingStatus = (data, status) => {
    if (status === 'funded') return data.filter(c => c.collected >= c.goal);
    if (status === 'half') return data.filter(c => c.collected >= c.goal / 2);
    return data;
};

// Filter by minimum rating
const filterByRating = (data, minRating) =>
    data.filter(c => c.rating >= minRating);

// Sort campaigns by various fields
const sortCampaigns = (data, sortBy, order = 'asc') => {
    return [...data].sort((a, b) => {
        let diff = 0;
        if (sortBy === 'goal') diff = a.goal - b.goal;
        else if (sortBy === 'collected') diff = a.collected - b.collected;
        else if (sortBy === 'rating') diff = a.rating - b.rating;
        else if (sortBy === 'date') diff = new Date(a.dateAdded) - new Date(b.dateAdded);
        else if (sortBy === 'title') diff = a.title.localeCompare(b.title);
        return order === 'asc' ? diff : -diff;
    });
};

// Total collected using reduce
const getTotalCollected = (data) => data.reduce((sum, c) => sum + c.collected, 0);

// Total goal using reduce
const getTotalGoal = (data) => data.reduce((sum, c) => sum + c.goal, 0);

// Find campaign by ID
const findCampaignById = (data, id) => data.find(c => c.id === id);

// Check if ALL campaigns are funded (every)
const areAllFunded = (data) => data.every(c => c.collected >= c.goal);

// Check if ANY campaign is funded (some)
const isAnyFunded = (data) => data.some(c => c.collected >= c.goal);

// Recently added campaigns (sorted by date desc)
const getRecentlyAdded = (data, count = 3) =>
    sortCampaigns(data, 'date', 'desc').slice(0, count);

// Top rated campaigns
const getTopRated = (data, count = 3) =>
    sortCampaigns(data, 'rating', 'desc').slice(0, count);
