🇬🇧 English | 🇩🇪 [Deutsch](../de/01-taschenrechner-konsole.md)

[← Back to course overview](../../../README.md) · Previous: [Course 1 – Basics](../../01-basics/en/01-programming-basics.md)

# Chapter 1 – Calculator in the console

**Goal:** build a calculator that can add, subtract, multiply, and divide:
first by typing raw expressions, then by writing your own reusable function.
Everything in this chapter happens in the browser console from
[Course 1 – Basics](../../01-basics/en/00-introduction.md).

## 🟢 Core — Doing math directly

The console understands arithmetic exactly like a calculator does. Try each
of these, one at a time:

```js
3 + 4
10 - 2
6 * 7
20 / 4
7 % 2   // remainder / modulo: what's left over after dividing 7 by 2 → 1
2 ** 8  // exponent: 2 to the power of 8 → 256
```

JavaScript respects the same order of operations you learned in school
(multiplication and division before addition and subtraction), so
`3 + 4 * 2` correctly gives `11`, not `14`. Full list of operators:
[MDN – Arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators).

## 🟢 Core — Variables: storing numbers with names

A **variable** is a named box you can put a value into and read back later.

```js
let a = 5;
let b = 3;
let result = a + b;
console.log(result); // 8
```

Use `let` for a value that may change later, and
[`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
for one that shouldn't be reassigned, e.g. `const pi = 3.14159;`. Details on
`let`: [MDN – let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).

**Try it yourself:** store two numbers in variables and compute their
product and their remainder.

## 🟢 Core — Functions: a machine you can reuse

Typing `3 + 4` works, but it only ever does that one calculation. A
**function** is a small, reusable machine: you give it inputs
(*parameters*), it gives you an output (*return value*).

```js
function add(a, b) {
  return a + b;
}

add(3, 4); // 7
add(10, 20); // 30
```

Reference: [MDN – Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

Now `add` gets generalized into a real calculator function that takes an
*operator* as well, and decides what to do based on it. This needs a
conditional: a way for code to choose between paths. The cleanest tool for
"pick one of several exact matches" is
[`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
(an [`if`/`else` chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
would work too; there is often more than one correct way to write
something):

```js
function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      console.warn(`Unknown operator: "${operator}"`);
      return undefined;
  }
}

calculate(3, "+", 4);  // 7
calculate(10, "/", 2); // 5
calculate(6, "?", 2);  // logs a warning, returns undefined
```

The `` `Unknown operator: "${operator}"` `` syntax is a
[template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):
backticks instead of quotes let you drop a variable straight into a string
with `${...}`.

**Try it yourself:** call `calculate` with all four operators and a few
different numbers. Then extend the `switch` with two more cases: `"%"` for
remainder and `"**"` for exponent.

## 🟡 Optional — Handling division by zero gracefully

Dividing by zero doesn't crash JavaScript: `10 / 0` quietly gives you
`Infinity` (and `0 / 0` gives
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN),
"Not a Number"). That's rarely what a calculator's user actually wants. Add a
guard clause to the `"/"` case:

```js
case "/":
  if (b === 0) {
    console.warn("Cannot divide by zero.");
    return undefined;
  }
  return a / b;
```

Reference: [MDN – Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity).

## 🔴 Optional, genuine challenge — Calculating with parentheses

`calculate` handles exactly one operation between two numbers. A real
expression like `"(3 + 4) * 2"` has more than one operation *and* parentheses
that override the normal order of operations. `calculate` alone can't
evaluate that as a whole. Making it work is a small, proper parsing problem,
and a great first taste of what "parsing" even means.

The idea, in two steps:

1. **Tokenize:** turn the string `"(3 + 4) * 2"` into a flat list of
   pieces: `["(", "3", "+", "4", ")", "*", "2"]`. This just walks through
   the string character by character, grouping digits together and treating
   `(`, `)`, `+`, `-`, `*`, `/` as their own pieces.
2. **Parse:** read that list of tokens and compute a result, while
   respecting both parentheses and the fact that `*`/`/` bind tighter than
   `+`/`-`. The classic, elegant way to do this is a **recursive descent
   parser**: one function per "level" of precedence, where each level calls
   the next one down and (for parentheses) calls all the way back up to
   the top. Background reading:
   [Wikipedia – Recursive descent parser](https://en.wikipedia.org/wiki/Recursive_descent_parser),
   [MDN – Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion).

A full, commented reference solution lives in
[`courses/02-calculator-console/code/bracket-parser.js`](../code/bracket-parser.js).
Open it, read it slowly, and try tracing through `evaluateExpression("(3 + 4) * 2")`
by hand, one function call at a time, before you run it. Once loaded into
the console:

```js
evaluateExpression("(3 + 4) * 2"); // 14
evaluateExpression("2 + 3 * 4");   // 14
evaluateExpression("(2 + 3) * (4 - 1)"); // 15
```

This is meant to be hard. It's the first genuinely "programmer-shaped"
problem in this course, not just a longer version of what came before. It
isn't required to finish the course, so if it doesn't click yet, that's
completely fine; come back to it whenever you like. (One tempting shortcut
is JavaScript's built-in
[`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval),
which really would evaluate a string like this. It's mentioned here only so
you know it exists: using `eval` on anything but a string you fully trust
is a well-known security risk, and writing your own tiny parser teaches you
far more anyway.)

## What you learned

- Doing arithmetic directly, and how JavaScript orders operations
- Variables (`let`, `const`)
- Functions: parameters, return values, reusability
- Conditionals (`switch`, `if`/`else`)
- Template literals
- *(optional)* Tokenizing and recursively parsing a small expression language

## Next

This course stands on its own. You've built a complete calculator. If
you'd like to see the same kind of problem solved with a real, clickable
interface instead of the console,
[Course 3 – Calculator GUI](../../03-calculator-gui/en/01-calculator-gui.md)
covers exactly that; it doesn't require this course either, so start
wherever sounds more interesting. For a broader menu of what to build next,
see [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md).
