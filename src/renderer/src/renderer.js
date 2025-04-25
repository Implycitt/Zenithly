import { Json } from "../../main/scripts/tools/file.js";
import { Reminders } from "../../main/scripts/data/data.js";
import { UserData } from "../../main/scripts/data/userData.js";

const reminderpath = './data/reminderData.json'
const userpath = './data/userData.json';

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    // let day = Reminders.createRemindersDay();
    // Reminders.addDay(reminderpath, day)
    let reminder = Reminders.createReminder(1, 1, 1, 1, 1);
    Reminders.addReminder(reminderpath, '2025-3-24', reminder);

  })
}

init();

