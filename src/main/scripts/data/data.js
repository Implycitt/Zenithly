import { Json } from '../tools/file.js';

class Reminders {

  static init(path) {
    let defaultData = new Object;
    defaultData.Reminder = [];

    window.electron.ipcRenderer.send('overwrite', path, defaultData);
  }

  static createID() {
    let date = new Date(Date.now());
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  static createReminder(id, startHour, startMinute, startSecond, quantity) {
    let remind = new Object;

    remind.id = id;
    remind.completed = false;
    remind.startHour = startHour;
    remind.startMinute = startMinute;
    remind.startSecond = startSecond;
    remind.waterQuantity = quantity;

    return remind
  }

  static createRemindersDay() {
    let reminderObj = new Object;

    reminderObj.id = this.createID();
    reminderObj.reminders = [];

    return reminderObj
  }

  static addDay(path, reminderDay) {
    window.electron.ipcRenderer.invoke('checkFile', path).then( (result) => {
      if (result) this.init(path);
    });

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let resultObj = Json.parseObject(result);
      resultObj.Reminder.push(reminderDay);

      window.electron.ipcRenderer.send('overwrite', path, resultObj);
    })
  }

  static addReminder(path, parentId, reminder) {
    window.electron.ipcRenderer.invoke('checkFile', path).then( (result) => {
      if (result) this.init(path);
    });


    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let parentObj = Json.findById(parentId, Json.parseObject(result));

      if (parentObj == undefined) {
        console.log("Id not found");
        return
      }

      if (Json.findById(reminder.id, parentObj) != undefined) {
        console.log("Id already exists");
        return
      }

      parentObj.reminders.push(reminder);
      window.electron.ipcRenderer.send('overwrite', path, parentObj);
    })

  }

  static updateReminder(path) {
    //TODO
  }

}

export { Reminders }
