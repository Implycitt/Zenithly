import fs from 'node:fs';
import { getJSON, setter, overwrite, getJsonAsObject, setterAppend } from '../../tools/json.js';
import { createID } from './data.js';
import { getAverageSleep } from '../sleep.js';

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

function createSleep(start, endTime = null, timeSlept = 0, goodness = 0) {
  let sleep = new Object;

  sleep.ID = createID();
  sleep.startTime = start;
  sleep.endTime = endTime;
  sleep.timeSlept = timeSlept;
  sleep.goodnessOfSleep = goodness;

  return sleep
}

function updateSleeps(path, endTime) {
  let readData = getJsonAsObject(path);
  let lastStartTime = readData.sleeps.slice(-1)[0].startTime;
  let delta = getDeltaTime(path, endTime);
  let object = createSleep(lastStartTime, endTime, delta, updateGoodness(path, delta));
  readData.sleeps.pop();
  let conc = readData.sleeps.concat(object);
  let writeable = createSleepData(0, conc);
  overwrite(writeable, path);
}

function updateGoodness(path, delta) {
  let readData = getJsonAsObject(path);
  let average = getAverageSleep(path);
  if (average == 0) average = 1
  return (delta/average)
}

function addSleeps(path, sleeps) {
  if (getJsonAsObject(path) == undefined || getJsonAsObject(path) == "") {
    init(path);
  }
  let readData = getJsonAsObject(path);
  let conc = readData.sleeps.concat(sleeps);
  let writeable = createSleepData(1, conc);
  setter(path, writeable, readData);
}

function setState(path, state) {
  let readData = getJsonAsObject(path);
  let newData = createSleepData(state);
  if (!fs.existsSync(path)) init();
  setter(path, newData, readData);
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
  // let delta = getDeltaTime(path, date.getTime());
  updateSleeps(path, date.getTime())
  // getSleeps(path);
  // console.log(updateGoodness(path, delta))
}

test();

export { getSleeps, getDeltaTime, setState, addSleeps, updateSleeps, createSleep, createSleepData }
