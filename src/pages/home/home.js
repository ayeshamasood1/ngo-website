// ============================================
// Home Page Script
// Renders campaigns, handles search & filters
// ============================================

let currentFilter = 'all';

// Render campaign cards on the home page
const renderHomeCampaigns = (data = campaigns) => {
    const container = document.getElementById('campaignContainer');
    if (!container) return;
    container.innerHTML = '';

    if (!data.length) {
        container.innerHTML = `<p class="text-center col-span-3 text-gray-500 dark:text-gray-400 py-10 text-lg">No campaigns found matching your criteria.</p>`;
        return;
    }

    data.map(c => {
        const progress = Math.min(Math.round((c.collected / c.goal) * 100), 100);
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full font-medium">${c.category}</span>
                <span class="text-xs text-gray-400 dark:text-gray-500 font-mono">#${formatId(c.id)}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-1">${c.title}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">📍 ${c.location}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">${truncateText(c.description, 70)}</p>
            <div class="text-yellow-500 text-sm mb-3">${generateStars(c.rating)} <span class="text-gray-400 dark:text-gray-500">(${c.rating})</span></div>
            <div class="mb-2">
                <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-400">Progress</span>
                    <span class="font-semibold ${progress >= 100 ? 'text-green-600' : 'text-blue-600'}">${progress}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div class="h-2.5 rounded-full transition-all duration-700 ${progress >= 100 ? 'bg-green-500' : progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'}" style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="flex justify-between text-sm mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span class="text-gray-500 dark:text-gray-400">Goal: Rs ${formatCurrency(String(c.goal))}</span>
                <span class="text-green-600 dark:text-green-400 font-semibold">Rs ${formatCurrency(String(c.collected))}</span>
            </div>
        `;
        container.appendChild(card);
    });
};

// Apply filters
const applyHomeFilters = (filter = null) => {
    if (filter) currentFilter = filter;

    // Highlight active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-green-400', 'ring-offset-2', 'dark:ring-offset-gray-900');
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('ring-2', 'ring-green-400', 'ring-offset-2', 'dark:ring-offset-gray-900');
        }
    });

    const searchVal = document.getElementById('searchInput')?.value || '';
    let filtered = [...campaigns];

    switch (currentFilter) {
        case 'multan': filtered = filterByLocation(filtered, 'multan'); break;
        case 'lahore': filtered = filterByLocation(filtered, 'lahore'); break;
        case 'karachi': filtered = filterByLocation(filtered, 'karachi'); break;
        case 'high': filtered = filterByGoalRange(filtered, 'high'); break;
        case 'low': filtered = filterByGoalRange(filtered, 'low'); break;
        case 'funded': filtered = filterByFundingStatus(filtered, 'funded'); break;
        case 'half': filtered = filterByFundingStatus(filtered, 'half'); break;
        case 'sort_goal': filtered = sortCampaigns(filtered, 'goal', 'asc'); break;
        case 'top_rated': filtered = getTopRated(filtered, campaigns.length); break;
        case 'recent': filtered = getRecentlyAdded(filtered, campaigns.length); break;
    }

    if (searchVal.trim()) {
        filtered = searchByTitle(filtered, searchVal);
    }

    renderHomeCampaigns(filtered);
};

// Total collected display (reduce)
const showTotalFunds = () => {
    const total = getTotalCollected(campaigns);
    const totalGoal = getTotalGoal(campaigns);
    document.getElementById('outputBox').innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-2xl">💰</span>
            <div>
                <p class="font-bold text-green-700 dark:text-green-400">Total Funds Collected: Rs ${formatCurrency(String(total))}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Out of Rs ${formatCurrency(String(totalGoal))} total goal</p>
            </div>
        </div>`;
};

// Find campaign demo (find)
const showFindCampaign = () => {
    const q = document.getElementById('searchInput')?.value || '';
    let found;
    if (q.trim()) {
        found = campaigns.find(c => containsText(c.title, q));
    } else {
        found = campaigns.find(c => c.id === 1);
    }
    const box = document.getElementById('outputBox');
    if (found) {
        box.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-2xl">🔍</span>
                <div>
                    <p class="font-bold text-green-700 dark:text-green-400">Found: ${found.title}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${buildLabel('Location', found.location)} | ${buildLabel('Goal', 'Rs ' + formatCurrency(String(found.goal)))}</p>
                </div>
            </div>`;
    } else {
        box.innerHTML = `<p class="text-red-500">❌ No campaign found.</p>`;
    }
};

// Check funding status (every + some)
const showCheckStatus = () => {
    const allFunded = areAllFunded(campaigns);
    const anyFunded = isAnyFunded(campaigns);
    document.getElementById('outputBox').innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-2xl">📊</span>
            <div>
                <p class="font-bold text-gray-800 dark:text-white">Funding Status Check</p>
                <p class="text-sm ${allFunded ? 'text-green-600' : 'text-red-500'}">All fully funded: ${allFunded ? '✅ Yes' : '❌ No'}</p>
                <p class="text-sm ${anyFunded ? 'text-green-600' : 'text-red-500'}">At least one funded: ${anyFunded ? '✅ Yes' : '❌ No'}</p>
            </div>
        </div>`;
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    renderHomeCampaigns();
});
