import { Json } from '../tools/file.js';

const hoursMath = 1000*60*60

class SleepData {

  static init(path) {
    let sleepData = new Object;

    // 0 -> Default State
    // 1 -> Sleep state
    sleepData.state = state;
    sleepData.averageSleep = 0;
    sleepData.sleeps = []

    window.electron.ipcRenderer.send('overwrite', path, sleepData);
  }

  static createSleep(start, endTime = null, timeSlept = 0, goodness = 0) {
    let sleep = new Object;

    sleep.id = Json.createId();
    sleep.startTime = start;
    sleep.endTime = endTime;
    sleep.timeSlept = timeSlept;
    sleep.goodnessOfSleep = goodness;

    return sleep
  }

  static addSleeps(path, sleeps) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let resultObj = Json.parseObject(result);

      resultObj.sleeps.push(sleeps);
      window.electron.ipcRenderer.send('overwrite', path, resultObj);
    })
  }

  static setEndTime(path, userPath, id, endTime) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let resultObj = Json.parseObject(result);
      let parentObj = Json.findById(id, resultObj.sleeps);

      if (parentObj == undefined) {
        console.log("Id not found");
        return
      }

      let delta = (endTime - parentObj.startTime) / hoursMath;

      window.electron.ipcRenderer.invoke('read', userPath).then( (userRes) => {
        // one minus the deviation from the average sleep over the target sleep normalized: gives a standard number between 0 and 1 that represents how close to the target
        // and the users average sleep they are. will also be used to change the color for the icons
        parentObj.goodnessOfSleep = parseFloat((1 - (((delta - resultObj.averageSleep) / Json.parseObject(userRes).targetSleep) % 1)).toFixed(3));
        parentObj.endTime = endTime;
        parentObj.timeSlept = parseFloat(delta.toFixed(2));

        window.electron.ipcRenderer.send('overwrite', path, resultObj);
        this.updateAverageSleep(path);
      })
    })

  }

  static setState(path, state) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let parsedRes = Json.parseObject(result);

      parsedRes.state = state;

      window.electron.ipcRenderer.send('overwrite', path, parentObj);
    });
  }

  static updateAverageSleep(path) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let resultObj = Json.parseObject(result);
      let avg = 0;

      for (let i = 0; i < resultObj.sleeps.length; ++i) {
        avg += resultObj.sleeps[i].timeSlept;
      }
      avg /= resultObj.sleeps.length;
      resultObj.averageSleep = avg;

      window.electron.ipcRenderer.send('overwrite', path, resultObj);
    })

  }

  static getAverageWakeTime(path) {

    let readData = window.electron.ipcRenderer.invoke('read', path);
    let avg = 0;

    readData.then( (result) => {
      let resultObj = Json.parseObject(result);

      for (let i = 0; i < resultObj.sleeps.length; ++i) {
        let utc = new Date(resultObj.sleeps[i].endTime);
        avg += utc.getUTCHours()
      }
      avg /= resultObj.sleeps.length;

      return avg;
    });
  }

  static getAverageBedTime(path) {

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let resultObj = Json.parseObject(result);
      let avg = 0;

      for (let i = 0; i < resultObj.sleeps.length; ++i) {
        let utc = new Date(resultObj.sleeps[i].startTime);
        avg += utc.getUTCHours();
      }
      avg /= resultObj.sleeps.length;

      return avg;
    });
  }

  static check(path) {
    window.electron.ipcRenderer.invoke('checkFile', path).then( (result) => {
      if (result) this.init(path);
    });
  }

}

export { SleepData }
