
 

  // Notes app logic
  const notesContainer = document.getElementById("notes-container");

  function loadNotes() {
    if (!notesContainer) return;
    notesContainer.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((noteText) => {
      createNoteElement(noteText);
    });
  }

  function saveNotes() {
    const notes = Array.from(document.querySelectorAll(".note textarea")).map(
      (note) => note.value
    );
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function addNote() {
    createNoteElement("");
    saveNotes();
  }

  function createNoteElement(text) {
    const note = document.createElement("div");
    note.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.addEventListener("input", saveNotes);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "X";
    deleteBtn.onclick = () => {
      note.classList.add("fade-out");
      setTimeout(() => {
        note.remove();
        saveNotes();
      }, 300);
    };

    note.appendChild(textarea);
    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);
  }

  window.onload = loadNotes;

