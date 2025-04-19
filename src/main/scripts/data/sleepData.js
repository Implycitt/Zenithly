class SleepData {

  constructor() {
    this.hoursMath = 1000*60*60
  }

  init(path) {
    let defaultSleepData = createSleepData(0, []);

    window.electron.ipcRenderer.send('overwrite', path, defaultSleepData);
  }

  createSleepData(state = 0, sleeps = '') {
    let sleepData = new Object;

    // 0 -> Default State
    // 1 -> Sleep state
    sleepData.state = state;
    sleepData.sleeps = sleeps;

    return sleepData;
  }

  createSleep(start, endTime = null, timeSlept = 0, goodness = 0) {
    let sleep = new Object;

    sleep.ID = createID();
    sleep.startTime = start;
    sleep.endTime = endTime;
    sleep.timeSlept = timeSlept;
    sleep.goodnessOfSleep = goodness;

    return sleep
  }

  updateSleeps(path, endTime) {
    let readData = getJsonAsObject(path);
    let lastStartTime = readData.sleeps.slice(-1)[0].startTime;
    let delta = getDeltaTime(path, endTime);
    let object = createSleep(lastStartTime, endTime, delta, updateGoodness(path, delta));
    readData.sleeps.pop();
    let conc = readData.sleeps.concat(object);
    let writeable = createSleepData(0, conc);
    overwrite(writeable, path);
  }

  updateGoodness(path, delta) {
    let readData = getJsonAsObject(path);
    let average = getAverageSleep(path);
    if (average == 0) average = 1
    return (delta/average)
  }

  addSleeps(path, sleeps) {
    if (getJsonAsObject(path) == undefined || getJsonAsObject(path) == "") {
      init(path);
    }
    let readData = getJsonAsObject(path);
    let conc = readData.sleeps.concat(sleeps);
    let writeable = createSleepData(1, conc);
    setter(path, writeable, readData);
  }

  setState(path, state) {
    let readData = getJsonAsObject(path);
    let newData = createSleepData(state);
    if (!fs.existsSync(path)) init();
    setter(path, newData, readData);
  }

  getDeltaTime(path, time) {
    let readData = getJsonAsObject(path);
    if (readData == undefined) return;

    let readSleeps = readData.sleeps.slice(-1)[0].startTime;

    return ((time - readSleeps)/this.hoursMath);
  }

}

export { SleepData }
