// ./lib/eventHandler.js
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
});

function attachEventListeners() {
    const clearCache = document.querySelector('button#clearCache');
    const themeSwap = document.querySelector('button#themeSwap');
    const getAuth = document.querySelector('button#getAuth');

    if (clearCache) {   clearCache.addEventListener('click', handleClearCache);
    }
    if (themeSwap) {    themeSwap.addEventListener('click', handleThemeSwap);
    }
    if (getAuth) {      getAuth.addEventListener('click', handleAuthAction);
    }
}
async function handleAuthAction(event) {
    event.preventDefault();
    const authUrl = `http://www.last.fm/api/auth/?api_key=YOUR_API_KEY`;
    ipcRenderer.send('open-auth-window', authUrl);
}
async function handleClearCache(event) {
    event.preventDefault();
    ipcRenderer.send('clear-cache');
    }

function handleThemeSwap(event) {
    ipcRenderer.send('toggle-dark-mode');
}

