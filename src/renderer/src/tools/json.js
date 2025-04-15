import { handleError } from './error.js';
import fs from 'fs';

function createJSON(object) {
  return JSON.stringify(object, null, 2);
}

function parseObject(json) {
  return JSON.parse(json);
}

function getJSON(path) {
  return fs.readFileSync(path, { encoding: 'utf8' })
}

function writeAppend(writeable, path) {
  fs.appendFile(path, createJSON(writeable), { encoding: 'utf8', flag: 'a+' }, (err) => {
    handleError(err);
  });
}

function overwrite(writeable, path) {
  fs.writeFileSync(path, createJSON(writeable), { encoding: 'utf8' }, (err) => {
    handleError(err);
  });
}

export { createJSON, parseObject, getJSON, overwrite, writeAppend }

