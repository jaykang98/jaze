const { contextBridge, ipcRenderer } = require('electron');

// Cache the API key outside the function if it doesn't change
const LAST_FM_API_KEY = 'YOUR_API_KEY';

contextBridge.exposeInMainWorld('electronAPI', {
    toggleDarkMode: () => ipcRenderer.send('toggle-dark-mode'),
    onDarkModeStatus: (callback) => ipcRenderer.on('dark-mode-status', (event, ...args) => callback(...args)),
    sendDataToMain: (data) => ipcRenderer.send('send-data', data),
    receiveUpdatedData: (callback) => ipcRenderer.on('update-data', (event, data) => callback(data)),

    /**
     * Fetches data from Last.FM based on the username.
     * @param {string} username - The username to query data for.
     * @returns {Promise<Object|null>} The fetched user data or null in case of error.
     */
    fetchLastFmData: async (username) => {
        if (!username) return null;

        // Require axios here if it's only used in this function
        const axios = require('axios');
        const url = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${encodeURIComponent(username)}&api_key=${LAST_FM_API_KEY}&format=json`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from Last.FM:', error);
            return null;
        }
    }
});