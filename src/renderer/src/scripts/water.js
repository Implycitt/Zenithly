const readline = require('readline');
const cron = require('node-cron');

// Get water intake based on gender
function getWaterIntake(gender) {
  gender = gender.toLowerCase();
  if (gender === 'male' || gender === 'man') {
    return { liters: 3.7, ounces: 125 };
  } else if (gender === 'female' || gender === 'woman') {
    return { liters: 2.7, ounces: 91 };
  } else {
    return null;
  }
}

// Schedule water reminders at key times
function scheduleReminders() {
    const hours = [9, 11, 1, 3, 5, 7];
    let index = 0;
  
    cron.schedule('*/10 * * * * *', () => {
      const hour = hours[index % hours.length];
      console.log(`💧 It's ${hour}:00 – Time to drink water!`);
      index++;
    });
    }
  
  

// CLI Prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your gender (male/female): ', (gender) => {
  const intake = getWaterIntake(gender);

  if (!intake) {
    console.log('Please enter "male" or "female".');
  } else {
    console.log(`Recommended water intake: ~${intake.liters} liters (${intake.ounces} oz) per day.`);
    scheduleReminders();
  }

  rl.close();
});
