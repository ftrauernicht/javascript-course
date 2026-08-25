const noteList = document.getElementById("note-list");
const newButton = document.getElementById("new-button");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const deleteButton = document.getElementById("delete-button");

let notes = [];
let currentId = null;

async function loadNotes() {
  const response = await fetch("/api/notes");
  notes = await response.json();
  renderList();
}

function renderList() {
  noteList.innerHTML = notes
    .map((note) => {
      const selectedClass = note.id === currentId ? "selected" : "";
      const snippet = note.content.slice(0, 40) || "No content yet";
      return (
        '<li class="' + selectedClass + '" data-id="' + note.id + '">' +
          '<p class="note-title">' + note.title + "</p>" +
          '<p class="note-snippet">' + snippet + "</p>" +
        "</li>"
      );
    })
    .join("");

  noteList.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      selectNote(Number(item.dataset.id));
    });
  });
}

function selectNote(id) {
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return;
  }

  currentId = note.id;
  titleInput.value = note.title;
  contentInput.value = note.content;
  deleteButton.disabled = false;
  renderList();
}

function clearForm() {
  currentId = null;
  titleInput.value = "";
  contentInput.value = "";
  deleteButton.disabled = true;
  renderList();
}

async function handleSave(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value;

  if (!title) {
    return;
  }

  if (currentId === null) {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, content: content }),
    });
    const created = await response.json();
    currentId = created.id;
  } else {
    await fetch("/api/notes/" + currentId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, content: content }),
    });
  }

  await loadNotes();
}

async function handleDelete() {
  if (currentId === null) {
    return;
  }

  await fetch("/api/notes/" + currentId, { method: "DELETE" });
  clearForm();
  await loadNotes();
}

newButton.addEventListener("click", clearForm);
noteForm.addEventListener("submit", handleSave);
deleteButton.addEventListener("click", handleDelete);

deleteButton.disabled = true;
loadNotes();
