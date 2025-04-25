import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import fs from 'fs';
import zenithly from '../../resources/zenithly.png?asset';

import { Json } from './scripts/tools/file.js';
import { handleError } from './scripts/tools/handler.js';

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

function ipcHandler() {

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

  ipcMain.handle('read', (_, path) => {
    return fs.readFileSync(path, 'utf8')
  });

  // true -> exists, false -> does not
  ipcMain.handle('checkFileExistence', (_, path) => {
    return fs.existsSync(path)
  });

  // true -> file is empty, false -> file is full
  ipcMain.handle('checkFileEmpty', (_, path) => {
    return (fs.readFileSync(path, 'utf8').length == 0) ? true : false
  });

  // true -> file does not exists or is empty, false -> exists and not empty
  ipcMain.handle('checkFile', (_, path) => {
    return (!fs.existsSync(path) || fs.readFileSync(path, 'utf8').length == 0) ? true : false
  })

}
