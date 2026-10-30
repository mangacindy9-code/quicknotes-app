const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");

let notes = [];
loadNotes();

function render() {
  notesList.textContent = "";

  const query = searchInput.value.toLowerCase().trim();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  updateNoteCount(notes.length);

  if (filteredNotes.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent =
      notes.length === 0 ? "No notes yet." : "No notes match your search.";
    notesList.appendChild(emptyMsg);
    return;
  }

  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note-card");

    const categoryClass = `category-${note.category.toLowerCase()}`;
    li.classList.add(categoryClass);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("note-content");

    const categoryTag = document.createElement("p");
    categoryTag.classList.add("note-category-tag");
    categoryTag.textContent = note.category;

    const textPara = document.createElement("p");
    textPara.classList.add("note-text");
    textPara.textContent = note.text;

    const datePara = document.createElement("p");
    datePara.classList.add("note-date");
    datePara.textContent = note.createdAt;

    contentDiv.appendChild(categoryTag);
    contentDiv.appendChild(textPara);
    contentDiv.appendChild(datePara);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  saveNotes();
  render();
  noteInput.value = "";
});

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

function updateNoteCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

searchInput.addEventListener("input", () => {
  render();
});

function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

function loadNotes() {
  const stored = localStorage.getItem("quicknotes");
  if (stored) {
    notes = JSON.parse(stored);
  }
  render();
}

clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;
  
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
