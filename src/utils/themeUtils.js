// ============================================
// Theme Utilities (Task 4)
// Dark/Light mode toggle + localStorage
// ============================================

// Get stored theme from localStorage
const getStoredTheme = () => localStorage.getItem(THEME_KEY) || 'light';

// Save theme to localStorage
const setStoredTheme = (theme) => localStorage.setItem(THEME_KEY, theme);

// Apply theme to the page
const applyTheme = (theme) => {
    const html = document.documentElement;
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    // Update toggle button icon
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
        const config = THEMES[theme];
        toggleBtn.innerHTML = config.icon;
        toggleBtn.setAttribute('title', config.label);
    }
};

// Toggle between dark and light
const toggleTheme = () => {
    const current = getStoredTheme();
    const newTheme = current === 'light' ? 'dark' : 'light';
    setStoredTheme(newTheme);
    applyTheme(newTheme);
};

// Initialize theme on page load
const initTheme = () => {
    const theme = getStoredTheme();
    applyTheme(theme);
};

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initTheme);
