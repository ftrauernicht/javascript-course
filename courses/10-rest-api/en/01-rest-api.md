🇬🇧 English | 🇩🇪 [Deutsch](../de/01-rest-api.md)

[← Back to course overview](../../../README.md) · Related: [Course 4 – To-Do List](../../04-todo-list/en/01-todo-list.md) (not required — this course rebuilds the same kind of data, tasks with a done flag, as a server instead of a browser page)

# Chapter 1 – A REST API with Node.js + Express

**Goal:** build a small server that stores a list of tasks and lets other
programs read, add, change, and delete them over HTTP — the first course
where your JavaScript runs outside a browser entirely, in a terminal, as
its own program. This course assumes
[Course 1 – Basics](../../01-basics/en/00-introduction.md) only (values,
variables, operators, brackets, functions, conditionals, loops) and
nothing else; it stands entirely on its own. There's no HTML, CSS, or DOM
anywhere in this chapter.

The finished reference files live in
[`courses/10-rest-api/code/`](../code/): `package.json` and `server.js`.
`server.js` is the actual exercise: copy `package.json` into your own
working folder, install its dependency, empty out your copy of
`server.js`, and build it back up one piece at a time. As in
[Course 5](../../05-unit-converter/en/01-unit-converter.md) through
[Course 9](../../09-budget-tracker/en/01-budget-tracker.md), the
trickiest parts are left for you to assemble from described steps, not
handed to you fully written.

## Before you start: install Node.js

Every course so far only needed a browser. This one needs
[Node.js](https://nodejs.org/) installed on your computer — it lets
JavaScript run as a standalone program, not just inside a browser tab.
Download the **LTS** version for your operating system, install it, then
confirm it worked in a terminal (Command Prompt, PowerShell, or your
editor's built-in terminal):

```
node --version
npm --version
```

Both should print a version number. [npm](https://www.npmjs.com/) (Node
Package Manager) comes bundled with Node.js — it's what downloads and
manages libraries other people have published, like the one this chapter
uses.

## 🟢 Core — HTTP, in short

*(If you've built a web page before and looked at your browser's Network
tab, some of this will already be familiar.)*

A REST API is a server that other programs talk to over
[HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) — the same
protocol your browser uses to load every page. Every request has:

- A **method** describing the kind of action: `GET` (read data, never
  changes anything), `POST` (create something new), `PATCH` (change part
  of something existing), `DELETE` (remove something).
- A **path**, like `/tasks` or `/tasks/7` — which resource the request is
  about.
- Sometimes a **body** — data sent along with the request, usually JSON,
  used by `POST` and `PATCH` to say *what* to create or change.

Every response has a **status code** — a 3-digit number summarizing what
happened: `200 OK` (success), `201 Created` (a `POST` succeeded), `204 No
Content` (success, nothing to send back — typical for `DELETE`), `400 Bad
Request` (the request itself was invalid), `404 Not Found` (no such
resource). A **REST API** is simply a server organized around this
method-plus-path pattern: `GET /tasks` reads every task, `GET /tasks/7`
reads task 7, `POST /tasks` creates a task, and so on — the "REST" part is
a set of widely-used conventions, not a technology you install.

## 🟢 Core — Setting up the project

In a new, empty folder, `package.json` describes the project and its
dependencies:

```json
{
  "name": "tasks-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

[Express](https://expressjs.com/) is a small, extremely widely-used
library that handles the HTTP details (parsing requests, matching a path
to the right code, sending responses) so you can focus on what each route
should do. With `package.json` in place, this downloads Express itself
into a new `node_modules` folder:

```
npm install
```

`node_modules` can get large and is never committed to a repository — a
project's `.gitignore` excludes it, since `package.json` is enough for
anyone else to recreate it with the same command.

## 🟢 Core — Hello, Express

Create `server.js` and start with a server that does nothing but answer:

```js
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json([]);
});

