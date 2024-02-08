// ./main.js
const { app, ipcMain, shell, BrowserWindow } = require('electron');
const windowManager = require('./lib/windowManager');
const dataUpdater = require('./lib/dataHandler');

async function initializeApp() {
    await app.whenReady();
    windowManager.createWindow();
}

app.on('ready', initializeApp);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        windowManager.createWindow(); // Use windowManager to create a new window
    }
})

ipcMain.on('open-auth-window', (event, authUrl) => {
    shell.openExternal(authUrl);
    // Implement any additional logic if needed for handling the auth process
});
ipcMain.on('clear-cache', async () => {
    await session.defaultSession.clearCache();
    console.log('Cache cleared!');
    })