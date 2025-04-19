import { Json } from "../../main/scripts/tools/file.js";
import { Reminders } from "../../main/scripts/data/data.js";
import { UserData } from "../../main/scripts/data/userData.js";

const reminderpath = './data/reminderData.json'
const userpath = './data/userData.json';

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    // let object = Reminders.createReminder();
    // window.electron.ipcRenderer.send('add', reminderpath, object)
    UserData.setGender(userpath, 'male');
  })
}

function getBack() {
  const read = window.electron.ipcRenderer.invoke('getter', path);
  // read.then( (result) => {
    console.log(read);
  // })
}

init();

