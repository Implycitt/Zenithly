const fs = require('fs');
const path = '../../../../../data/reminderData.json';

function createReminder(reminderId = 0, completed = false) {
  let remind = new Object;
  let date = new Date(Date.now());

  remind.reminderId = reminderId;
  remind.completed = completed;
  remind.startHours = date.getHours();
  remind.startMinutes = date.getMinutes();
  remind.startSeconds = date.getSeconds();

  return remind
}

function createDay(dayId = Date(Date.now()).getDay, reminders = []) {
  let day = new Object;

  day.dayId = dayId;
  day.reminders = reminders;

  return day
}

function createJSON(object) {
  return JSON.stringify(object);
}

function parseObject(json) {
  return JSON.parse(json);
}

function writeToData(object, path) {
  fs.openSync(path, 'w');

  fs.writeFile(path, createJSON(object), 'utf8', (err) => {
    if (err) {
      console.error("An error occured:", err);
    }
  });
}

function getjson(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return
    }
    console.log(data);
  });
}

function test() {
  let remind = createReminder();
  console.log(remind);

  writeToData(remind, path);

  json = createJSON(remind);
  console.log(json);

  backToString = parseObject(json);
  console.log(backToString);
}

test()
