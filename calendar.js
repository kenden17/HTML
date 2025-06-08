const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const modal = document.getElementById("modal");
const modalDate = document.getElementById("modal-date");
const eventText = document.getElementById("event-text");
const eventList = document.getElementById("event-list");
const addEventBtn = document.getElementById("add-event");
const saveEventBtn = document.getElementById("save-event");
const closeModalBtn = document.getElementById("close-modal");

let current = new Date();
let selectedDate = null;
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

// Render calendar days
function renderCalendar() {
  const year = current.getFullYear();
  const month = current.getMonth();
  const today = new Date();

  monthYear.textContent = `${current.toLocaleString("default", { month: "long" })} ${year}`;
  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Blank days before first day of month
  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div class="day empty"></div>`;
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${month + 1}-${day}`;
    const div = document.createElement("div");
    div.classList.add("day");

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      div.classList.add("today");
    }

    if (events[dateStr] && events[dateStr].length > 0) {
      div.classList.add("has-event");
    }

    div.textContent = day;

    div.addEventListener("click", () => openModal(dateStr));

    calendar.appendChild(div);
  }
}

// Open modal and display events for selected date
function openModal(dateStr) {
  selectedDate = dateStr;
  modalDate.textContent = `Events on ${dateStr}`;
  eventText.value = "";
  renderEventList();
  modal.classList.remove("hidden");
}

// Render list of events for the selected day inside modal
function renderEventList() {
  eventList.innerHTML = "";
  const dayEvents = events[selectedDate] || [];
  if (dayEvents.length === 0) {
    eventList.innerHTML = "<li>No events yet.</li>";
  } else {
    dayEvents.forEach((eventText, index) => {
      const li = document.createElement("li");
      li.textContent = eventText;

      // Add a delete button for each event
      const delBtn = document.createElement("button");
      delBtn.textContent = "X";
      delBtn.style.marginLeft = "10px";
      delBtn.style.color = "crimson";
      delBtn.style.cursor = "pointer";
      delBtn.addEventListener("click", () => {
        dayEvents.splice(index, 1);
        if (dayEvents.length === 0) {
          delete events[selectedDate];
        }
        localStorage.setItem("calendarEvents", JSON.stringify(events));
        renderEventList();
        renderCalendar();
      });

      li.appendChild(delBtn);
      eventList.appendChild(li);
    });
  }
}

// Add new event to the selected date
addEventBtn.addEventListener("click", () => {
  const text = eventText.value.trim();
  if (!text) return alert("Please enter an event.");
  
  if (!events[selectedDate]) {
    events[selectedDate] = [];
  }
  events[selectedDate].push(text);
  eventText.value = "";
  localStorage.setItem("calendarEvents", JSON.stringify(events));
  renderEventList();
  renderCalendar();
});

// Save button just closes modal (events already saved on add)
saveEventBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal without saving (also just closes modal)
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Initial render
renderCalendar();

document.getElementById("prev-month").addEventListener("click", () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
});

