const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const windowManager = require('./lib/windowManager');
const dataUpdater = require('./lib/dataHandler');

app.on('ready', windowManager.createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', windowManager.activateWindow);

app.whenReady().then(dataUpdater.scheduleDataUpdates);