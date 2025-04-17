import closeButton from '../../assets/images/close.png';
import waterIcon from '../../assets/images/water.png';
import sleepIcon from '../../assets/images/sleep.png';

const calendarBody = document.getElementById("calendar-body");
const monthYearLabel = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let currentDate = new Date();

let currentDay = currentDate.getDay();
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
        const p = cell.appendChild(document.createElement("p"));

        cell.classList.add("calendar-day");
        p.classList.add("nunito-regular");
        p.style.margin = "0px";

        if (i === 0 && j < firstDay) {
          p.textContent = "";
          cell.style.background = "transparent";
          cell.style.boxShadow = "none";
          cell.style.scale = "1";
        } else if (dayCounter <= daysInMonth) {
          p.textContent = dayCounter;

          const dayView = document.getElementById('day-view');
          const dayTitle = document.getElementById('dayTitle');
          const close = document.createElement('img');
          close.classList.add("close");
          close.src = closeButton;

          //Opens day-view if date is clicked on
          cell.addEventListener('click', () => {
            dayTitle.textContent = `${p.textContent} ${monthName} ${year}`;
            dayView.append(close);
            dayView.style.display = "block";
          })

          const iconContainer = document.createElement("div");
          iconContainer.classList.add("icon-container");

          const water = document.createElement("img");
          water.src = waterIcon;
          water.alt = "Water";
          water.style.width = "20px";
          water.style.height = "20px";

          const sleep = document.createElement("img");
          sleep.src = sleepIcon;
          sleep.alt = "Sleep";
          sleep.style.width = "20px";
          sleep.style.height = "20px";

          iconContainer.appendChild(water);
          iconContainer.appendChild(sleep);

          cell.appendChild(iconContainer);


          if (
            dayCounter === todayDate &&
            month === todayMonth &&
            year === todayYear
          ) {
            cell.classList.add("today");
          }

          dayCounter++;
        } else {
          p.textContent = "";
          cell.removeAttribute('style');
          cell.style.boxShadow = "none";
          cell.style.background = "transparent";
          cell.style.scale = "1";
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);

      if (dayCounter > daysInMonth) break;
    }
  }

  function calendarHeight() {
    const rows = calendarBody.getElementsByTagName("tr");
    const calendarHeight = 70;
    const rowHeight = calendarHeight / rows.length;

    for (let row of rows) {
      row.style.height = `${rowHeight}%`;
    }
  }

function checkContent() {
  const cells = calendarBody.getElementsByTagName("td");

  for (let cell of cells) {
    if (cell.innerHTML === "") {
      cell.style.borderWidth = "0px";
      cell.style.backgroundColor = "transparent";
    }
  }
}

function hideDayContent() {
  document.querySelectorAll('.icon-container').forEach(iconContainer => {
    iconContainer.style.display = 'none';
  });

  document.querySelectorAll('.calendar tbody td').forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      const iconContainer = cell.querySelector('.icon-container');
      if (iconContainer) {
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = "center";
        iconContainer.style.justifyContent = "center";
      }
    });

    cell.addEventListener('mouseleave', () => {
      const iconContainer = cell.querySelector('.icon-container');
      if (iconContainer) {
        iconContainer.style.display = 'none';
      }
    });
  });
}

// Button
prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
    calendarHeight();
    checkContent();
    hideDayContent();
  });

nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
    calendarHeight();
    checkContent();
    hideDayContent();
  });

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
      event.target.parentElement.style.display = "none";
  }
});


renderCalendar(currentMonth, currentYear);
calendarHeight();
checkContent();
hideDayContent();