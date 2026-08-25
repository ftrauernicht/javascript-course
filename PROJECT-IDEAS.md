🇬🇧 English | 🇩🇪 [Deutsch](PROJECT-IDEAS.de.md)

[← Back to repository overview](README.md) · Comes after: [Course 2 – Calculator Console](courses/02-calculator-console/en/01-calculator-console.md), [Course 3 – Calculator GUI](courses/03-calculator-gui/en/01-calculator-gui.md), [Course 4 – To-Do List](courses/04-todo-list/en/01-todo-list.md), and [Course 5 – Unit Converter](courses/05-unit-converter/en/01-unit-converter.md)

# Ideas for your next projects

Courses 2 through 5 (the calculator, twice over, a to-do list, and a unit
converter) cover the fundamentals in depth — variables, functions, the DOM,
rendering data as HTML, a first step into OOP. What comes after is up to you: here's a ranked
list of project ideas, roughly ordered from "straightforward next step" to
"genuinely ambitious," each with the main new skills it would teach you.
Pick whichever sounds the most fun; motivation matters more than following
the order exactly. Any of these could become this repository's Course 6 —
or just your own side project.

| # | Project | New skills on top of what you know | Difficulty |
|---|---|---|---|
| 1 | ~~To-do list~~ — add, remove, and check off tasks on a page | ✅ Built — see [Course 4 – To-Do List](courses/04-todo-list/en/01-todo-list.md) | ⭐ |
| 2 | ~~Unit converter~~ — length, weight, temperature | ✅ Built — see [Course 5 – Unit Converter](courses/05-unit-converter/en/01-unit-converter.md) | ⭐ |
| 3 | **Multiple-choice quiz** — questions, scoring, a result screen | Arrays of objects, a `Question` class, conditional rendering | ⭐⭐ |
| 4 | **Memory / matching game** — flip cards, match pairs | Game state, [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout), CSS transitions/animations | ⭐⭐ |
| 5 | **Weather app** — real weather for a city you type in | [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch), `async`/`await`, working with a public API and real JSON, handling network errors | ⭐⭐⭐ |
| 6 | **Budget tracker** — income/expenses, running totals, categories | Array methods (`filter`, `map`, `reduce`), more advanced persistence, a first simple chart | ⭐⭐⭐ |
| 7 | **A small REST API with Node.js + Express** — your own tiny server | [Node.js](https://nodejs.org/), npm, [Express](https://expressjs.com/), running JavaScript outside the browser for the first time | ⭐⭐⭐⭐ |
| 8 | **Full-stack notes app** — your Idea-5-style frontend talking to your own Idea-7-style backend, storing notes in a real database | Connecting frontend and backend, a database (e.g. SQLite), full CRUD (create/read/update/delete) | ⭐⭐⭐⭐ |
| 9 | **Rebuild something in a frontend framework** (React or Vue) — e.g. redo the to-do list or the calculator | Component-based thinking, framework-managed state, a build toolchain | ⭐⭐⭐⭐ |
| 10 | **A small real-time multiplayer game** — e.g. live Tic-Tac-Toe against another person | [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), real-time communication, basic game architecture | ⭐⭐⭐⭐⭐ |

A few notes on how to read this list:

- Ideas 3–4 need nothing beyond what Courses 2 through 5 already taught you
  — same tools, new shapes of problem.
- Idea 5 is the natural point to leave "everything happens instantly in my
  own code" behind and start dealing with the outside world (networks are
  slow and sometimes fail — that's a skill in itself).
- Ideas 7–8 are where JavaScript stops being "only a browser language" —
  the same language, running on a server.
- Idea 9 is deliberately *after* you've built a few things by hand: frameworks
  make the most sense once you've felt the problems they solve.

Whichever you pick, the same habits from Courses 2 through 5 still apply: build the
core version first, keep it simple, and only reach for the optional,
harder version of a feature once the basic one works.
