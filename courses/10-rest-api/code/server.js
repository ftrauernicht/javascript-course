const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: crypto.randomUUID(), text: "Learn Express", done: false },
  { id: crypto.randomUUID(), text: "Build a REST API", done: false },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const text = req.body.text;

  if (!text || text.trim() === "") {
    res.status(400).json({ error: "text is required" });
    return;
  }

  const newTask = { id: crypto.randomUUID(), text: text.trim(), done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  if (req.body.text !== undefined) {
    task.text = req.body.text;
  }
  if (req.body.done !== undefined) {
    task.done = req.body.done;
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  tasks.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log("Tasks API listening on http://localhost:" + PORT);
});
