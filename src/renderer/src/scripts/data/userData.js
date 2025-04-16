import fs from 'fs';
import { handleError } from '../../tools/error.js';
import { getJSON, getJsonAsObject, parseObject, setter } from '../../tools/json.js';

const path = '../../../../../data/userData.json';

function init(path) {
  let defaultUserData = createUserData();

  fs.appendFile(path, defaultUserData, (err) => {
    handleError(err);
  });
}

function createUserData(gend = 'none', water = ((2.7+3.7)/2)) {
  let userData = new Object;

  userData.gender = gend;
  userData.waterIntake = water;

  return userData;
}

function setGender(gend, path) {
  if (!fs.existsSync(path)) init();
  let readData = getJsonAsObject(path);
  let newData = createUserData(gend)
  setter(path, newData, readData);
}

function setIntake(water, path) {
  if (!fs.existsSync(path)) init();
  let readData = getJsonAsObject(path);
  let newData = createUserData(readData.gender, water);
  setter(path, newData, readData);
}

function getter(key, path) {
  return parseObject(getJSON(path))[key]
}

function test() {
  setGender('male', path)
}

test()

export { setGender, setIntake, getter, createUserData, init };
