import { Reminders } from "../../main/scripts/data/data.js";
import { UserData } from "../../main/scripts/data/userData.js";
import { SleepData } from "../../main/scripts/data/sleepData.js";

import { createReminders } from "./scripts/reminders.js";

const reminderPath = './data/reminderData.json'
const userPath = './data/userData.json';
const sleepPath = './data/sleepData.json';

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    Reminders.check(reminderPath);
    Reminders.createCurrentDayData(reminderPath);
    UserData.check(userPath);
    SleepData.check(sleepPath)

    // let date = new Date(Date.now());
    // SleepData.getAverageWakeTime(sleepPath)

  })
}

init();

