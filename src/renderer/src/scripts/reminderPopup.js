//import createReminder from '../scripts/data/data.js'

const addReminderButton = document.querySelector(".add-reminder");
const reminderPopup = document.querySelector(".reminderPopup");
const input = document.getElementById("reminderInput");
const saveButton = document.getElementById("saveReminder");

addReminderButton.addEventListener("click", () => {
    reminderPopup.style.display = 'flex';
})

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('reminderClose')) {
        event.target.parentElement.style.display = "none";
    }
});

saveButton.addEventListener('click', function(event) {
    event.target.parentElement.style.display = "none";
    if (input.value != "") {
        console.log(input.value.slice(0, 2), input.value.slice(3));
        //createReminder(input.value.slice(0, 2), input.value.slice(3), 0);
    }
});