import { getSleeps } from './data/sleepData.js';

const relativeSleepData = '../../../../../data/sleepData.json';

function getAverageSleep(sleepDataPath) {
  let sleeps = getSleeps(sleepDataPath);
  let average = 0;
  for (let i = 0; i < sleeps.length; ++i) {
    average += sleeps[i].timeSlept;
  }
  return (average/(sleeps.length))
}

function normalizeSleep() {

}

function test() {
  console.log(getAverageSleep(relativeSleepData));
}


export { getAverageSleep }
