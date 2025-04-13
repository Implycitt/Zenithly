const calendarBody = document.getElementById("calendar-body");
const monthYearLabel = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar(month, year) {
    calendarBody.innerHTML = "";
  
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  
    monthYearLabel.textContent = `${monthName} ${year}`;
  
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
  
    let dayCounter = 1;
  
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
  
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
  
        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (dayCounter <= daysInMonth) {
          cell.textContent = dayCounter;
  
          if (
            dayCounter === todayDate &&
            month === todayMonth &&
            year === todayYear
          ) {
            cell.classList.add("today");
          }
  
          dayCounter++;
        } else {
          cell.textContent = "";
        }
  
        row.appendChild(cell);
      }
  
      calendarBody.appendChild(row);
  
      if (dayCounter > daysInMonth) break;
    }
  }

// Button
prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });
  
nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

renderCalendar(currentMonth, currentYear);
