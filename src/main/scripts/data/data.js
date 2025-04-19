class Reminders {

  constructor() {
    this.date = new Date(Date.now());
  }

  static createID() {
    return `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`
  }

  static createReminder(startHour, startMinute, startSecond, quantity) {
    let remind = new Object;

    remind.completed = false;
    remind.startHour = startHour;
    remind.startMinute = startMinute;
    remind.startSecond = startSecond;
    remind.waterQuantity = quantity;

    return remind
  }

  static createRemindersDay(reminders) {
    let reminderObj = new Object;

    reminderObj.id = createID();
    reminderObj.reminders = reminders;

    return reminderObj
  }

  static updateReminder(path) {
    //TODO
  }

}

export { Reminders }
