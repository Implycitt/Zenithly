import fs from 'fs';
import { getJSON, setter, overwrite, getJsonAsObject, setterAppend } from '../../tools/json.js';
import { createID } from './data.js';

const path = '../../../../../data/sleepData.json';
const hoursMath = 1000*60*60

function init(path) {
  let defaultSleepData = createSleepData(0, []);

  overwrite(defaultSleepData, path);
}

function createSleepData(state = 0, sleeps = '') {
  let sleepData = new Object;

  sleepData.state = state;
  // 0 -> Default State
  // 1 -> Sleep state

  sleepData.sleeps = sleeps;


  return sleepData;
}

function createSleep(start, endTime = null, timeSlept = 0) {
  let sleep = new Object;

  sleep.ID = createID();
  sleep.startTime = start;
  sleep.endTime = endTime;
  sleep.timeSlept = timeSlept;

  return sleep
}

function updateSleeps(path, endTime) {
  let readData = getJsonAsObject(path)
  let lastStartTime = readData.sleeps.slice(-1)[0].startTime;
  let object = createSleep(lastStartTime, endTime, getDeltaTime(path, endTime));
  let writeable = createSleepData(readData.state+1%1, object);
  setter(path, writeable, readData);
}

function addSleeps(path, sleeps) {
  if (getJsonAsObject(path) == undefined || getJsonAsObject(path) == "") {
    init(path);
  }
  let readData = getJsonAsObject(path);
  let conc = readData.sleeps.concat(sleeps);
  let writeable = createSleepData(readData.state, conc);
  setter(path, writeable, readData);
}

function setState(path, state) {
  let newData = createSleepData(state)
  if (!fs.existsSync(path)) init();
  setter(path, newData);
}

function getDeltaTime(path, time) {
  let readData = getJsonAsObject(path);
  if (readData == undefined) return;

  let readSleeps = readData.sleeps.slice(-1)[0].startTime;

  return ((time - readSleeps)/hoursMath);
}

function getSleeps(path) {
  return getJsonAsObject(path).sleeps
}

function test() {
  let date = new Date(Date.now());
  // let sleeps = createSleep(date.getTime());
  // addSleeps(path, sleeps);
  // console.log(getDeltaTime(path, date.getTime()));
  // updateSleeps(path, date.getTime())
  // getSleeps(path);

}

test();