app.listen(PORT, () => {
  console.log("Tasks API listening on http://localhost:" + PORT);
});
```

Run it with `node server.js` (or `npm start`, using the `"start"` script
from `package.json`). The terminal prints the message from `app.listen`
and then just sits there — that's correct, a server's job is to keep
running and wait for requests, not to finish. `Ctrl+C` in that terminal
stops it.

A few new pieces:

- [`require("express")`](https://nodejs.org/api/modules.html#requireid)
  is Node's way of loading a library — the CommonJS equivalent of
  `<script src="...">`, just for code instead of the browser.
- `express()` creates the app; `app.get(path, handler)` registers a
  function to run for `GET` requests matching `path`. `req` (the incoming
  request) and `res` (the tools to answer it) are provided automatically.
- `res.json(...)` sends its argument back as a JSON response — the server
  equivalent of `JSON.stringify(...)`, handled for you.
- `app.use(express.json())` tells Express to automatically parse a JSON
  request body into `req.body` for every route below it — without this
  line, `req.body` would be `undefined` even when a request sends JSON.
- `app.listen(PORT, callback)` starts the server listening for real
  network connections on that port, then runs `callback` once it's ready.

With the server running, open a **second** terminal (the first one is
busy running the server) and try:

```
curl http://localhost:3000/tasks
```

You should see `[]` — the empty array `res.json([])` sent back.
[`curl`](https://curl.se/) is a command-line tool for making HTTP
requests directly, without a browser; it comes preinstalled on macOS and
Linux, and on Windows 10/11. A GUI tool like
[Postman](https://www.postman.com/) or Insomnia works the same way, if
you'd rather click than type.

## 🟢 Core — In-memory data and reading it

Real APIs store data in a database; this one keeps everything in a plain
array in memory, so it resets every time the server restarts — simple on
purpose, so the focus stays on HTTP itself. Replace the empty-array route
above with:

```js
const crypto = require("crypto");

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
```

- [`crypto.randomUUID()`](https://nodejs.org/api/crypto.html#cryptorandomuuid)
  is built into Node and generates a unique id string every time it's
  called. Earlier browser courses used an item's position in the array as
  its identity (`data-index`) — that stops working once items can be
  created and deleted out of order on a server other programs are also
  talking to, so tasks get their own permanent `id` instead, independent
  of array position.
- `:id` in `"/tasks/:id"` is a **route parameter** — a placeholder that
  matches anything in that position of the path (`/tasks/abc-123` makes
  `req.params.id` equal `"abc-123"`). `.find(...)` (the same array method
  from earlier courses) locates the matching task.
- `res.status(404).json(...)` sets the response's status code before
  sending its body — without an explicit `.status(...)` call, Express
  defaults to `200`, which would be a lie for "not found."

Restart the server (`Ctrl+C`, then `node server.js` again) and try both:

```
curl http://localhost:3000/tasks
curl http://localhost:3000/tasks/<paste-a-real-id-from-the-line-above>
```

## 🟢 Core — Creating a task

Your turn. `app.post("/tasks", (req, res) => { ... })` should:

1. Read `req.body.text`. If it's missing, or empty after
   [`.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim),
   respond with `res.status(400).json({ error: "text is required" })` and
   `return`.
2. Otherwise, build a new task object — `{ id: crypto.randomUUID(), text:
   <the trimmed text>, done: false }` — and `.push(...)` it onto `tasks`.
3. Respond with `res.status(201).json(newTask)` — `201 Created`, with the
   new task (including its generated `id`) in the body, so whoever sent
   the request knows what id to use next.

```js
app.post("/tasks", (req, res) => {
  // your code here — the three steps above
});
```

Test it (the second terminal, server still running in the first):

```
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"text\":\"Write the chapter\"}"
```

