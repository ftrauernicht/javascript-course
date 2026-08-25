🇬🇧 English | 🇩🇪 [Deutsch](README.de.md)

# Training – Trainee JavaScript

A beginner-friendly, project-based JavaScript course, written to teach the
fundamentals of software development to colleagues, aspiring trainees
(Azubis), and anyone else who wants to get started. It's built to be handed
over as-is: send someone the link to this repository, and everything they
need to begin is right here. No prior programming experience is assumed on
their part. Every chapter builds on the one before it, and every chapter has
an optional "go further" path for anyone who wants more of a challenge.

This course exists **in German and English side by side**: every chapter is
written as two separate files with the same content, so pick whichever
language you read more comfortably — and switch any time. Code and code
comments, however, are always written in English. That is a deliberate choice
and a real-world convention: professional codebases are written in English
regardless of which language the team speaks, so it is worth getting used to
from the very first line.

<img src="courses/03-calculator-gui/assets/empty.png" alt="The GUI calculator built in Course 3" width="240" />

*The calculator you'll build in Course 3 — starting from nothing but
programming basics in Course 1.*

## Get this course onto your computer

**Option A — no tools required, if you're just starting out:**

1. Go to <https://github.com/ftrauernicht/training-trainee-javascript>.
2. Click the green **Code** button → **Download ZIP**.
3. Extract the downloaded ZIP file anywhere on your computer (right-click it
   → *Extract All* on Windows, or double-click it on Mac).
4. Open the extracted folder. You now have every file this course needs.

**Option B — with [Git](https://git-scm.com/), if you already have it installed:**

```
git clone https://github.com/ftrauernicht/training-trainee-javascript.git
```

Either way, nothing here needs installing, building, or a server to run.
Course 1 lives entirely in the browser console (no files at all). Course 2
is the same — typed directly into the console (an optional challenge near
the end has you paste in one reference file). Course 3's calculator runs by
simply double-clicking its `index.html`. Start reading at
[Course 1 – Basics, Chapter 0](courses/01-basics/en/00-introduction.md).

## What you need before you start

Nothing to install for Course 1 — just a computer and a modern browser.

| Tool | Why you need it | Link |
|---|---|---|
| A browser | To open the developer console, our first "code editor" | [Google Chrome](https://www.google.com/chrome/), [Mozilla Firefox](https://www.mozilla.org/firefox/) |
| A text editor | For Course 3 (the GUI calculator), to write HTML/CSS/JS files | [Visual Studio Code](https://code.visualstudio.com/) |

Step-by-step setup instructions (including how to open the console) are in
[Course 1 – Basics, Chapter 0](courses/01-basics/en/00-introduction.md).

## Courses

This repository is meant to hold more than one course over time. Each one
gets its own number under `courses/`, in the order it was written, so a
future Course 4 lands at `courses/04-.../` alongside these three without
disturbing them.

Course 1 is the shared foundation every later course assumes. Courses 2 and
3 are two **independent, standalone** projects — the same calculator idea,
solved two different ways. Neither requires the other; pick whichever
sounds more interesting, or do both and compare.

### Course 1 – Basics (`courses/01-basics/`)

Not tied to any one project — the shared vocabulary every later course
assumes.

| # | Chapter | What you'll learn |
|---|---|---|
| 0 | [Introduction & Tools](courses/01-basics/en/00-introduction.md) | The browser console, a text editor, how this course is structured |
| 1 | [Programming Basics](courses/01-basics/en/01-programming-basics.md) | Values, variables, operators, the three kinds of brackets, functions, conditionals, loops |

### Course 2 – Calculator Console (`courses/02-calculator-console/`)

Assumes Course 1 only. A calculator built entirely in the browser console —
no files, no interface.

| # | Chapter | What you'll learn |
|---|---|---|
| 1 | [Calculator in the console](courses/02-calculator-console/en/01-calculator-console.md) | Putting Course 1's building blocks into one real program — plus an optional bracket-expression parser |

### Course 3 – Calculator GUI (`courses/03-calculator-gui/`)

Assumes Course 1 only (not Course 2). The same idea, with a real, clickable
interface.

| # | Chapter | What you'll learn |
|---|---|---|
| 1 | [Calculator with a GUI](courses/03-calculator-gui/en/01-calculator-gui.md) | HTML/CSS/JS basics, the DOM, events, and a gentle first step into OOP (classes) |

More courses will be added over time; this section grows with them.

## Project ideas

Once you've finished Courses 2 and 3, [PROJECT-IDEAS.md](PROJECT-IDEAS.md)
has a ranked list of what to build next — from a straightforward next step
to a genuinely ambitious one. It lives at the repository root, not inside a
single course, because any of these ideas could become this repository's
Course 4.

## How to use this course

1. Read a chapter top to bottom.
2. Type the examples yourself instead of copy-pasting them — typing is what
   builds the muscle memory, copy-pasting only builds a scrollbar.
3. Every chapter has a **core section** (🟢, required to move on) and one or
   more **optional sections** (🟡 solid extra practice, 🔴 a genuine
   challenge). Skipping the optional parts is completely fine — come back to
   them later if you like.
4. Within a course, later chapters explicitly reuse code from earlier ones.
   Across courses, nothing is assumed except Course 1 — Courses 2 and 3
   each build their own version of the calculation logic from scratch, on
   purpose, so either can be done first.
5. Links inside each chapter point to the relevant [MDN Web Docs](https://developer.mozilla.org/)
   page (the standard JavaScript reference) right where a new concept shows
   up, instead of collecting them in a glossary at the end. If a term is
   unclear, the nearest link is your glossary.

## Repository layout

```
PROJECT-IDEAS.md / .de.md   ideas for what a future course could be
courses/
  01-basics/                 Course 1 — general, not tied to one project
    en/                        chapter text, English
    de/                        chapter text, German (Kapiteltexte, Deutsch)
  02-calculator-console/     Course 2 — calculator, in the console
    en/                        chapter text, English
    de/                        chapter text, German
    code/                      reference solutions (calculate.js, bracket-parser.js)
  03-calculator-gui/         Course 3 — calculator, with a GUI
    en/                        chapter text, English
    de/                        chapter text, German
    code/                      the working GUI calculator (index.html, style.css, script.js)
    assets/                    screenshots used in the chapter
  04-.../                    future courses, same pattern
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
