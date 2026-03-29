// ============================================
// String Utility Functions (Task 6)
// 14 string methods for search, display & cleaning
// ============================================

// 1. trim() - Clean whitespace from form inputs
const cleanInput = (str) => str.trim();

// 2. toLowerCase() - Normalize for case-insensitive search
const normalizeSearch = (str) => str.toLowerCase();

// 3. toUpperCase() - Format headings for display
const formatHeading = (str) => str.toUpperCase();

// 4. includes() - Check if string contains search term
const containsText = (str, search) => str.toLowerCase().includes(search.toLowerCase());

// 5. startsWith() - Filter items starting with a letter
const startsWithLetter = (str, letter) => str.toLowerCase().startsWith(letter.toLowerCase());

// 6. endsWith() - Check if string ends with specific text
const endsWithText = (str, suffix) => str.toLowerCase().endsWith(suffix.toLowerCase());

// 7. slice() - Truncate long descriptions
const truncateText = (str, maxLength = 50) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
};

// 8. replace() - Format currency with commas
const formatCurrency = (str) => str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// 9. split() - Parse comma-separated tags
const parseTags = (str) => str.split(',').map(tag => tag.trim());

// 10. charAt() - Get first character for avatar initial
const getInitial = (str) => str.charAt(0).toUpperCase();

// 11. indexOf() - Find position of substring
const findPosition = (str, substring) => str.indexOf(substring);

// 12. concat() - Build formatted label strings
const buildLabel = (label, value) => label.concat(': ', value);

// 13. padStart() - Format campaign IDs e.g. #001
const formatId = (id) => String(id).padStart(3, '0');

// 14. repeat() - Generate star rating display
const generateStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty);
};
