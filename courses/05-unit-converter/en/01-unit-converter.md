🇬🇧 English | 🇩🇪 [Deutsch](../de/01-einheitenumrechner.md)

[← Back to course overview](../../../README.md) · Related: [Course 3 – Calculator GUI](../../03-calculator-gui/en/01-calculator-gui.md), [Course 4 – To-Do List](../../04-todo-list/en/01-todo-list.md) (neither required — if you've done either, the DOM parts below will feel familiar)

# Chapter 1 – Unit Converter

**Goal:** build a page that converts a number from one unit to another —
meters to kilometers, kilograms to pounds, degrees Celsius to Fahrenheit.
This course assumes [Course 1 – Basics](../../01-basics/en/00-introduction.md)
only (values, variables, operators, brackets, functions, conditionals,
loops) and nothing else; it stands entirely on its own.

The finished reference files live in
[`courses/05-unit-converter/code/`](../code/): `index.html`, `style.css`,
`script.js`. `index.html` and `style.css` are ready to use as they are —
they already include everything this chapter builds, including the
optional parts further down. `script.js` is the actual exercise: copy all
three files into your own working folder, empty out your copy of
`script.js`, and build it back up one piece at a time as the chapter goes.
This chapter gives you less finished code than earlier ones did, on
purpose — the point is to work out the logic yourself once you've got the
pieces you need, not to retype something you're handed.

Here's the finished result you're working towards:

![The unit converter, ready to convert 1 meter into kilometers](../assets/empty.png)

## 🟢 Core — The layout (HTML + CSS)

```html
<div class="app">
  <h1>Unit Converter</h1>

  <div class="convert-row">
    <input type="number" id="value-input" value="1" />
    <select id="from-select"></select>
    <span class="arrow">&rarr;</span>
    <select id="to-select"></select>
  </div>

  <button id="convert-button">Convert</button>

  <p id="result"></p>
</div>
```

Both `<select>` elements start empty on purpose — JavaScript fills them
with units in a moment. See the full version in
[`index.html`](../code/index.html) and [`style.css`](../code/style.css);
the styling isn't the focus here, so feel free to just skim it. (The full
file also has a `<select id="category-select">` above this markup — ignore
it for now, it's part of the optional section further down.)

From here on, everything goes into `script.js` — that's the file
`index.html` actually loads. Start it with:

```js
const fromSelect = document.getElementById("from-select");
const toSelect = document.getElementById("to-select");
const valueInput = document.getElementById("value-input");
const convertButton = document.getElementById("convert-button");
const result = document.getElementById("result");
```

## 🟢 Core — The DOM, in short

*(If you've done Course 3 or Course 4, all of this will be familiar — skip ahead to the next section.)*

JavaScript doesn't see your HTML tags directly — it sees the **DOM**
(Document Object Model), the browser's live, in-memory representation of
the page. A handful of tools let you find elements, read what's in them,
and attach behavior to them:

- [`document.getElementById(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
  finds one element by its `id` — that's what the five lines above just
  did.
- Reading `.value` on an input or a `<select>` gives you whatever the user
  currently typed or picked, always as a string — even for
  `<input type="number">`, which is why converting it with `Number(...)`
  further down matters.
- [`addEventListener("click", ...)`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  says "run this function whenever this event happens on this element."
  The function you pass in (`() => { ... }`) is an
  [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) —
  a shorter way to write a small function, especially one you're only
  using once, right here.

## 🟢 Core — Representing conversions as data

A unit converter needs to know, for every unit, how it relates to every
*other* unit in its category. Writing a separate calculation for every
possible pair (meters→kilometers, kilometers→meters, meters→miles, ...)
would mean dozens of near-identical functions. There's a much smaller way:
pick one **base unit** and record how many of it each unit is worth. For
length, meters make a natural base unit:

```js
const lengthFactors = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.34,
  ft: 0.3048,
};
```

Read this as "1 km equals 1000 m," "1 cm equals 0.01 m," and so on. This is
the same object-literal idea as [Course 4](../../04-todo-list/en/01-todo-list.md)'s
`{ key: value }` pairs (not required — the idea is short enough to repeat
here): a pair of curly braces holding `key: value` pairs and producing a
*value* you can store in a variable, unlike the `{}` that wraps a block of
statements in [Course 1](../../01-basics/en/01-programming-basics.md).
Here every key is a unit name and every value is a plain number instead of
something more complex.

More: [MDN – Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects).

## 🟢 Core — Filling the dropdowns from data

Rather than hand-writing `<option>m</option>`, `<option>km</option>`, and
so on in the HTML, build them from `lengthFactors` — add a new unit to the
object later, and it shows up in the dropdowns automatically:

```js
function createOption(unit) {
  const option = document.createElement("option");
  option.value = unit;
  option.textContent = unit;
  return option;
}

function populateUnitSelects() {
  const unitNames = Object.keys(lengthFactors);

  unitNames.forEach((unit) => {
    fromSelect.appendChild(createOption(unit));
    toSelect.appendChild(createOption(unit));
  });
}

populateUnitSelects();
```

New pieces here:

- [`Object.keys(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  returns an object's keys as an array — for `lengthFactors`, that's
  `["m", "km", "cm", "mm", "mi", "ft"]`.
- [`.forEach(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  runs a function once for every item in an array — here, once per unit
  name, instead of writing one line per unit by hand.
- [`document.createElement(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
  builds a brand-new element that doesn't exist on the page yet, entirely
  in memory. Setting its `.value` and `.textContent` fills it in, and
  [`.appendChild(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
  is what actually places it into the page, inside the element you call it
  on. This is a different technique from the template-literal
  `innerHTML` strings Course 4 used — both build HTML from data, just with
  different tools.
- The call to `populateUnitSelects()` at the bottom runs it once,
  immediately, so the page has real options in it as soon as it loads.

Save, reload `index.html`, and both dropdowns should list every length
unit.

## 🟢 Core — Doing the conversion

This is the part earlier courses would hand you fully written — this time,
you're building it from the pieces above. Converting a value from one
length unit to another is a two-step calculation:

1. Turn the input value into meters (the base unit), by multiplying it by
   `lengthFactors[fromUnit]`.
2. Turn that meter value into the target unit, by dividing it by
   `lengthFactors[toUnit]`.

For example, converting 5 km to m: `5 * lengthFactors["km"]` gives 5000 (m),
then `5000 / lengthFactors["m"]` gives 5000 (m) again, since meters are the
base unit. Converting 5000 m to km instead: `5000 * lengthFactors["m"]`
gives 5000 (still meters), then `5000 / lengthFactors["km"]` gives 5.

Write a function that does this:

```js
function convert() {
  const value = Number(valueInput.value);
  const fromUnit = fromSelect.value;
  const toUnit = toSelect.value;

  // your code here: compute `converted` using the two steps above

  result.textContent =
    value + " " + fromUnit + " = " + converted.toFixed(2) + " " + toUnit;
}

convertButton.addEventListener("click", convert);
```

[`.toFixed(2)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
rounds a number to 2 decimal places and returns it as a string — without
it, a conversion like 1 mi to km would print a long, ugly decimal instead
of `1.61`.

Save, reload `index.html`, type a value, pick two units, and click
**Convert**. If the result looks wrong, check the two-step math above
again — it's easy to swap a multiplication and a division by accident. If
you get stuck, `convertLinear` in [`code/script.js`](../code/script.js)
shows one way to write it (there, it's generalized to take the lookup
table as a fourth argument — more on why in the next section).

## 🟡 Optional — More than one category

Right now this only converts length. Extend it to weight too, using
exactly the same idea:

1. Write your own `weightFactors` object, the same shape as
   `lengthFactors` — pick kilograms as the base unit (`kg: 1`), then add
   `g`, `lb`, `oz` with how many kilograms each one is worth. (A quick
   search for "1 pound in kg" gets you the numbers.)
2. Notice that the conversion function you wrote above doesn't actually
   contain anything *length-specific* — it only cares which lookup table
   to read from. Generalize it into `convertLinear(value, fromUnit,
   toUnit, factors)`, taking the table as a fourth argument, so the exact
   same function serves both categories.
3. Add the category dropdown from the full `index.html` (`<select
   id="category-select">`, with `length` and `weight` as `<option>`s) to
   your own copy, and a `categories` object mapping each category name to
   its factors object:
   ```js
   const categories = {
     length: lengthFactors,
     weight: weightFactors,
   };
   ```
4. Update `populateUnitSelects` to read `categorySelect.value`, look up
   the right factors object in `categories`, and clear out the dropdowns
   (`fromSelect.innerHTML = ""; toSelect.innerHTML = "";`) before rebuilding
   them — otherwise switching categories just piles new options on top of
   the old ones.
5. Listen for the category dropdown changing, and repopulate when it does:
   `categorySelect.addEventListener("change", populateUnitSelects);`

Compare against [`code/script.js`](../code/script.js) once it works, or if
you get stuck on any one step.

## 🔴 Optional, genuine challenge — Temperature

Temperature doesn't fit the lookup-table pattern above at all. 1°C is not
"worth" some fixed number of °F the way 1 km is worth a fixed number of m
— going from Celsius to Fahrenheit involves both multiplying *and* adding
an offset (0°C is 32°F, not 0°F). A single `factors` table can't capture
that, so this needs its own function with its own formulas:

- Celsius to Fahrenheit: `celsius * (9 / 5) + 32`
- Fahrenheit to Celsius: `(fahrenheit - 32) * (5 / 9)`
- Celsius to Kelvin: `celsius + 273.15`
- Kelvin to Celsius: `kelvin - 273.15`

A clean way to support all three units (C, F, K) without writing six
separate formulas: convert *into* Celsius first, however the input is
labeled, then convert *out of* Celsius into whatever the target is —
exactly the "convert to a common base, then convert out" idea from the
core section, just with a formula standing in for the base-unit division.
Write `convertTemperature(value, fromUnit, toUnit)` yourself, then wire it
into `convert()` so temperature uses it while length and weight keep using
`convertLinear`. `courses/05-unit-converter/code/script.js` has one working
version if you want to check your approach afterward.

## Try it yourself

Convert 5 meters into kilometers — you should get 0.01:

![The result showing 5 m converts to 0.01 km](../assets/result.png)

Open [`courses/05-unit-converter/code/index.html`](../code/index.html) in
your browser — double-clicking the file works fine, since everything is
local with no external requests.

## Checkpoint & what you learned

- The lookup-table pattern: picking a base unit and recording every other
  unit's ratio to it, instead of writing one function per pair of units
- Building HTML elements from data with `document.createElement` and
  `.appendChild`, as an alternative to the `innerHTML` template-string
  approach
- `Object.keys(...)`, `.forEach(...)`, `Number(...)`, `.toFixed(...)`
- Generalizing a function by turning something it assumed (which lookup
  table to use) into a parameter instead
- Why a linear, ratio-based conversion (length, weight) and an
  offset-based one (temperature) need genuinely different code

## What's next

This course stands on its own. For a broader menu of what to build next,
see [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md).
