// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const windowManager = require('./windowManager');
const dataUpdater = require('./dataUpdater');
const eventHandlers = require('./eventHandlers');

app.on('ready', windowManager.createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', windowManager.activateWindow);

ipcMain.on('toggle-dark-mode', eventHandlers.toggleDarkMode);

app.whenReady().then(dataUpdater.scheduleDataUpdates);