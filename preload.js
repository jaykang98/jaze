const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    toggleDarkMode: () => ipcRenderer.send('toggle-dark-mode'),
    onDarkModeStatus: (callback) => ipcRenderer.on('dark-mode-status', (event, ...args) => callback(...args)),
    sendDataToMain: (data) => ipcRenderer.send('send-data', data),
    receiveUpdatedData: (callback) => ipcRenderer.on('update-data', (event, data) => callback(data))
});
