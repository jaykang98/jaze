const { ipcRenderer } = require('electron');

// Event listener for DOMContentLoaded to set up button events
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', debounce(onUserSearch, 250));
    }

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }
});

// Function to handle user search
async function onUserSearch(event) {
    try {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        if (username) {
            const userData = await fetchLastFmData(username);
            updateUIWithUserData(userData);
        }
    } catch (error) {
        console.error('Error in user search:', error);
    }
}

// Function to toggle dark mode
function toggleDarkMode(event) {
    event.stopPropagation();
    ipcRenderer.send('toggle-dark-mode');
}

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Function to fetch user data from LastFM (or a similar service)
async function fetchLastFmData(username) {
    // Implementation to fetch data
}

// Function to update the UI with user data
function updateUIWithUserData(userData) {
    // Implementation to update UI
}