`-X POST` sets the method, `-H` adds the header telling the server the
body is JSON (that's what `express.json()` looks for), and `-d` is the
body itself. You should get back a `201` response with your new task,
`id` included — and `curl http://localhost:3000/tasks` afterward should
show it in the full list.

## 🟢 Core — Updating a task

`app.patch("/tasks/:id", (req, res) => { ... })`, using the same
lookup as `GET /tasks/:id` above:

1. Find the task by `req.params.id`, the same way `GET /tasks/:id` does.
   If there's no match, respond `404` the same way and `return`.
2. If `req.body.text` isn't `undefined`, set `task.text` to it. If
   `req.body.done` isn't `undefined`, set `task.done` to it. (Checking
   for `undefined` rather than just truthiness matters here — `done:
   false` is a valid value to set, and a falsy check would silently
   ignore it.)
3. Respond with `res.json(task)` — the updated task, status `200` by
   default.

```js
app.patch("/tasks/:id", (req, res) => {
  // your code here — the three steps above
});
```

`PATCH` (change *part* of something) is deliberately different from `PUT`
(replace the whole thing) — this handler only touches the fields the
request actually sent, which is why both checks are against `undefined`
specifically. Test marking a task done:

```
curl -X PATCH http://localhost:3000/tasks/<id> -H "Content-Type: application/json" -d "{\"done\":true}"
```

## 🟢 Core — Deleting a task

This one's given to you — same lookup pattern a third time, nothing new:

```js
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  tasks.splice(index, 1);
  res.status(204).end();
});
```

[`.findIndex(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
is `.find(...)`'s sibling — it returns the matching item's position (or
`-1` if nothing matched) instead of the item itself, which `.splice(...)`
needs to remove it. `res.status(204).end()` sends a response with no body
at all — `204 No Content` means "it worked, there's nothing to tell you,"
so there's nothing to `.json(...)`.

Test it, then confirm with a `GET` that it's really gone (a `404` this
time):

```
curl -X DELETE http://localhost:3000/tasks/<id>
curl http://localhost:3000/tasks/<id>
```

## 🟡 Optional — Filter by status

Add support for `GET /tasks?done=true` (and `?done=false`) returning only
matching tasks, full list unfiltered when the query string is absent.
Inside the existing `GET /tasks` handler, `req.query.done` holds the
query string's `done` value as a **string** (`"true"` or `"false"`, never
a real boolean) when present, `undefined` when it isn't — filter `tasks`
with `.filter(...)` accordingly before calling `res.json(...)`.

## 🔴 Optional, genuine challenge — Save tasks to a file

Right now, stopping the server loses every task. Using Node's built-in
[`fs`](https://nodejs.org/api/fs.html) module
(`const fs = require("fs");`), write `tasks` to a `tasks.json` file after
every change that modifies it (`fs.writeFileSync("tasks.json",
JSON.stringify(tasks))`), and load it back at startup instead of the
hardcoded two-task array (`fs.existsSync("tasks.json")` to check whether
the file exists yet, then `JSON.parse(fs.readFileSync("tasks.json",
"utf-8"))` to read it). This is the same "turn data into text to store
it, parse it back on the way in" idea as `localStorage` in earlier
courses — just a real file on disk instead of the browser's storage, and
the reason a genuinely serious app reaches for an actual database
instead, which is exactly where [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md)'s
next idea goes.

## Checkpoint & what you learned

- Running JavaScript as a standalone program with Node.js, outside any
  browser
- `npm` and `package.json` to declare and install a dependency
- HTTP methods, paths, status codes, and JSON bodies — the vocabulary any
  REST API is built from
- Express: `app.get`/`.post`/`.patch`/`.delete`, route parameters
  (`:id`), `req.body`, `req.params`, and `res.status(...).json(...)`
- Testing an API directly with `curl`, without any browser or UI involved
- Why a server-managed list needs stable ids (`crypto.randomUUID()`)
  instead of array position

## What's next

This course stands on its own. For a broader menu of what to build next
— including connecting a frontend to a server exactly like this one, with
a real database behind it — see [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md).
