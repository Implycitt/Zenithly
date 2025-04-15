import fs from 'fs';
import { handleError } from '../../tools/error.js';
import { createJSON, getJSON, overwrite, parseObject } from '../../tools/json.js';

const PATH = '../../../../../data/userData.json';

function init() {
  let defaultUserData = createUserData();

  fs.appendFile(PATH, defaultUserData, (err) => {
    handleError(err);
  });

}

function createUserData(gend = 'none', water = ((2.7+3.7)/2), state = 0) {
  let userData = new Object;

  userData.gender = gend;
  userData.waterIntake = water;
  userData.state = state;
  // 0 -> Default State
  // 1 -> Sleep state

  return createJSON(userData);
}

function setGender(gend) {
  if (!fs.existsSync(PATH)) {
    init();
  }

  let newData = createUserData(gend)
  let readData = getJSON(PATH);
  let writeable = Object.assign(newData, readData);

  overwrite(writeable, PATH);
}

function setIntake(water) {
  if (!fs.existsSync(PATH)) {
    init();
  }

  let readData = getJSON(PATH);
  let newData = createUserData(readData.gender, water)
  let writeable = Object.assign(newData, readData);

  overwrite(writeable, PATH);
}

function setState(state) {
  if (!fs.existsSync(PATH)) {
    init();
  }

  let readData = getJSON(PATH);
  let newData = createUserData(readData.gender, readData.water, state)
  let writeable = Object.assign(newData, readData);

  overwrite(writeable, PATH);
}


function getter(key) {
  return parseObject(getJSON(PATH))[key]
}

export { setGender, setState, setIntake, getter, createUserData, init };
