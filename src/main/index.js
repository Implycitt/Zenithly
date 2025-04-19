import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import fs from 'fs';
import zenithly from '../../resources/zenithly.png?asset';

import { Handling } from './scripts/tools/handler.js';
import { getJsonAsObject, writeAppend } from './scripts/tools/file.js';
import { addData } from './scripts/data/data.js';
import { SleepData } from './scripts/data/sleepData.js';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: false,
    icon: zenithly,
    ...(process.platform === 'linux' ? { zenithly } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' }
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  handle();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// handling all IPC
function handle() {

  ipcMain.on('test', () => {
    console.log('this is how you ipc');
  });

  // first param is event, which is needed if you want to pass anything to the on function
  ipcMain.on('add', (_, path, object) => {
    // since event is not needed we can ignore it
    addData(path, object);
  });

  ipcMain.on('testAdd', () => {
    SleepData.tryThis();
  });

  ipcMain.handle('getter', (_, path) => {
    return fs.readFileSync(path, { encoding: 'utf8' });
  })

}

