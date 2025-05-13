require('electron-reload')(__dirname, {
  electron: require('path').join(__dirname, 'node_modules', '.bin', 'electron')
});

const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 700,
    resizable: false,       
    fullscreenable: false, 
    maximizable: false,  
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('docs/index.html');
}

app.whenReady().then(createWindow);
