import fs from 'node:fs';
import { getJsonAsObject, writeAppend } from '../../tools/json.js';

const date = new Date(Date.now());
const path = '../../../../../data/reminderData.json';

function createReminder(startHour, startMinute, startSecond, quantity) {
  let remind = new Object;

  remind.completed = false;
  remind.startHour = startHour;
  remind.startMinute = startMinute;
  remind.startSecond = startSecond;
  remind.waterQuantity = quantity;

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

function updateReminder(path) {

}

function addReminder(path, id, reminds = 1) {
  let readData = getJsonAsObject(path);
  let conc = readData[id]
  console.log(conc);
}

function test() {
  let remind = createReminder(date.getHours(), date.getMinutes(), date.getSeconds());
  let obj = createRemindersDay([remind])
  // addData(obj, path)
  addReminder(path, '2025-3-16')
}

test()

export { addData, createReminder, createID, createRemindersDay }
