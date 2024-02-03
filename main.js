const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    ipcMain.on('toggle-dark-mode', toggleDarkMode);
}

function toggleDarkMode() {
    mainWindow.webContents.executeJavaScript(`
        const currentTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? '' : 'dark');
    `);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        createWindow();
    }
});

const DATA_UPDATE_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

app.whenReady().then(scheduleDataUpdates);

function scheduleDataUpdates() {
    setInterval(fetchDataForAllUsers, DATA_UPDATE_INTERVAL_MS);
}

async function fetchDataForAllUsers() {
    try {
        const data = await someAPI.getAllUserData();
        if (mainWindow) {
            mainWindow.webContents.send('update-data', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
