const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', debounce(onUserSearch));

    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleDarkMode);
});

async function onUserSearch(event) {
    try {
        event.preventDefault(); 
        const username = document.getElementById('username').value.trim();
        const userData = await fetchLastFmData(username);
        updateUIWithUserData(userData);
    } catch (error) {
        console.error('Error in user search:', error);
    }
}

function toggleDarkMode(event) {
    event.stopPropagation(); 
    window.electronAPI.toggleDarkMode();
}


async function fetchLastFmData(username) {
    if (!username) return;
    const apiKey = 'YOUR_API_KEY';
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Last.FM:', error);
        return null;
    }
}
function updateUIWithUserData(userData) {
    if (!userData) return;

    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userDetails').textContent = JSON.stringify(userData, null, 2);
}
