import { Json } from '../tools/file.js';

class Reminders {

  static init(path) {
    let defaultData = new Object;
    defaultData.Reminder = [];

    window.electron.ipcRenderer.send('overwrite', path, defaultData);
  }

  static createReminder(id, startHour, startMinute, quantity) {
    let remind = new Object;

    remind.id = id;
    remind.completed = false;
    remind.startHour = startHour;
    remind.startMinute = startMinute;
    remind.waterQuantity = quantity;

    return remind
  }

  static createRemindersDay() {
    let reminderObj = new Object;

    reminderObj.id = Json.createId();
    reminderObj.reminders = [];

    return reminderObj
  }

  static addDay(path, reminderDay) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let resultObj = Json.parseObject(result);

      if (Json.findById(reminderDay.id, resultObj) != undefined) {
        console.log("Day already exists");
        return
      }

      resultObj.Reminder.push(reminderDay);

      window.electron.ipcRenderer.send('overwrite', path, resultObj);
    })
  }

  static addReminder(path, parentId, reminder) {
    this.check(path);

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

  static updateReminder(path, id) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let parsedRes = Json.parseObject(result);

      let parentObj = Json.findById(id, parsedRes);
      let count = Json.getCountById(id, parsedRes);

      if (parentObj == undefined) {
        console.log("Id not found");
        return
      }

      parsedRes.reminders[count-1].completed = true;

      window.electron.ipcRenderer.send('overwrite', path, parentObj);
    });

  }

  static updateWater(path, id, water) {
    this.check(path);

    let readData = window.electron.ipcRenderer.invoke('read', path);

    readData.then( (result) => {
      let parsedRes = Json.parseObject(result);

      let parentObj = Json.findById(id, parsedRes);
      let count = Json.getCountById(id, parsedRes);

      if (parentObj == undefined) {
        console.log("Id not found");
        return
      }

      parsedRes.reminders[count-1].waterQuantity = water;

      window.electron.ipcRenderer.send('overwrite', path, parentObj);
    });

  }

  static createCurrentDayData(path) {
    window.electron.ipcRenderer.invoke('read', path).then( (result) => {
      if (Json.findById(Json.createId(), Json.parseObject(result)) == undefined) {
        window.electron.ipcRenderer.send('overwrite', path, this.createRemindersDay());
      }
    })
  }

  static check(path) {
    window.electron.ipcRenderer.invoke('checkFile', path).then( (result) => {
      if (result) this.init(path);
    });
  }

}

export { Reminders }
