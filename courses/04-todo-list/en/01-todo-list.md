🇬🇧 English | 🇩🇪 [Deutsch](../de/01-to-do-liste.md)

[← Back to course overview](../../../README.md) · Related: [Course 3 – Calculator GUI](../../03-calculator-gui/en/01-calculator-gui.md) (not required: if you've done it, the DOM parts below will feel familiar)

# Chapter 1 – To-Do List

**Goal:** build a to-do list you can add tasks to, check off, and remove.
It should also remember your list the next time you open the page. This
course assumes [Course 1 – Basics](../../01-basics/en/00-introduction.md)
only (values, variables, operators, brackets, functions, conditionals,
loops) and nothing else; it stands entirely on its own.

The finished reference files live in
[`courses/04-todo-list/code/`](../code/): `index.html`, `style.css`,
`script.js`. `index.html` and `style.css` are ready to use as they are.
`script.js` is the actual exercise: copy all three files into your own
working folder, empty out your copy of `script.js`, and build it back up as
the chapter goes. The `script.js` in `code/` is the finished answer to
compare against.

Here's the finished result you're working towards:

![The to-do list with an empty input and no tasks yet](../assets/empty.png)

## 🟢 Core — The layout (HTML + CSS)

The whole app is an input box, an "Add" button, and an empty list to fill
in later:

```html
<div class="app">
  <h1>To-Do List</h1>

  <div class="add-row">
    <input type="text" id="task-input" placeholder="What needs doing?" autocomplete="off" />
    <button id="add-button">Add</button>
  </div>

  <ul id="task-list"></ul>
</div>
```

`<ul id="task-list"></ul>` starts empty on purpose. JavaScript fills it in
based on your data, which is the whole point of this chapter. See the full
version in [`index.html`](../code/index.html) and
[`style.css`](../code/style.css); the styling isn't the focus here, so feel
free to just skim it.

## 🟢 Core — Representing tasks as data

Before touching the page, decide what a "task" actually *is* in code. Each
one needs two pieces of information: its text, and whether it's done. That's
a job for an **object literal**, a different use of `{}` than the one from
[Course 1](../../01-basics/en/01-programming-basics.md): there, `{}` wrapped
a *block* of statements; here, `{}` wraps `key: value` pairs and produces a
*value* you can store in a variable, just like an array does:

```js
const task = { text: "Buy milk", done: false };
task.text; // "Buy milk"
task.done; // false
```

The whole list is an array of these:

```js
let tasks = [
  { text: "Buy milk", done: false },
  { text: "Walk the dog", done: true },
];
```

More: [MDN – Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects).

From here on, everything goes into `script.js`, the file `index.html`
actually loads. Start it with:

```js
const input = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const list = document.getElementById("task-list");

let tasks = [];
```

## 🟢 Core — The DOM, in short

*(If you've done [Course 3 – Calculator GUI](../../03-calculator-gui/en/01-calculator-gui.md), all of this will be familiar. Skip ahead to the next section.)*

JavaScript doesn't see your HTML tags directly. It sees the **DOM**
(Document Object Model), the browser's live, in-memory representation of
the page. A handful of tools let you find elements and attach behavior to
them, and this whole chapter only needs four of them:

- [`document.getElementById(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
  finds one element by its `id`: that's what the three lines above just
  did, storing the input box, the button, and the list container in
  variables.
- [`document.querySelectorAll(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
  finds *every* matching element for a CSS-style selector, as a list you
  can loop over. It's used below to find every checkbox or every remove
  button at once, however many tasks there currently are.
- [`.forEach(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  runs a function once for every item in a list. It pairs naturally with
  `querySelectorAll`'s list of elements: one call per element, instead of
  writing out one line per button by hand.
- [`addEventListener("click", ...)`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  (or `"change"`, further down) says "run this function whenever this
  event happens on this element." The function you pass in (`() => { ... }`)
  is an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions),
  a shorter way to write a small function, especially one you're only
  using once, right here.

## 🟢 Core — Rendering the list from data

This is the core trick of the whole chapter: instead of writing HTML for
each task by hand, you write one function that turns *whatever is currently
in `tasks`* into HTML, and call it every time the data changes.

```js
function render() {
  list.innerHTML = tasks
    .map((task, index) => {
      const doneClass = task.done ? "task done" : "task";
      const checkedAttribute = task.done ? "checked" : "";
      return `
        <li class="${doneClass}">
          <input type="checkbox" data-index="${index}" ${checkedAttribute} />
          <span>${task.text}</span>
          <button class="remove" data-index="${index}">&times;</button>
        </li>
      `;
    })
    .join("");
}
```

A few new pieces here:

- `` `...${doneClass}...` `` is a
  [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):
  backticks instead of quotes let you drop a variable straight into a
  string with `${...}`, which is much easier to read than gluing pieces
  together with `+`.
- [`.map(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  builds a *new* array by running a function on every item of an existing
  one. Here, it turns each task object into one HTML string. The second
  argument to the function you pass in, `index`, is the item's position
  (0, 1, 2, ...). You'll use it in a moment to tell tasks apart.
- `.join("")` glues that array of strings into one single string, ready to
  hand to `innerHTML`.
- `data-index="${index}"` stores each task's position directly on its
  HTML, the same
  [custom data attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes)
  idea from Course 3. It's how the click handlers below will know *which*
  task they belong to.

Call `render()` once at the very end of `script.js` (after everything else
in this chapter) so the page shows something as soon as it loads, even if
`tasks` starts out empty.

## 🟢 Core — Adding a task

```js
function addTask() {
  const text = input.value.trim();
  if (text === "") {
    return;
  }

  tasks.push({ text: text, done: false });
  input.value = "";
  render();
}

addButton.addEventListener("click", addTask);
```

- `input.value` reads whatever's currently typed into the text box.
- [`.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
  removes any leading/trailing whitespace. That way a task made of just
  spaces doesn't sneak through as "empty but not really."
- [`.push(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
  adds a new item to the end of the `tasks` array.
- Setting `input.value = ""` clears the box after adding, ready for the
  next task.

Save, reload `index.html`, type something, and click **Add**: the new task
appears (though it can't be checked off or removed yet; that's next).

## 🟢 Core — Checking off and removing a task

Every time `render()` runs, it throws away the old HTML and builds fresh
HTML, which means any click listener attached to the *previous* checkboxes
and buttons is gone too. The fix: re-attach listeners to the *current* ones
at the end of every `render()` call:

```js
function render() {
  list.innerHTML = tasks
    .map((task, index) => {
      const doneClass = task.done ? "task done" : "task";
      const checkedAttribute = task.done ? "checked" : "";
      return `
        <li class="${doneClass}">
          <input type="checkbox" data-index="${index}" ${checkedAttribute} />
          <span>${task.text}</span>
          <button class="remove" data-index="${index}">&times;</button>
        </li>
      `;
    })
    .join("");

  list.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const index = Number(checkbox.dataset.index);
      tasks[index].done = checkbox.checked;
      render();
    });
  });

  list.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      tasks.splice(index, 1);
      render();
    });
  });
}
```

- `checkbox.dataset.index` reads the `data-index` attribute back out (as a
  string, which is why it's wrapped in `Number(...)`, same pattern as
  reading a calculator button's digit in Course 3).
- The checkbox's [`"change"`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
  event fires when it's ticked or unticked; `checkbox.checked` is then
  either `true` or `false`.
- [`.splice(index, 1)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  removes exactly one item at `index` from the array, shifting everything
  after it back by one. This is also why re-rendering (rather than trying
  to patch one element) is the simplest approach here: after a removal,
  every later task's index changes, and a fresh render always uses
  whatever the array currently looks like.

Re-render always calls this same function, so both the checkbox handler and
the remove handler above end with `render()`, not with hand-editing one
`<li>`.

## 🟢 Core — Remembering the list: `localStorage`

Everything so far disappears the moment you reload the page: `tasks` is
just a variable, living only in memory. The browser's
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
is a small, built-in key-value store that survives reloads and closing the
tab. It only stores strings, though, so an array of objects needs
converting first:

```js
const STORAGE_KEY = "todo-list-tasks";

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}
```

- [`JSON.stringify(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
  turns a JavaScript value into a text representation of it (JSON,
  "JavaScript Object Notation"); [`JSON.parse(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
  does the reverse, turning that text back into a real array/object.
- `saved ? JSON.parse(saved) : []`, the ternary from Course 1: if there's
  nothing saved yet (`saved` is `null`, which is falsy), start with an
  empty array instead of trying to parse nothing.

Now use these two: replace `let tasks = [];` near the top with
`let tasks = loadTasks();`, and add `saveTasks();` right before every
`render()` call (in `addTask`, in the checkbox handler, and in the remove
handler). Every change gets written to `localStorage` immediately, and the
very first thing the page does is read whatever was saved last time.

Reload `index.html`, add a couple of tasks, check one off, then reload
again: everything is exactly how you left it.

## 🟡 Optional — Add on Enter, not just on click

```js
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
```

Same `keydown` pattern as Course 3's optional keyboard section: one more
event listener, calling the same `addTask` function you already wrote.

## 🟡 Optional — A "done" counter

Show how many tasks are left, e.g. "2 of 5 done":

```js
function updateCounter() {
  const doneCount = tasks.filter((task) => task.done).length;
  counterElement.textContent = doneCount + " of " + tasks.length + " done";
}
```

[`.filter(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
builds a new array containing only the items where the function returns
`true` (here, only the done tasks), and `.length` counts them. Call
`updateCounter()` at the end of `render()`, and add a
`<p id="counter"></p>` to `index.html` for it to write into.

## 🔴 Optional, genuine challenge — Filtering (All / Active / Completed)

Add three buttons ("All", "Active", "Completed") along with a variable
tracking which one is selected. In `render()`, before mapping `tasks` to
HTML, build a *filtered* array first (using `.filter(...)` from above)
based on the current selection, and map over that instead of over `tasks`
directly. Everything else about rendering, checking off, and removing stays
exactly the same, since it's really the same array of task objects
underneath, just a different slice of it being shown.

## Try it yourself

Add a few tasks, check some off, remove one, and reload the page.
Everything should still be there:

![The to-do list with three tasks, one checked off](../assets/populated.png)

Open [`courses/04-todo-list/code/index.html`](../code/index.html) in your
browser: double-clicking the file works fine, since everything is local
with no external requests.

## Checkpoint & what you learned

- Object literals (`{ key: value }`), a second, distinct use of `{}` next to blocks
- Arrays of objects, as a way to model a list of "things with properties"
- Rendering data as HTML: template literals, `.map(...)`, `.join("")`
- Re-attaching event listeners after every re-render, rather than patching individual elements
- `.push(...)`, `.splice(...)`, `.filter(...)`, `.trim()`
- Persisting state with `localStorage`, `JSON.stringify`/`JSON.parse`

## What's next

This course stands on its own. For a broader menu of what to build next,
see [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md).
