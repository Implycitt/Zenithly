import { getter, setGender } from './data/userData.js';


function setWater() {
  let gender = getter('gender');
  console.log(gender);
  // if (gender === 'male' || gender === 'man') {
  //   return { liters: 3.7, ounces: 125 };
  // } else if (gender === 'female' || gender === 'woman') {
  //   return { liters: 2.7, ounces: 91 };
  // } else {
  //   return null;
  // }
}

function test() {
  setWater();
}

test()
