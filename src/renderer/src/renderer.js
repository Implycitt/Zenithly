import { Reminders } from "../../main/scripts/data/data.js";
import { UserData } from "../../main/scripts/data/userData.js";
import { SleepData } from "../../main/scripts/data/sleepData.js";

const reminderPath = './data/reminderData.json'
const userPath = './data/userData.json';
const sleepPath = './data/sleepData.json';

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    Reminders.check(reminderPath);
    UserData.check(userPath);
    SleepData.check(sleepPath)

    let date = new Date(Date.now());
    SleepData.setEndTime(sleepPath, userPath, "2025-3-16", date.getTime());

  })
}

init();

