import fs from 'fs';
import { getJsonAsObject, writeAppend } from '../../tools/json.js';

const date = new Date(Date.now());
const path = '../../../../../data/reminderData.json';

function createReminder(reminderId = 0, completed = false, startHour, startMinute, startSecond) {
  let remind = new Object;

  remind.reminderId = reminderId;
  remind.completed = completed;
  remind.startHour = startHour;
  remind.startMinute = startMinute;
  remind.startSecond = startSecond;

  return remind
}

function createID() {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function createRemindersDay(reminders) {
  let reminderObj = new Object;

  reminderObj.id = createID();
  reminderObj.reminders = reminders;

  return reminderObj
}

function addData(object, path) {
  if (!fs.existsSync(path)) {
    fs.openSync(path, 'w');
  }

  let readData = getJsonAsObject(path);
  let combined;

  if (readData == undefined || readData == "") {
    combined = object;
  } else {
    combined = Object.assign(object, readData);
  }

  writeAppend(combined, path);
}

function test() {
  let remind = createReminder(date.getHours(), date.getMinutes(), date.getSeconds());
  let obj = createRemindersDay([remind])
  addData(obj, path)
}

export { addData, createReminder, createID, createRemindersDay }
