
function determineIntervals(userDataPath, wakeTime, averageSleepTime) {

}

function getAverageWaterIntake(userDataPath) {
  let sleeps = getReminders(sleepDataPath);
  let average = 0;
  for (let i = 0; i < sleeps.length; ++i) {
    average += sleeps[i].timeSlept;
  }
  return (average/(sleeps.length))
}

function test() {

}

test()
