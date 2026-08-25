🇬🇧 English | 🇩🇪 [Deutsch](../de/00-einleitung.md)

[← Back to course overview](../../../README.md) · Next: [Chapter 1 – Programming Basics](01-programming-basics.md) →

# Chapter 0 – Introduction & Tools

## What is JavaScript, and why start in the console?

JavaScript is the programming language built into every web browser. It is
what makes web pages *do* things — react to clicks, update text, validate a
form — instead of just sitting there like a printed page. You can read more
about it on [MDN's "What is JavaScript?"](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript) page.

Every browser also ships a **developer console**: a place where you can type
JavaScript and see it run immediately, with no files, no installation, and no
setup. That instant feedback loop — type something, see the result — is the
best way to learn a language's basic building blocks, which is why this whole
first chapter happens there.

## Opening the console

- **Chrome / Edge:** press `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J`
  (Mac). Or: right-click anywhere on a page → *Inspect* → tab *Console*.
  Details: [Chrome DevTools – Open the Console](https://developer.chrome.com/docs/devtools/console/)
- **Firefox:** press `Ctrl+Shift+K` (Windows/Linux) or `Cmd+Option+K` (Mac).
  Details: [Firefox DevTools – Web Console](https://firefox-source-docs.mozilla.org/devtools-user/web_console/)

Open it now, on any page (this one included, if you're reading it on
GitHub). You should see an empty panel with a blinking cursor, ready for
input.

## Your very first line of JavaScript

Click into the console and type:

```js
1 + 1
```

Press <kbd>Enter</kbd>. You should see `2`. That's it — you just ran your
first program.

Try one more thing:

```js
console.log("Hello, world!");
```

`console.log(...)` is how JavaScript prints something out on purpose (rather
than just showing the result of the last line, like `1 + 1` did above). You
will use it constantly to see what your code is doing — think of it as
JavaScript's way of saying something back to you. Reference:
[MDN – console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static).

A quick note on the semicolon (`;`) at the end of that line: JavaScript
mostly works fine without them, but writing them is the common convention and
avoids a handful of confusing edge cases later on. This course uses them
consistently — feel free to do the same.

## A text editor, for later

This course (Course 1 – Basics) stays entirely in the console — no editor
needed yet. Course 3 – Calculator GUI will have you writing actual files
(HTML, CSS, JavaScript), and for that you'll want a proper text editor
rather than the console. (Course 2 – Calculator Console stays in the
console too, just like this one.)
[Visual Studio Code](https://code.visualstudio.com/) is free, works on
Windows/Mac/Linux, and is the most widely used editor for web development —
install it whenever you like, there's no rush yet.

## How this course is structured

Every chapter follows the same shape:

- 🟢 **Core** — the required part. Finish this before moving to the next
  chapter.
- 🟡 **Optional, more practice** — reinforces the same chapter's ideas with a
  bit more depth. Good to do, not required.
- 🔴 **Optional, genuine challenge** — a harder stretch goal, sometimes
  introducing a concept ahead of schedule. It's fine if this doesn't click
  the first time; you can always come back after a later chapter.

Chapters build on each other on purpose, and so do courses: everything in
this one is meant to be assumed knowledge for every course that follows.
Courses 2 and 3, for example, each pick up immediately where this one leaves
off — independently of each other. Keep whatever you write around; you'll
want it again.

One more thing about language: this course is written in German and English
as separate, parallel files — pick whichever you're more comfortable
reading. The **code itself and its comments are always in English**, which
mirrors how real software teams work regardless of their spoken language.
Links to further reading (mostly [MDN Web Docs](https://developer.mozilla.org/),
the standard JavaScript reference) sit inline in the text, right where a new
term first appears, instead of being collected into a glossary at the end.

## Ready?

Continue to [Chapter 1 – Programming Basics](01-programming-basics.md).
