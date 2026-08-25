🇬🇧 English | 🇩🇪 [Deutsch](../de/01-budget-tracker.md)

[← Back to course overview](../../../README.md) · Related: [Course 4 – To-Do List](../../04-todo-list/en/01-todo-list.md), [Course 8 – Weather App](../../08-weather-app/en/01-weather-app.md) (neither required — the storage pattern below reuses Course 4's approach, rebuilt from scratch)

# Chapter 1 – Budget Tracker

**Goal:** build a small app that tracks income and expenses, shows your
current balance, and breaks down spending by category with a simple
bar chart — built entirely from array methods, no charting library
involved. This course assumes
[Course 1 – Basics](../../01-basics/en/00-introduction.md) only (values,
variables, operators, brackets, functions, conditionals, loops) and
nothing else; it stands entirely on its own.

The finished reference files live in
[`courses/09-budget-tracker/code/`](../code/): `index.html`, `style.css`,
`script.js`. `index.html` and `style.css` are ready to use as they are.
`script.js` is the actual exercise: copy all three files into your own
working folder, empty out your copy of `script.js`, and build it back up
one piece at a time. As in [Course 5](../../05-unit-converter/en/01-unit-converter.md),
[Course 6](../../06-quiz/en/01-quiz.md), [Course 7](../../07-memory-game/en/01-memory-game.md),
and [Course 8](../../08-weather-app/en/01-weather-app.md), the trickiest
parts are left for you to assemble from described steps, not handed to
you fully written.

Here's the finished result you're working towards:

![The budget tracker with no entries yet](../assets/empty.png)

## 🟢 Core — The layout (HTML + CSS)

```html
<div class="app">
  <h1>Budget Tracker</h1>

  <div id="summary">
    <span>Balance</span>
    <span id="balance">$0.00</span>
  </div>

  <form id="entry-form">
    <input type="text" id="description-input" placeholder="Description" autocomplete="off" required />
    <input type="number" id="amount-input" placeholder="Amount" step="0.01" min="0" required />
    <select id="type-input">
      <option value="expense">Expense</option>
      <option value="income">Income</option>
    </select>
    <select id="category-input">
      <option value="Food">Food</option>
      <option value="Rent">Rent</option>
      <option value="Transport">Transport</option>
      <option value="Fun">Fun</option>
      <option value="Other">Other</option>
    </select>
    <button type="submit">Add</button>
  </form>

  <ul id="entry-list"></ul>

  <h2>Spending by category</h2>
  <div id="chart"></div>
</div>
```

`#entry-list` and `#chart` start empty — JavaScript fills both from the
same underlying data, the same "leave a container empty in HTML, fill it
from JavaScript" approach as every list or grid in earlier courses. See
the full version in [`index.html`](../code/index.html) and
[`style.css`](../code/style.css); the CSS is a plain card layout, nothing
new.

From here on, everything goes into `script.js` — that's the file
`index.html` actually loads. Start it with:

```js
const STORAGE_KEY = "budget-tracker-entries";

const balanceText = document.getElementById("balance");
const entryForm = document.getElementById("entry-form");
const descriptionInput = document.getElementById("description-input");
const amountInput = document.getElementById("amount-input");
const typeInput = document.getElementById("type-input");
const categoryInput = document.getElementById("category-input");
const entryList = document.getElementById("entry-list");
const chart = document.getElementById("chart");
```

## 🟢 Core — The DOM and storage, in short

*(If you've done Course 3, 4, 5, 6, 7, or 8, most of this will be
familiar — skip ahead to the next section.)*

- [`document.getElementById(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
  finds one element by its `id`.
- [`addEventListener("submit", ...)`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  with [`event.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
  (see [Course 8](../../08-weather-app/en/01-weather-app.md) if this is
  new) handles the "Add" form without reloading the page.
- `.value` reads whatever's typed into an `<input>` or chosen in a
  `<select>`; [`Number(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  converts the amount field's text into an actual number to do math with.
- `.innerHTML` replaces everything inside an element with new HTML, and
  [`.map(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  building an HTML string per item, then
  [`.join("")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  to glue them together, is exactly the rendering pattern
  [Course 4](../../04-todo-list/en/01-todo-list.md) introduced.
- [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  is the browser's persistent, key-value storage — data saved there
  survives closing the tab or the whole browser. It only stores text, so
  saving anything else needs
  [`JSON.stringify(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
  on the way in and
  [`JSON.parse(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
  on the way out — the same round trip Course 4 used for its tasks.

These two are given to you, unchanged from that same Course 4 pattern:

```js
function loadEntries() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

let entries = loadEntries();
```

Each entry is a plain object: `{ description: "Groceries", amount: 150,
type: "expense", category: "Food" }` — the object-literal pattern from
earlier courses, one object per row you'll see on screen.

## 🟢 Core — Array methods that compute a single answer

Every rendering function so far has used `.map(...)`: turn each array
item into something, keep the same number of items. This chapter needs
two different shapes:

**[`.filter(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)**
keeps only the items a function approves of, and throws the rest away —
the result is a shorter array (or an equally long one, or empty),
never a transformed version of every item:

```js
const numbers = [1, 2, 3, 4, 5, 6];
const even = numbers.filter((n) => n % 2 === 0);
console.log(even); // [2, 4, 6]
```

**[`.reduce(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)**
walks through an array and boils it down to one single value — a sum, a
count, a maximum, anything. It takes a function that receives the
"running total so far" and the current item, and a starting value:

```js
const prices = [10, 25, 5];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 40
```

Read that as: "start `sum` at `0`; for each `price`, replace `sum` with
`sum + price`; once every item's been visited, `total` is whatever `sum`
ended up as." The `0` is the starting value — swap it for something else
and `.reduce(...)` can compute a maximum instead of a sum, as you'll see
below.

## 🟢 Core — The balance, with reduce

Here's `.reduce(...)` computing something real: the current balance,
income minus expenses, in one pass over `entries`:

```js
function calculateBalance() {
  return entries.reduce((total, entry) => {
    if (entry.type === "income") {
      return total + entry.amount;
    }
    return total - entry.amount;
  }, 0);
}
```

`total` starts at `0`. For every entry, the function returns either
`total + entry.amount` (income makes the balance go up) or `total -
entry.amount` (an expense makes it go down) — whatever it returns becomes
the `total` fed into the next entry. After the last one, `.reduce(...)`
hands back that final `total` directly.

## 🟢 Core — Spending per category, with filter

Now your turn, using `.filter(...)` from above.
`calculateCategoryTotals()` should build and return a plain object shaped
like `{ Food: 150, Rent: 800, Fun: 40 }` — one key per category that has
at least one expense, mapped to the sum of that category's expenses.
Steps:

1. Get only the expense entries: `entries.filter((entry) => entry.type
   === "expense")`.
2. Start an empty object: `const totals = {};`
3. Loop over the filtered expenses with
   [`.forEach(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
   For each one, add its amount into `totals` under its category's key:
   `totals[entry.category] = (totals[entry.category] || 0) +
   entry.amount;` — the `|| 0` matters here, since `totals[entry.category]`
   is `undefined` (not `0`) the first time a category shows up, and
   `undefined + entry.amount` would be `NaN`.
4. Return `totals`.

```js
function calculateCategoryTotals() {
  // your code here — the four steps above
}
```

## 🟢 Core — Adding an entry

`handleAddEntry(event)` runs when the form is submitted. It needs to:

1. Call `event.preventDefault()`.
2. Read and
   [`.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
   `descriptionInput.value`, and read `Number(amountInput.value)`. If the
   description is empty, or the amount isn't a positive number (`!(amount
   > 0)` catches `0`, negative numbers, and `NaN` from an empty field all
   at once), `return` — nothing to add.
3. Push a new entry object onto `entries`: `{ description: description,
   amount: amount, type: typeInput.value, category: categoryInput.value
   }`.
4. Clear the two text/number inputs back to `""` so the form is ready for
   the next entry.
5. Call `saveEntries()`, then `renderAll()` (given below).

```js
function handleAddEntry(event) {
  // your code here — the five steps above
}

entryForm.addEventListener("submit", handleAddEntry);
```

Save, reload `index.html`, and add an entry — it should show up in the
list and the balance should update. If you get stuck,
[`code/script.js`](../code/script.js) shows one way to write both
functions.

## 🟢 Core — Rendering everything

These are given to you — pure DOM rendering built on the functions above,
not the point of this chapter:

```js
function formatAmount(amount) {
  return "$" + amount.toFixed(2);
}

function renderBalance() {
  balanceText.textContent = formatAmount(calculateBalance());
}

function renderEntries() {
  entryList.innerHTML = entries
    .map((entry, index) => {
      const sign = entry.type === "income" ? "+" : "-";
      const amountClass = entry.type === "income" ? "amount income" : "amount expense";
      return (
        '<li class="entry">' +
          '<span class="description">' + entry.description + " (" + entry.category + ")</span>" +
          '<span class="' + amountClass + '">' + sign + formatAmount(entry.amount) + "</span>" +
          '<button class="remove" data-index="' + index + '">&times;</button>' +
        "</li>"
      );
    })
    .join("");

  entryList.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      entries.splice(index, 1);
      saveEntries();
      renderAll();
    });
  });
}

function renderChart() {
  const totals = calculateCategoryTotals();
  const categories = Object.keys(totals);

  if (categories.length === 0) {
    chart.innerHTML = "<p>No expenses yet.</p>";
    return;
  }

  const highest = categories.reduce((max, category) => {
    return totals[category] > max ? totals[category] : max;
  }, 0);

  chart.innerHTML = categories
    .map((category) => {
      const amount = totals[category];
      const percent = Math.round((amount / highest) * 100);
      return (
        '<div class="bar-row">' +
          '<span class="bar-label">' + category + "</span>" +
          '<div class="bar-track"><div class="bar-fill" style="width: ' + percent + '%"></div></div>' +
          '<span class="bar-amount">' + formatAmount(amount) + "</span>" +
        "</div>"
      );
    })
    .join("");
}

function renderAll() {
  renderBalance();
  renderEntries();
  renderChart();
}

renderAll();
```

Two things worth noticing:

- [`.toFixed(2)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
  rounds a number to 2 decimal places and returns it as a string, so
  `150` shows as `$150.00`, not `$150` — the same method
  [Course 5](../../05-unit-converter/en/01-unit-converter.md) used.
- The "chart" is plain CSS: `.bar-track` is a fixed-width gray strip,
  `.bar-fill` inside it gets a `width` percentage set directly from
  JavaScript (`style="width: 65%"`), scaled so the category spending the
  most fills the track completely (`percent = amount / highest * 100`) and
  every other bar is proportionally shorter. No chart library involved —
  `.reduce(...)` finding the highest total is what makes the scaling
  possible.
- [`Object.keys(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  turns an object's keys into a plain array (`{ Food: 150, Rent: 800 }` →
  `["Food", "Rent"]`) — used here so `.map(...)` and `.reduce(...)`, which
  only work on arrays, can walk over `totals`'s categories.

## 🟡 Optional — Filter the list by type

Add two buttons ("Show income" / "Show expenses") above the entry list,
alongside a "Show all" option (which is what it currently does). Keep
track of the current filter in a variable (e.g. `let currentFilter =
"all";`), and in `renderEntries()`, build the list from `entries.filter(
(entry) => currentFilter === "all" || entry.type === currentFilter)`
instead of straight from `entries`. Wire each button's click to set
`currentFilter` and call `renderAll()` again.

## 🔴 Optional, genuine challenge — Sort by amount

Add a "Sort by amount" button that reorders the entry list from largest
to smallest. [`.sort(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
sorts an array *in place* using a compare function you provide:
`entries.sort((a, b) => b.amount - a.amount)`. That compare function's
result decides the order: a negative number means `a` comes first, a
positive number means `b` comes first, so `b.amount - a.amount` is
negative whenever `b` is smaller than `a` — putting the larger amount
first, descending order. Since `.sort(...)` changes `entries` itself
(unlike `.map(...)`/`.filter(...)`, which always return a new array), call
`saveEntries()` and `renderAll()` again right after sorting so the new
order is saved and shown. Careful with the remove button's `data-index`
after this: it's still just "position in the current array," so it stays
correct as long as you re-render after every change — but if you build
the 🟡 filter above too, make sure you're removing from `entries` at the
right index, not the filtered list's index.

## Try it yourself

Add a few income and expense entries and watch the balance and chart
update:

![The budget tracker with several entries and a category breakdown](../assets/populated.png)

Open [`courses/09-budget-tracker/code/index.html`](../code/index.html) in
your browser — double-clicking the file works fine, since everything is
local with no external requests.

## Checkpoint & what you learned

- `.filter(...)` to keep only the array items that match a condition
- `.reduce(...)` to boil an array down to one value — a sum or a maximum,
  same method either way, just a different starting value and step
- `Object.keys(...)` to turn an object's keys into an array you can
  `.map(...)`/`.reduce(...)` over
- A CSS-only bar chart: no library, just a `width` percentage computed
  from your data
- Reusing Course 4's `localStorage` save/load pattern for a second, more
  structured kind of data

## What's next

This course stands on its own. For a broader menu of what to build next,
see [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md).
