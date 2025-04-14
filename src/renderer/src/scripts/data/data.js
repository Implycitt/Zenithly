import fs from 'fs';
import { handleError } from '../../tools/error.js';

const path = '../../../../../data/reminderData.json';
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

function createJSON(object) {
  return JSON.stringify(object, null, 2);
}

function parseObject(json) {
  return JSON.parse(json);
}

function writeToData(object, path) {
  if (!fs.existsSync(path)) {
    fs.openSync(path, 'w');
  }

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let readData = getjson(path);
  let combined;

  if (readData == undefined) {
    combined = object;
  } else {
    // make it so that it goes under the same objects
    combined = { ...readData[year][month][day], ...object};
  }
  combined = parseObject(createJSON(combined));

  fs.appendFile(path, createJSON(combined), { encoding: 'utf8', flag: 'a+' }, (err) => {
    handleError(err);
  });
}

function getjson(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    handleError(err);
    return data
  });
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

function test() {
  let obj = init();
  writeToData(obj, path);
}

test()
