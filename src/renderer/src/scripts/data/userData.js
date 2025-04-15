import fs from 'fs';
import { handleError } from '../../tools/error.js';
import { createJSON, getJSON, overwrite, parseObject } from '../../tools/json.js';

const PATH = '../../../../../data/userData.json';

function init() {
  let defaultUserData = createJSON(new Object(userData));

  fs.appendFile(PATH, defaultUserData, (err) => {
    handleError(err);
  });

}

function createUserData(gend = 'none', water = 0) {
  let userData = new Object;

  userData.gender = gend;
  userData.waterIntake = water;

  return userData
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

function getter(key) {
  return parseObject(getJSON(PATH))[key]
}


export { setGender, getter, setIntake, createUserData, init };
