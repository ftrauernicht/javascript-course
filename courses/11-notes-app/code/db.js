const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("notes.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL
  )
`);

function getAllNotes() {
  return db.prepare("SELECT * FROM notes ORDER BY updated_at DESC").all();
}

function getNote(id) {
  return db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
}

function createNote(title, content) {
  const updatedAt = new Date().toISOString();
  const result = db
    .prepare("INSERT INTO notes (title, content, updated_at) VALUES (?, ?, ?)")
    .run(title, content, updatedAt);
  return getNote(result.lastInsertRowid);
}

function updateNote(id, title, content) {
  const updatedAt = new Date().toISOString();
  db.prepare("UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?").run(
    title,
    content,
    updatedAt,
    id
  );
  return getNote(id);
}

function deleteNote(id) {
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
}

module.exports = { getAllNotes, getNote, createNote, updateNote, deleteNote };
