🇬🇧 English | 🇩🇪 [Deutsch](PROJECT-IDEAS.de.md)

[← Back to repository overview](README.md) · Comes after: [Course 2 – Calculator Console](courses/02-calculator-console/en/01-calculator-console.md), [Course 3 – Calculator GUI](courses/03-calculator-gui/en/01-calculator-gui.md), [Course 4 – To-Do List](courses/04-todo-list/en/01-todo-list.md), [Course 5 – Unit Converter](courses/05-unit-converter/en/01-unit-converter.md), [Course 6 – Quiz](courses/06-quiz/en/01-quiz.md), [Course 7 – Memory Game](courses/07-memory-game/en/01-memory-game.md), [Course 8 – Weather App](courses/08-weather-app/en/01-weather-app.md), [Course 9 – Budget Tracker](courses/09-budget-tracker/en/01-budget-tracker.md), [Course 10 – REST API](courses/10-rest-api/en/01-rest-api.md), and [Course 11 – Full-Stack Notes App](courses/11-notes-app/en/01-notes-app.md)

# Ideas for your next projects

Courses 2 through 11 (the calculator, twice over, a to-do list, a unit
converter, a quiz, a memory game, a weather app, a budget tracker, a
REST API, and a full-stack notes app) cover the fundamentals in depth —
variables, functions, the DOM, rendering data as HTML, a first step into
OOP, talking to a real API, running JavaScript outside the browser, and
connecting a frontend to a database-backed server. What comes after is
up to you: here's a ranked list of project ideas, roughly ordered from
"straightforward next step" to "genuinely ambitious," each with the main
new skills it would teach you. Pick whichever sounds the most fun;
motivation matters more than following the order exactly. Any of these
could become this repository's Course 12 — or just your own side
project.

| # | Project | New skills on top of what you know | Difficulty |
|---|---|---|---|
| 1 | ~~To-do list~~ — add, remove, and check off tasks on a page | ✅ Built — see [Course 4 – To-Do List](courses/04-todo-list/en/01-todo-list.md) | ⭐ |
| 2 | ~~Unit converter~~ — length, weight, temperature | ✅ Built — see [Course 5 – Unit Converter](courses/05-unit-converter/en/01-unit-converter.md) | ⭐ |
| 3 | ~~Multiple-choice quiz~~ — questions, scoring, a result screen | ✅ Built — see [Course 6 – Quiz](courses/06-quiz/en/01-quiz.md) | ⭐⭐ |
| 4 | ~~Memory / matching game~~ — flip cards, match pairs | ✅ Built — see [Course 7 – Memory Game](courses/07-memory-game/en/01-memory-game.md) | ⭐⭐ |
| 5 | ~~Weather app~~ — real weather for a city you type in | ✅ Built — see [Course 8 – Weather App](courses/08-weather-app/en/01-weather-app.md) | ⭐⭐⭐ |
| 6 | ~~Budget tracker~~ — income/expenses, running totals, categories | ✅ Built — see [Course 9 – Budget Tracker](courses/09-budget-tracker/en/01-budget-tracker.md) | ⭐⭐⭐ |
| 7 | ~~A small REST API with Node.js + Express~~ — your own tiny server | ✅ Built — see [Course 10 – REST API](courses/10-rest-api/en/01-rest-api.md) | ⭐⭐⭐⭐ |
| 8 | ~~Full-stack notes app~~ — a frontend talking to your own backend, storing notes in a real database | ✅ Built — see [Course 11 – Full-Stack Notes App](courses/11-notes-app/en/01-notes-app.md) | ⭐⭐⭐⭐ |
| 9 | **Rebuild the to-do list in Vue** — the same add/toggle/remove app, now framework-managed | Vue 3 (Composition API), Vite, `ref()`/reactive state, a parent/child component split (props down, events up), `v-for`/`v-if` templating | ⭐⭐⭐⭐ |
| 10 | **Live Tic-Tac-Toe** — two players in separate browser tabs (or on separate computers), matched automatically and kept in sync by a server that owns the actual game state | The browser's native [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) API, a Node WebSocket server with [`ws`](https://www.npmjs.com/package/ws), a small client-server message protocol, server-authoritative game state | ⭐⭐⭐⭐⭐ |

A few notes on how to read this list:

- Ideas 2–4 needed nothing beyond what each earlier course already taught
  — same tools, new shapes of problem. From here on, the ideas below
  introduce genuinely new territory.
- Idea 5 is the natural point to leave "everything happens instantly in my
  own code" behind and start dealing with the outside world (networks are
  slow and sometimes fail — that's a skill in itself).
- Ideas 7–8 are where JavaScript stops being "only a browser language" —
  the same language, running on a server, finally connected back to a
  frontend over a real database instead of memory or `localStorage`.
- Idea 9 is deliberately *after* you've built a few things by hand: frameworks
  make the most sense once you've felt the problems they solve. It picks
  Vue over React specifically for the learning curve: Vue's template
  syntax stays close to the HTML/CSS/JS you already know, where React's
  JSX is a bigger conceptual jump — and it rebuilds the to-do list rather
  than the calculator because the to-do list's manual
  "wipe the HTML and re-render everything by hand" dance is exactly what
  a framework's reactivity replaces. (React still has the bigger job
  market if that matters more to you than the gentler ramp.)
- Idea 10 sticks with Tic-Tac-Toe on purpose — its rules need no
  explaining, so the whole difficulty budget goes toward the actual
  lesson: the server holds the one true board and decides whose turn it
  is, a client only ever *proposes* a move, and the server validates,
  applies, and broadcasts the result to both players. It uses the raw
  `ws` library and the browser's built-in `WebSocket`, not Socket.io — a
  match only ever needs two connected sockets, so Socket.io's
  rooms/namespaces/reconnection machinery would be overhead without a
  real payoff here.

Whichever you pick, the same habits from Courses 2 through 11 still apply: build the
core version first, keep it simple, and only reach for the optional,
harder version of a feature once the basic one works.
