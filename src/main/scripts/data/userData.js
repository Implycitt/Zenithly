import { Json } from '../tools/file.js';

class UserData {

  static init(path) {
    let defaultUserData = this.createUserData();

    window.electron.ipcRenderer.send('overwrite', path, defaultUserData);
  }

  static createUserData(gend = 'none', water = ((2.7+3.7)/2), targetSleep = 8) {
    let userData = new Object;

    userData.gender = gend;
    userData.waterIntake = water;
    userData.targetSleep = targetSleep;

    return userData;
  }

  static setGender(path, gender) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      result = Json.parseObject(result);
      result.gender = gender;

      window.electron.ipcRenderer.send('overwrite', path, result);
    })

  }

  static setIntake(path, water) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      result = Json.parseObject(result);
      result.waterIntake = water;

      window.electron.ipcRenderer.send('overwrite', path, result);
    })
  }

  static setTargetSleep(path, targetSleep) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      result = Json.parseObject(result);
      result.targetSleep = targetSleep;

      window.electron.ipcRenderer.send('overwrite', path, result);
    })

  }

  static check(path) {
    window.electron.ipcRenderer.invoke('checkFile', path).then( (result) => {
      if (result) this.init(path);
    });
  }

}

export { UserData }
