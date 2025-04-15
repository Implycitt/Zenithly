import fs from 'fs';
import { handleError } from '../../tools/error.js';
import { createJSON, getJSON, writeAppend, parseObject } from '../../tools/json.js';

const date = new Date(Date.now());

function createReminder(reminderId = 0, completed = false) {
  let remind = new Object;

  remind.reminderId = reminderId;
  remind.completed = completed;
  remind.startHours = date.getHours();
  remind.startMinutes = date.getMinutes();
  remind.startSeconds = date.getSeconds();

  return remind
}

function createID() {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function createObj(numReminders = 1) {
  let reminderObj = new Object;
  reminderObj.id = createID();
  reminderObj.reminders = [];

  for (let i = 0; i < numReminders; ++i) {
    reminderObj.reminders.push(createReminder());
  }

  return reminderObj
}

function writeToData(object, path) {
  if (!fs.existsSync(path)) {
    fs.openSync(path, 'w');
  }

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let readData = getJSON(path);
  let combined;

  if (readData == undefined || readData == "") {
    combined = object;
  } else {
    combined = Object.assign(object, readData);
  }

  writeAppend(combined, path);
}

export { writeToData, createReminder, createID, createObj }
