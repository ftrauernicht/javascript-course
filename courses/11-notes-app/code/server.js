const express = require("express");
const path = require("path");
const notes = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/notes", (req, res) => {
  res.json(notes.getAllNotes());
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.getNote(req.params.id);

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  res.json(note);
});

app.post("/api/notes", (req, res) => {
  const title = (req.body.title || "").trim();

  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }

  const note = notes.createNote(title, req.body.content || "");
  res.status(201).json(note);
});

app.patch("/api/notes/:id", (req, res) => {
  const existing = notes.getNote(req.params.id);

  if (!existing) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  const title = req.body.title !== undefined ? req.body.title.trim() : existing.title;
  const content = req.body.content !== undefined ? req.body.content : existing.content;
  const updated = notes.updateNote(req.params.id, title, content);
  res.json(updated);
});

app.delete("/api/notes/:id", (req, res) => {
  const existing = notes.getNote(req.params.id);

  if (!existing) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  notes.deleteNote(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log("Notes app listening on http://localhost:" + PORT);
});
