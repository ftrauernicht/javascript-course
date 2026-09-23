🇬🇧 English | 🇩🇪 [Deutsch](../de/01-programmier-grundlagen.md)

[← Back to course overview](../../../README.md) · Previous: [Chapter 0 – Introduction & Tools](00-introduction.md) · Next: [Course 2](../../02-calculator-console/en/01-calculator-console.md) or [Course 3](../../03-calculator-gui/en/01-calculator-gui.md) →

# Chapter 1 – Programming Basics

**Goal:** before building anything, get a map of the small set of building
blocks that almost every programming language shares: values, variables,
operators, the three kinds of brackets, functions, decisions, and
repetition. Chapter 0 showed you *how* to type into the console; this
chapter is about *what* you're allowed to type. Nothing here is throwaway.
Course 2 and Course 3 each use every single one of these to build a
calculator.

Keep the console from [Chapter 0](00-introduction.md) open and try things as
you go.

## 🟢 Core — Values and their types

A **value** is a single piece of data. The three kinds you'll use constantly:

```js
42          // a number
"hello"     // a string (text) — single or double quotes both work
true        // a boolean — only ever true or false
```

JavaScript can tell you a value's type on demand with the
[`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
operator, a handy thing to poke at while you're getting a feel for this:

```js
typeof 42        // "number"
typeof "hello"    // "string"
typeof true      // "boolean"
```

There are a few more types: arrays and objects are the big ones. This
course doesn't cover them in depth; you'll pick up just enough array
know-how, explained inline, wherever a later course actually needs it
(Course 3 does). Full list: [MDN – Data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures).

## 🟢 Core — Variables: naming a value

A variable is a named box you can put a value into and read back later:

```js
let age = 16;
const name = "Alex";
```

Use [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
for a value that may change later, and
[`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
for one that shouldn't be reassigned. (You may also spot `var` in older code
or tutorials: it's the original way to declare a variable, kept around for
backwards compatibility, with some genuinely confusing quirks `let` and
`const` were invented to fix. There's no reason to reach for it today; more:
[MDN – var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).)

A variable name must start with a letter, `$`, or `_`, is case-sensitive
(`age` and `Age` are different variables), and by convention is written in
`camelCase`: lowercase first word, capitalize the start of every word after
that (`firstName`, `totalScore`).

## 🟢 Core — Operators: doing things with values

You've already used the arithmetic ones
(`+` `-` `*` `/` `%` `**`, see
[MDN – Arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators)).
Three more families matter just as much:

**Assignment**: `=` stores a value; the others are shorthand for "take the
current value, do something to it, store it back":

```js
let score = 10;
score += 5;  // same as: score = score + 5;  → 15
score *= 2;  // same as: score = score * 2;  → 30
```

**Comparison**: asking a true/false question about two values:

```js
5 === 5    // true  (strict equality: same value AND same type)
5 === "5"  // false (a number is never the same type as a string)
5 !== 3    // true  (not equal)
5 < 10     // true
5 >= 5     // true
```

Use `===` and `!==`, not `==` and `!=`. The two-equals-sign versions try to
convert the values to match before comparing (`5 == "5"` is `true`!), which
causes more confusing bugs than it saves keystrokes. This course uses strict
equality everywhere, on purpose. Details:
[MDN – Equality comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness).

**Logical**: combining or inverting true/false values:

```js
true && false   // false ("and" — both sides must be true)
true || false   // true  ("or" — at least one side must be true)
!true           // false ("not" — flips it)
```

Full reference: [MDN – Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators).

**Ternary (conditional)**: a compact, one-line if/else that produces a
*value* instead of running a block:

```js
const age = 16;
const label = age >= 18 ? "adult" : "minor";
// label is "adult" if age >= 18, otherwise "minor"
```

Read `condition ? valueIfTrue : valueIfFalse` left to right. It's most
useful for short either/or choices like this one; for anything longer, a
full `if`/`else` (below) reads more clearly. More:
[MDN – Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator).

## 🟢 Core — The three kinds of brackets

Beginners mix these up constantly, so it's worth learning them as three
distinct tools rather than "squiggly lines":

**Parentheses `()`** have two jobs. Grouping, to control order of
evaluation exactly like in math:

```js
(2 + 3) * 4  // 20, not 14
```

...and calling a function, or listing what it accepts:

```js
console.log("hi");           // calling console.log with one value
function add(a, b) { ... }   // a and b are listed inside parentheses
```

**Curly braces `{}`** mark a **block**: a group of statements bundled
together that run as one unit. You'll see them around a function's body, an
`if`'s body, and a loop's body (all coming up in this same chapter). A block
is a container, not a value by itself. More:
[MDN – Block statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block).

**Square brackets `[]`** are for arrays (ordered lists of values) and for
reading one item out by its position:

```js
const colors = ["red", "green", "blue"];
colors[0]; // "red" — counting starts at 0, not 1
```

Same deal as with the other types: you'll get just enough, explained
inline, wherever a later course actually needs it (Course 3 does). For
now, just recognize the shape when you see it. More:
[MDN – Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections).

## 🟢 Core — Functions: naming a piece of behavior

