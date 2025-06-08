function updateTime() {
  const timeElement = document.querySelector('.time');
  const now = new Date();
  
  // Format the time as HH:MM AM/PM
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12 || 12; // Convert to 12-hour format

  timeElement.textContent = `${hours}:${minutes} ${ampm}`;
}

updateTime(); // Set it once when the page loads
setInterval(updateTime, 1000); // Update every second (optional)

let workDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let currentTime = workDuration;
let isRunning = false;
let isWork = true;
let interval;

const timerDisplay = document.getElementById("timer");
const statusText = document.getElementById("status");

function updateDisplay() {
  const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
  const seconds = (currentTime % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    interval = setInterval(() => {
      currentTime--;
      updateDisplay();
      if (currentTime === 0) {
        clearInterval(interval);
        // Log session if work session just ended
        if (isWork) logSession();
        isWork = !isWork;
        currentTime = isWork ? workDuration : breakDuration;
        statusText.textContent = isWork ? "Work Session" : "Break Time";
        startTimer(); // auto-start next session
      }
    }, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  currentTime = isWork ? workDuration : breakDuration;
  updateDisplay();
}

updateDisplay();

// --- To-Do List ---
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load saved todos
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
savedTodos.forEach(todo => addTodo(todo.text, todo.completed));

// Add new to-do
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text !== "") {
    addTodo(text);
    todoInput.value = "";
  }
});

// Add a to-do item to the list
function addTodo(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTodos();
  });

  const del = document.createElement("button");
  del.textContent = "❌";
  del.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  li.appendChild(del);
  todoList.appendChild(li);
  saveTodos();
}

// Save todos to localStorage
function saveTodos() {
  const todos = [];
  todoList.querySelectorAll("li").forEach(li => {
    todos.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}




const progressBar = document.getElementById("progressBar");

function updateProgressBar() {
  const totalDuration = isWork ? workDuration : breakDuration;
  const elapsed = totalDuration - currentTime;
  const percent = (elapsed / totalDuration) * 100;
  progressBar.style.width = percent + "%";
}
interval = setInterval(() => {
  currentTime--;
  updateDisplay();
  updateProgressBar();  // <-- update bar as time changes

  if (currentTime === 0) {
    clearInterval(interval);
    isWork = !isWork;
    currentTime = isWork ? workDuration : breakDuration;
    statusText.textContent = isWork ? "Work Session" : "Break Time";
    progressBar.style.width = "0%"; // reset bar
    startTimer(); // auto start next session
  }
}, 1000);

const quotes = [
  { text: "Failure is not the opposite of success, it is part of success.", author: "Nambi Narayanan" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Ryhan Sehgal" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
];

function showDailyQuote() {
  const today = new Date().toISOString().split('T')[0];
  let dailyQuote = JSON.parse(localStorage.getItem("dailyQuote")) || {};

  if (dailyQuote.date !== today) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    dailyQuote = { date: today, text: quote.text, author: quote.author };
    localStorage.setItem("dailyQuote", JSON.stringify(dailyQuote));
  }

  document.getElementById("quoteText").textContent = `"${dailyQuote.text}" — ${dailyQuote.author}`;
}

showDailyQuote();


const noteInput = document.getElementById("noteInput");
const noteList = document.getElementById("noteList");

function loadNotes() {
  const saved = JSON.parse(localStorage.getItem("quickNotes")) || [];
  saved.forEach(note => renderNote(note));
}

function addNote() {
  const text = noteInput.value.trim();
  if (text) {
    renderNote(text);
    saveNote(text);
    noteInput.value = "";
  }
}

function renderNote(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "×";
  delBtn.onclick = () => {
    li.remove();
    deleteNote(text);
  };

  li.appendChild(delBtn);
  noteList.appendChild(li);
}

function saveNote(text) {
  const notes = JSON.parse(localStorage.getItem("quickNotes")) || [];
  notes.push(text);
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}

function deleteNote(text) {
  let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];
  notes = notes.filter(note => note !== text);
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}

loadNotes();











document.addEventListener("DOMContentLoaded", () => {
  const namePrompt = document.getElementById("name-prompt");
  const saveBtn = document.getElementById("save-name-btn");
  const nameInput = document.getElementById("username-input");
  const welcomeHeader = document.querySelector(".header h1"); // Assuming your welcome header is <h1> inside .header

  // Function to update the welcome message
  function updateWelcome(name) {
    welcomeHeader.textContent = `Welcome, ${name}!`;
  }

  // Check if name exists in localStorage
  const savedName = localStorage.getItem("username");
  if (savedName) {
    updateWelcome(savedName);
    namePrompt.classList.add("hidden");
  } else {
    namePrompt.classList.remove("hidden");
  }

  // Save button click handler
  saveBtn.addEventListener("click", () => {
    const enteredName = nameInput.value.trim();
    if (enteredName) {
      localStorage.setItem("username", enteredName);
      updateWelcome(enteredName);
      namePrompt.classList.add("hidden");
    } else {
      alert("Please enter your name.");
    }
  });
});
