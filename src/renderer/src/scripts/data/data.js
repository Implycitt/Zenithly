import fs from 'fs';
import { handleError } from '../../tools/error.js';
import { createJSON, getJSON, writeAppend, parseObject } from '../../tools/json.js';

//TODO: make sure that all the functions take in path since everything is relative
const PATH = '../../../../../data/reminderData.json';
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

function createDay(dayId = date.getDate(), reminders = []) {
  let day = new Object;

  day.dayId = dayId;
  day.reminders = reminders;

  return day
}

function createMonth(monthId = date.getMonth(), days = []) {
  let month = new Object;

  month.monthId = monthId;
  month.days = days;

  return month
}

function createYear(yearId = date.getFullYear(), months = []) {
  let year = new Object;

  year.yearId = yearId;
  year.months = months;

  return year
}

function writeToData(object, PATH) {
  if (!fs.existsSync(PATH)) {
    fs.openSync(PATH, 'w');
  }

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let readData = parseObject(getJSON(PATH));
  let combined;

  if (readData == undefined) {
    combined = object;
  } else {
    // TODO: make it so that it goes under the same objects
    combined = Object.assign(object, readData);
  }

  writeAppend(combined, PATH);
}


function init(numReminders = 1) {
  let day = createDay();
  let month = createMonth();
  let year = createYear();

  for (let i = 0; i < numReminders; ++i) {
    day.reminders.push(createReminder());
  }

  month.days.push(day);
  year.months.push(month);

  return year
}

export { writeToData, init, createYear, createMonth, createReminder, createDay }
