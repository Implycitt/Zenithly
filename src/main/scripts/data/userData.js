import { Json } from '../tools/file.js';

class UserData {

  static init(path) {
    let defaultUserData = this.createUserData();

    window.electron.ipcRenderer.send('overwrite', path, defaultUserData);
  }

  static createUserData(gend = 'none', water = ((2.7+3.7)/2)) {
    let userData = new Object;

    userData.gender = gend;
    userData.waterIntake = water;

    return userData;
  }

  static setGender(path, gender) {
    window.electron.ipcRenderer.invoke('checkFile', path).then( (result) => {
      if (result) this.init(path);
    });

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      result = Json.parseObject(result);
      let out = this.createUserData(gender, result.water);

      window.electron.ipcRenderer.send('overwrite', path, out);
    })

  }

  static setIntake(path, water) {
    window.electron.ipcRenderer.invoke('checkFile', path).then( (result) => {
      if (result) this.init(path);
    });

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      result = Json.parseObject(result);
      let out = this.createUserData(result.gender, water);

      window.electron.ipcRenderer.send('overwrite', path, out);
    })
  }

}

export { UserData }
