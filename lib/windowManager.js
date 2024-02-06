// windowManager.js

const { BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // For security reasons
            contextIsolation: true, // For security reasons
            preload: path.join(__dirname, 'lib/preload.js')
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function activateWindow() {
    if (!mainWindow) {
        createWindow();
    }
}

module.exports = { createWindow, activateWindow, getMainWindow: () => mainWindow };
