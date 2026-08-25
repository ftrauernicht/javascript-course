🇬🇧 English | 🇩🇪 [Deutsch](CONTRIBUTING.de.md)

# Contributing to JavaScript Course

This is a personal, solo-maintained project.

- Issues and pull requests are welcome.
- Keep pull requests small and focused -- easier to review, easier to revert.
- No contributor licence agreement is required.
- Response times vary; this isn't maintained on a fixed schedule.

## Adding a new course

This repository is meant to grow. If you're adding a new course -- by
hand, or with AI assistance -- the existing courses follow conventions
that aren't obvious from any single file; they only show up once you
compare several courses side by side. They're written down here so a new
contributor, or a fresh AI session with no memory of earlier work, can
follow them without reverse-engineering them first.

**Structure**
- Each course is a new folder `courses/NN-name/`, numbered in the order
  it was written. Update the "Courses" table and the repository-layout
  tree in `README.md`/`README.de.md`, and the intro/nav text in
  `PROJECT-IDEAS.md`/`PROJECT-IDEAS.de.md`, whenever you add one.
- Every course beyond Course 1 assumes **only** Course 1
  (`courses/01-basics/`) -- never another sibling course. If a course
  needs a concept Course 1 doesn't teach (classes, the DOM, array
  methods, `setTimeout`, ...), explain it inline, briefly, with a note
  like "(if you've done Course 3/4/..., skip ahead)" for readers who
  already know it -- don't assume it's already known.
- Chapters live in parallel `en/` and `de/` folders with identical
  content and structure, not one bilingual file. Code and code comments
  are always English. Cross-language links point to the matching MDN
  locale (`/en-US/` vs `/de/`).
- Every chapter uses the same three-level system, introduced once in
  Course 1 Chapter 0 and not re-explained elsewhere: 🟢 Core (required),
  🟡 Optional (more practice), 🔴 Optional (a genuine challenge).
- A course with runnable code gets a `code/` folder (the finished
  reference -- safe to run as-is) and an `assets/` folder for screenshots
  referenced from the chapter text.

**Before publishing a new chapter, check for these recurring mistakes**
(found by walking earlier courses as a total beginner and actually
running every snippet):
- Cross-references to "Course N" or "Chapter N" go stale silently when
  content is renumbered or split -- grep for both the singular *and*
  plural form ("Course 3", "Courses 3 and 4"), in both languages.
- A promise to explain something "later" must actually be delivered, or
  reworded to be honest about not covering it.
- A course claiming to need only Course 1 must be checked against Course
  1's *actual* contents, not the intended ones -- re-verify after Course 1
  itself changes.
- Every code snippet, especially in optional sections, should be run
  standalone before publishing, not just read for plausibility.
- Restate "where does this code go" at every point that could be
  ambiguous, not just once at the top of a chapter.

**How much code to show**: earlier courses (1-4) mostly hand you
complete, working functions to type in. Starting with Course 5, chapters
give you the new building blocks (a DOM API, a syntax feature, a
technique) fully explained, but leave the core logic of the exercise --
the part that's actually the point of the chapter -- described in steps
for you to assemble yourself, with the finished version only in
`code/script.js` as an answer key. Prefer this style for new courses: the
goal is for learners to think and build, not just retype.

**Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/)
(`feat: add Course 11 - ...`, `fix: ...`, `docs: ...`). A new course is
typically one `feat:` commit covering the chapter text, code, assets, and
the README/PROJECT-IDEAS updates together.
