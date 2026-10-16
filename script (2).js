// Select the elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes-app-notes";
const MAX_LENGTH = 200;

// Load saved notes from localStorage, or start with an empty array
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

// Notes are stored as an array of objects: { id, text, category, createdAt }
let notes = loadNotes();

// Save the whole array to localStorage as JSON text
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Returns the count message for zero, one or many notes
function getCountMessage(total) {
  if (total === 0) {
    return "You have no notes yet.";
  }
  if (total === 1) {
    return "You have 1 note.";
  }
  return `You have ${total} notes.`;
}

// Returns the notes whose text contains every search word (ignores capital letters)
function getVisibleNotes() {
  const words = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return notes;
  }
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

// Rebuild the list from the array
function render() {
  const visibleNotes = getVisibleNotes();
  notesList.replaceChildren();

  if (notes.length > 0 && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }

  for (const note of visibleNotes) {
    const item = document.createElement("li");
    item.className = `note category-${note.category}`;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const category = document.createElement("span");
    category.className = "category-label";
    category.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    meta.append(category, date, deleteBtn);
    item.append(text, meta);
    notesList.appendChild(item);
  }

  // The count shows the total number of notes, not the number of search matches
  noteCount.textContent = getCountMessage(notes.length);
}

// Add a note when the form is submitted, after validating it
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  notes.push({
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  });

  saveNotes();
  noteInput.value = "";
  render();
});

// Remove one note by its id
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Update the list as the user types in the search box
searchInput.addEventListener("input", render);

render();
