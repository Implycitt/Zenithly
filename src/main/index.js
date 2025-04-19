import { app, shell, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import fs from 'fs';
import zenithly from '../../resources/zenithly.png?asset';

import { Json, addData } from './scripts/tools/file.js';
import { handleError } from './scripts/tools/handler.js';

const sqlite3 = require('sqlite3').verbose();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
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

  const db = new sqlite3.Database(join(__dirname, '../../data/data.db'), (err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Database connected");
    }
  });

  ipcHandler();

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
function ipcHandler() {

  // first param is event, which is needed if you want to pass anything to the on function
  ipcMain.on('add', (_, path, object) => {
    // since event is not needed we can ignore it
    addData(path, object);
  });

  ipcMain.on('overwrite', (_, path, object) => {
    fs.writeFileSync(path, Json.createJson(object), 'utf8', (err) => {
      handleError(err);
    });
  });

  ipcMain.on('append', (_, path, object) => {
    fs.appendFile(path, Json.createJson(object), { encoding: 'utf8', flag: 'a+' }, (err) => {
      handleError(err);
    });
  });

  ipcMain.on('setter', (_, path, object, readData) => {
    let out = Object.assign({}, readData, object);

    fs.appendFile(path, Json.createJson(out), { encoding: 'utf8', flag: 'a+' }, (err) => {
      handleError(err);
    });
  });

  ipcMain.on('setterOverwrite', (_, path, object, readData) => {
    let out = Object.assign({}, readData, object);

    fs.appendFile(path, Json.createJson(out), { encoding: 'utf8', flag: 'a+' }, (err) => {
      handleError(err);
    });
  });

  ipcMain.handle('getter', (_, path) => {
    return fs.readFileSync(path, { encoding: 'utf8' });
  });

  // true -> exists, false -> does not
  ipcMain.handle('checkFileExistence', (_, path) => {
    if (!fs.existsSync(path)) {
      return false;
    }
    return true;
  });

}

