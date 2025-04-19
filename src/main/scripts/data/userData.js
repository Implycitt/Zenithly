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
    if (!window.electron.ipcRenderer.invoke('checkFileExistence', path)) {
      self.init();
    }

    let newData = this.createUserData(gender);
    let readData = window.electron.ipcRenderer.invoke('getter', path);

    readData.then( (result) => {
      window.electron.ipcRenderer.send('setterOverwrite', path, newData, result);
    })

  }

  static setIntake(path, water) {
    if (!window.electron.ipcRenderer.invoke('checkFileExistence', path)) {
      self.init();
    }

    let readData = window.electron.ipcRenderer.invoke('getter', path);
    let newData = this.createUserData(readData.gender, water);

    readData.then( (result) => {
      window.electron.ipcRenderer.send('setterOverwrite', path, newData, result);
    })
  }

}

export { UserData }
