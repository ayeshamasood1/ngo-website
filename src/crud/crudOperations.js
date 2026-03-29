// ============================================
// CRUD Operations (Task 2 & 5)
// Create, Read, Update, Delete + Object Methods
// ============================================

// CREATE - Add new campaign (Array.push)
const addCampaign = (title, location, category, goal, collected, description, rating) => {
    const newCampaign = {
        id: campaignId++,
        title: cleanInput(title),
        location: cleanInput(location),
        category: cleanInput(category),
        goal: parseInt(goal),
        collected: parseInt(collected) || 0,
        rating: parseFloat(rating) || 0,
        dateAdded: new Date().toISOString().split('T')[0],
        description: cleanInput(description || 'No description provided.')
    };
    campaigns.push(newCampaign);
    return newCampaign;
};

// READ - Get all campaigns (Array.map)
const getAllCampaigns = () => campaigns.map(c => ({ ...c }));

// UPDATE - Edit campaign (Object.assign - Task 5)
const updateCampaign = (id, updates) => {
    const index = campaigns.findIndex(c => c.id === id);
    if (index === -1) return null;
    Object.assign(campaigns[index], {
        title: cleanInput(updates.title || campaigns[index].title),
        location: cleanInput(updates.location || campaigns[index].location),
        category: cleanInput(updates.category || campaigns[index].category),
        goal: parseInt(updates.goal) || campaigns[index].goal,
        collected: parseInt(updates.collected) || campaigns[index].collected,
        description: cleanInput(updates.description || campaigns[index].description),
        rating: parseFloat(updates.rating) || campaigns[index].rating
    });
    return campaigns[index];
};

// DELETE - Remove campaign (Array.filter)
const deleteCampaign = (id) => {
    campaigns = campaigns.filter(c => c.id !== id);
};

// DELETE ALL
const deleteAllCampaigns = () => {
    campaigns = [];
};

// ======== Task 5: Object CRUD Methods ========

// Object.keys() - Get property names
const getCampaignKeys = (id) => {
    const c = findCampaignById(campaigns, id);
    return c ? Object.keys(c) : [];
};

// Object.values() - Get property values
const getCampaignValues = (id) => {
    const c = findCampaignById(campaigns, id);
    return c ? Object.values(c) : [];
};

// Object.entries() - Get key-value pairs
const getCampaignEntries = (id) => {
    const c = findCampaignById(campaigns, id);
    return c ? Object.entries(c) : [];
};

// Object.freeze() - Create immutable snapshot
const freezeCampaign = (id) => {
    const c = findCampaignById(campaigns, id);
    return c ? Object.freeze({ ...c }) : null;
};

// hasOwnProperty() - Check if property exists
const campaignHasProperty = (id, prop) => {
    const c = findCampaignById(campaigns, id);
    return c ? c.hasOwnProperty(prop) : false;
};

// Object.assign() - Clone campaign
const cloneCampaign = (id) => {
    const c = findCampaignById(campaigns, id);
    if (!c) return null;
    const clone = Object.assign({}, c, {
        id: campaignId++,
        title: c.title.concat(' (Copy)'),
        dateAdded: new Date().toISOString().split('T')[0]
    });
    campaigns.push(clone);
    return clone;
};
