import { Reminders } from "../../../main/scripts/data/data";
import { SleepData } from "../../../main/scripts/data/sleepData";
import { Json } from "../../../main/scripts/tools/file";

const reminderDiv = document.getElementById('reminders');

const reminderPath = './data/reminderData.json'
const userPath = './data/userData.json';
const sleepPath = './data/sleepData.json';

function createReminders() {
  const date = new Date();
  const today = Json.createId();
  const yesterday = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()-1}`
  let reminders = [];

  let readData = window.electron.ipcRenderer.invoke('read', sleepPath);
  let avg = 0;

  readData.then( (result) => {
    let resultObj = Json.parseObject(result);

    for (let i = 0; i < resultObj.sleeps.length; ++i) {
      let utc = new Date(resultObj.sleeps[i].startTime);
      avg += utc.getUTCHours()
    }
    avg /= resultObj.sleeps.length;


    let lastEndTime;
    let id;
    if (Json.findById(today, resultObj) == undefined) {
      lastEndTime = new Date(Json.findById(yesterday, resultObj).endTime);
      id = yesterday;
    } else {
      lastEndTime = new Date(Json.findById(today, resultObj).endTime);
      id = today;
    }
    let utcEnd = lastEndTime.getUTCHours();
    let timeAwake = utcEnd - avg;

    window.electron.ipcRenderer.invoke('read', userPath).then( (res) => {
      let waterIntake = Json.parseObject(res).waterIntake;
      let waterPerHour = waterIntake / timeAwake;

      for (let i = 0; i < timeAwake; ++i) {
        let startHour = (utcEnd+i)%24;
        reminders.push(Reminders.createReminder(i, startHour, lastEndTime.getUTCMinutes(), waterPerHour));
      }

      Reminders.addReminder(reminderPath, id, reminders)
    })

  });

}



export { createReminders }
