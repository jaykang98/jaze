const { contextBridge, ipcRenderer, shell } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const { encrypt, decrypt } = require('./lib/encryption'); // Adjust path as necessary
const axios = require('axios');

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY || 'YOUR_API_KEY'; // Use environment variable or default
const axiosInstance = axios.create({
    baseURL: 'http://ws.audioscrobbler.com/2.0/' // If applicable
});

// Helper to handle async operations with error logging
const asyncWithErrorLogging = async (operation) => {
    try {
        return await operation();
    } catch (error) {
        console.error(error);
        return null;
    }
};

contextBridge.exposeInMainWorld('electronAPI', {
    toggleDarkMode: () => ipcRenderer.send('toggle-dark-mode'),
    onDarkModeStatus: (callback) => ipcRenderer.on('dark-mode-status', (event, ...args) => callback(...args)),
    sendDataToMain: (data) => ipcRenderer.send('send-data', data),
    receiveUpdatedData: (callback) => ipcRenderer.on('update-data', (event, data) => callback(data)),
    openExternal: (url) => ipcRenderer.send('open-auth-window', data),,
    saveAuthToken: (token) => asyncWithErrorLogging(async () => {
        const encryptedToken = encrypt(token);
        await fs.writeFile(tokenPath, JSON.stringify(encryptedToken), 'utf-8');
    }),
    getAuthToken: () => asyncWithErrorLogging(() => fs.readFile(tokenPath, 'utf-8').then(data => decrypt(JSON.parse(data)))),
    fetchLastFmData: (username) => asyncWithErrorLogging(() => {
        if (!username) return null;
        const response = axiosInstance.get('', {
            params: {
                method: 'user.getinfo',
                user: username,
                api_key: LAST_FM_API_KEY,
                format: 'json'
            }
        });
        return response.then(res => res.data);
    })
});