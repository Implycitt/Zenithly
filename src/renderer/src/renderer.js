// import { getAverageSleep } from './scripts/sleep.js';
import { createReminder, createRemindersDay } from "../../main/scripts/data/data";

const path = './data/reminderData.json'

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    // sendCommand();
    // getBack();
    // add();
    window.electron.ipcRenderer.send('testAdd');
  })
}

function getBack() {
  const read = window.electron.ipcRenderer.invoke('getter', path);
  // read.then( (result) => {
    console.log(read);
  // })
}

function sendCommand() {
  window.electron.ipcRenderer.send('read', path);
}

function add() {
  let remind = createReminder();
  let day = createRemindersDay([remind]);
  console.log(day);
  window.electron.ipcRenderer.send('add', path, day);
}

init();

const routeData = '../routes/data.html';

function changeContent(routePath) {
  const content = document.documentElement.innerHTML;
  console.log(content);
}

function test() {
  // changeContent(routeData);
  const average = getAverageSleep('../../data/sleepData.json');
  console.log(average);
}