You'll build these properly, hands-on, in Course 2 or Course 3; for now,
just the shape, so nothing looks unfamiliar later:

```js
function add(a, b) {
  return a + b;
}

add(3, 4); // 7
```

`a` and `b` are **parameters**: placeholders for whatever values get passed
in when the function is called. `return` sends a value back out to whoever
called the function. More: [MDN – Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

## 🟢 Core — Making decisions: if / else

```js
const temperature = 8;

if (temperature < 10) {
  console.log("Wear a jacket.");
} else if (temperature < 20) {
  console.log("A light sweater will do.");
} else {
  console.log("Shorts weather!");
}
```

JavaScript checks the conditions top to bottom and runs the block belonging
to the first one that's `true`; the rest are skipped entirely. `else` (and
`else if`) are both optional. More:
[MDN – if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else).

## 🟢 Core — Repeating yourself: loops

A **loop** runs the same block of code multiple times. The
[`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
loop is the workhorse when you know roughly how many times you want to
repeat something:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// 1
// 2
// 3
// 4
// 5
```

Its three parts, separated by semicolons: **start** (`let i = 1`, runs
once, before anything else), **condition** (`i <= 5`, checked before every
run; the loop stops the moment this is `false`), and **step** (`i++`, runs
after every iteration). `i++` is shorthand for `i = i + 1`; details:
[MDN – Increment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment).

[`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
is the simpler sibling, for when you don't know the exact count up front;
it just keeps going as long as its condition stays true:

```js
let count = 0;
while (count < 3) {
  console.log("Hello!");
  count++;
}
```

**Try it yourself:** write a `for` loop that prints the numbers 1 through
10. Then write one that prints only the even numbers, using `%` to check
"is this number divisible by 2?".

## 🟡 Optional — Comments

```js
// a single-line comment
/* a
   multi-line
   comment */
```

The computer ignores comments entirely; they're notes for humans reading
the code, including future-you. Good practice (and this course's own rule)
is to comment the *why*, not the *what*: if the code already says what it
does, a comment repeating that just adds noise. More:
[MDN – Comments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#comments).

## 🟡 Optional — Truthy and falsy

Inside an `if`'s condition, JavaScript will accept *any* value, not just
`true`/`false`; it automatically treats some values as standing in for
`false` ("falsy"): `0`, `""` (empty string), `null`, `undefined`, and `NaN`
(short for "Not a Number", what you get back from an invalid math
operation, e.g. `0 / 0`). Everything else is "truthy". This mostly stays
invisible until it surprises you once. Worth knowing it exists. More:
[MDN – Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy),
[MDN – Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).

## 🔴 Optional, genuine challenge — FizzBuzz

A small, famous exercise that exercises loops, conditionals, and the
modulo operator (`%`) together, a solid capstone before moving on to
Course 2 or Course 3:

> Loop through the numbers 1 to 15. For each one: print `"Fizz"` if it's
> divisible by 3, `"Buzz"` if it's divisible by 5, `"FizzBuzz"` if it's
> divisible by both, otherwise print the number itself.

Try it yourself before peeking; you have every tool you need from this
chapter alone (a `for` loop, `if`/`else if`/`else`, and `%`). A hint, if you
want one: check "divisible by both" *before* checking either one alone, or
the more specific case never gets a chance to run.

## What you learned

- Values and their types (`number`, `string`, `boolean`), and `typeof`
- Variables (`let`, `const`)
- Operators: arithmetic, assignment, comparison (`===` over `==`), logical, ternary
- The three brackets: `()` grouping/calling, `{}` blocks, `[]` arrays
- Functions, by shape (parameters, `return`)
- Conditionals (`if`/`else if`/`else`)
- Loops (`for`, `while`)
- *(optional)* Comments, truthy/falsy

## Next

This was Course 1's last chapter. Every other course in this repository
builds only on this one. None of them requires any of the others, so
pick whichever sounds more interesting:

- [Course 2 – Calculator Console](../../02-calculator-console/en/01-calculator-console.md): a calculator, entirely in the browser console.
- [Course 3 – Calculator GUI](../../03-calculator-gui/en/01-calculator-gui.md): the same idea, with a real, clickable interface.
- [Course 4 – To-Do List](../../04-todo-list/en/01-todo-list.md): add, check off, and remove tasks, saved between visits.
- [Course 5 – Unit Converter](../../05-unit-converter/en/01-unit-converter.md): convert length, weight, and temperature.
- [Course 6 – Quiz](../../06-quiz/en/01-quiz.md): a multiple-choice quiz with scoring.
- [Course 7 – Memory Game](../../07-memory-game/en/01-memory-game.md): a card-matching memory game.
- [Course 8 – Weather App](../../08-weather-app/en/01-weather-app.md): real, live weather for any city you type in.
- [Course 9 – Budget Tracker](../../09-budget-tracker/en/01-budget-tracker.md): income and expenses with a category chart.
- [Course 10 – REST API](../../10-rest-api/en/01-rest-api.md): a small server built with Node.js and Express.
- [Course 11 – Full-Stack Notes App](../../11-notes-app/en/01-notes-app.md): a frontend and backend talking to each other over a real database.

Whichever you pick, every one of these building blocks becomes part of one
real program.
