🇬🇧 English | 🇩🇪 [Deutsch](../de/01-memory-spiel.md)

[← Back to course overview](../../../README.md) · Related: [Course 3 – Calculator GUI](../../03-calculator-gui/en/01-calculator-gui.md), [Course 4 – To-Do List](../../04-todo-list/en/01-todo-list.md), [Course 6 – Quiz](../../06-quiz/en/01-quiz.md) (none required — if you've done any of them, some of the pieces below will feel familiar)

# Chapter 1 – Memory Game

**Goal:** build a card-matching memory game — a shuffled grid of face-down
cards, click two to reveal them, keep them face-up on a match, and flip
them back after a moment if they don't. This course assumes
[Course 1 – Basics](../../01-basics/en/00-introduction.md) only (values,
variables, operators, brackets, functions, conditionals, loops) and
nothing else; it stands entirely on its own.

The finished reference files live in
[`courses/07-memory-game/code/`](../code/): `index.html`, `style.css`,
`script.js`. `index.html` and `style.css` are ready to use as they are.
`script.js` is the actual exercise: copy all three files into your own
working folder, empty out your copy of `script.js`, and build it back up
one piece at a time. As in [Course 5](../../05-unit-converter/en/01-unit-converter.md)
and [Course 6](../../06-quiz/en/01-quiz.md), the trickiest part (deciding
what happens when you click a card) is left for you to assemble from
described steps, not handed to you fully written.

Here's the finished result you're working towards:

![The memory game's grid of face-down cards](../assets/empty.png)

## 🟢 Core — The layout (HTML + CSS)

```html
<div class="app">
  <h1>Memory Game</h1>
  <p id="moves">Moves: 0</p>

  <div id="board" class="board"></div>

  <div id="win-message" class="hidden">
    <p>You won in <span id="final-moves"></span> moves!</p>
    <button id="restart-button">Play again</button>
  </div>
</div>
```

`#board` starts empty — JavaScript fills it with one card button per card,
built from data, the same idea as every grid or list in earlier courses.
Each card button will get built like this:

```html
<button class="card" data-index="0">
  <span class="card-inner">
    <span class="card-face card-front">?</span>
    <span class="card-face card-back">🍎</span>
  </span>
</button>
```

See the full version in [`index.html`](../code/index.html) and
[`style.css`](../code/style.css). The CSS is worth a quick look even
though you don't need to write it yourself: a card has *two* faces
(`.card-front` showing `?`, `.card-back` showing the real value) stacked
on top of each other with `backface-visibility: hidden`, and toggling a
single `.flipped` (or `.matched`) class on the card rotates the whole
stack 180 degrees with `transform: rotateY(180deg)`. A `transition:
transform 0.4s` on `.card-inner` is what makes that rotation animate
smoothly instead of snapping instantly — the same `transition` property
you could apply to color, size, or position changes elsewhere.

From here on, everything goes into `script.js` — that's the file
`index.html` actually loads. Start it with:

```js
const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const winMessage = document.getElementById("win-message");
const finalMoves = document.getElementById("final-moves");
const restartButton = document.getElementById("restart-button");
```

## 🟢 Core — The DOM, in short

*(If you've done Course 3, 4, 5, or 6, all of this will be familiar — skip
ahead to the next section.)*

JavaScript doesn't see your HTML tags directly — it sees the **DOM**
(Document Object Model), the browser's live, in-memory representation of
the page. This chapter needs:

- [`document.getElementById(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
  finds one element by its `id`.
- [`document.querySelectorAll(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
  finds every matching element as a list, which you can loop over with
  [`.forEach(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
- [`addEventListener("click", ...)`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  says "run this function whenever this event happens on this element."
- `.classList.add(...)`/`.classList.remove(...)` add or remove a single
  CSS class from an element — how a card's `.flipped` class (and the
  `.hidden` class on the win message) gets toggled.
- `.dataset` reads a `data-*` attribute back out of an element (always as
  a string) — used below to know which card index a clicked button
  represents.

## 🟢 Core — Modeling the cards

Each card needs three things: which value it shows, whether it's
currently flipped face-up, and whether it's already been matched:

```js
const emojis = ["🍎", "🍌", "🍇", "🍒", "🍋", "🍉", "🍓", "🍍"];

let cards = [];
let firstIndex = null;
let isChecking = false;
let moves = 0;
```

`cards` will hold one object per card, like `{ value: "🍎", flipped:
false, matched: false }` — the object-literal pattern from earlier
courses (a pair of curly braces holding `key: value` pairs, producing a
value you can store, unlike the `{}` that wraps a block of statements).
`firstIndex` remembers the position of the first card flipped in the
current pair (or `null` if no card is currently waiting for its partner),
and `isChecking` will matter once mismatches are involved, below.

## 🟢 Core — Shuffling and building the deck

Eight emoji, each needed twice, shuffled into random positions:

```js
function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function createCards() {
  const pairedValues = emojis.concat(emojis);
  const shuffledValues = shuffle(pairedValues);
  return shuffledValues.map((value) => ({ value: value, flipped: false, matched: false }));
}

cards = createCards();
```

- [`.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  with no arguments copies an entire array — `shuffle` copies its input
  first so it rearranges the copy, not whatever array was passed in.
- [`.concat(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
  joins two arrays into a new one — `emojis.concat(emojis)` is every emoji
  twice, 16 values for 16 cards.
- [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
  gives a random decimal between 0 (inclusive) and 1 (exclusive);
  [`Math.floor(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
  rounds down to a whole number. Together, `Math.floor(Math.random() * (i
  + 1))` picks a random whole number from 0 up to `i`.
- The loop is the **Fisher-Yates shuffle**: walking from the end of the
  array to the start, swapping each position with a random earlier (or
  equal) one. It's a standard, well-known algorithm — worth recognizing
  by name, not something you're expected to invent yourself.

## 🟢 Core — Rendering the board

```js
function cardClass(card) {
  if (card.matched) {
    return "card matched";
  }
  if (card.flipped) {
    return "card flipped";
  }
  return "card";
}

function renderCards() {
  board.innerHTML = cards
    .map((card, index) => {
      const stateClass = cardClass(card);
      return (
        '<button class="' + stateClass + '" data-index="' + index + '">' +
          '<span class="card-inner">' +
            '<span class="card-face card-front">?</span>' +
            '<span class="card-face card-back">' + card.value + "</span>" +
          "</span>" +
        "</button>"
      );
    })
    .join("");

  board.querySelectorAll(".card").forEach((button) => {
    button.addEventListener("click", () => {
      handleCardClick(Number(button.dataset.index));
    });
  });

  movesText.textContent = "Moves: " + moves;
}

renderCards();
```

The same "throw away the old HTML, rebuild it from data, then re-attach
listeners to the new elements" pattern as earlier courses' lists — here,
`cardClass(card)` decides which CSS classes (and therefore which face-up
or face-down look) each button gets, purely from that card's own data.
Save, reload `index.html`, and you should see a full grid of face-down
cards.

## 🟢 Core — Flipping a card and checking for a match

This is where you take over. First, a quick detour: this chapter needs
[`setTimeout(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout),
which schedules a function to run later, without pausing anything else in
the meantime:

```js
console.log("first");
setTimeout(() => {
  console.log("second, after a short pause");
}, 1000);
console.log("third");
```

This logs "first", then "third" immediately, and "second, after a short
pause" about one second (1000 milliseconds) later — the rest of your code
doesn't wait around for the timer. That's exactly what showing a
mismatched pair for a moment, then flipping it back automatically,
needs.

Now, `handleCardClick(index)` runs whenever a card is clicked —
`index` is the position of the card that was clicked. It needs to:

1. Do nothing if `isChecking` is true (a mismatched pair is still being
   shown), or if the clicked card is already flipped or already matched
   (check `cards[index].flipped`/`cards[index].matched`, `return` early
   if any of this applies).
2. Flip the clicked card face-up (`cards[index].flipped = true;`), then
   re-render so it shows immediately.
3. If `firstIndex` is `null`, this is the first card of a new pair —
   store `firstIndex = index` and stop here.
4. Otherwise, this is the second card of the pair — call
   `checkForMatch(firstIndex, index)`, then reset `firstIndex` back to
   `null`.

```js
function handleCardClick(index) {
  // your code here — the four steps above
}
```

`checkForMatch(a, b)` compares the two flipped cards at positions `a` and
`b`:

1. Add 1 to `moves` — every pair checked counts as one move, whether it
   matches or not.
2. If `cards[a].value === cards[b].value`: mark both `matched = true`,
   re-render, and check whether every card is now matched (see below).
3. Otherwise: set `isChecking = true` (blocking further clicks — see
   step 1 above), then use `setTimeout(...)` to, after a short delay
   (e.g. 800 milliseconds), flip both cards back down
   (`cards[a].flipped = false; cards[b].flipped = false;`), set
   `isChecking = false`, and re-render.

```js
function checkForMatch(a, b) {
  // your code here — the three steps above
}

function checkWin() {
  const allMatched = cards.every((card) => card.matched);
  if (allMatched) {
    winMessage.classList.remove("hidden");
    finalMoves.textContent = moves;
  }
}
```

[`.every(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
checks whether a function returns `true` for *every* item in an array —
here, whether every card's `matched` is `true`. `checkWin()` is already
written for you above; call it from inside `checkForMatch` once you've
marked a pair matched.

Save, reload, and click through two cards: a match should stay face-up
and turn slightly green, and a mismatch should flip back after under a
second. Finish the whole grid, and the win message should appear with
your move count. If you get stuck, `handleCardClick` and `checkForMatch`
in [`code/script.js`](../code/script.js) show one way to write them.

## 🟡 Optional — Play again

The win message's "Play again" button (`restartButton`) doesn't do
anything yet. Write a `restartGame()` function that puts everything back
to a fresh start: a new shuffled `cards` array (`createCards()` already
does the shuffling), `moves` back to 0, `firstIndex` back to `null`,
`isChecking` back to `false`, hide the win message again, and re-render.
Then wire it up with `restartButton.addEventListener("click",
restartGame);`.

## 🔴 Optional, genuine challenge — Remember your best score

Using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
(the same persistent, key-value browser storage from
[Course 4](../../04-todo-list/en/01-todo-list.md), not required here),
keep track of the fewest moves you've ever finished a game in, across
page reloads. When `checkWin()` finds the game won, compare `moves`
against whatever's stored (there won't be anything stored the very first
time; decide what that should mean), and if this game took fewer moves,
save the new best and show it alongside the current result, e.g. "You won
in 9 moves! (Best: 7)". Since you're storing a single number rather than
a whole array of objects, this needs less `JSON.stringify`/`JSON.parse`
machinery than Course 4 did. A number survives the trip through
`localStorage` as text just fine, with `Number(...)` on the way back out.

## Try it yourself

Click a card to flip it face-up:

![One card flipped face-up, showing its emoji](../assets/flipped.png)

Match every pair to see the win message and your move count:

![The win message showing the game was won in 9 moves, with every card matched](../assets/win.png)

Open [`courses/07-memory-game/code/index.html`](../code/index.html) in
your browser — double-clicking the file works fine, since everything is
local with no external requests.

## Checkpoint & what you learned

- Modeling game state as an array of small objects (`value`, `flipped`,
  `matched`) and re-rendering the whole board from it on every change
- The Fisher-Yates shuffle as a standard, reusable algorithm
- `setTimeout(...)` to schedule something for later without pausing the
  rest of your code — and why that matters for a "show, then hide again"
  effect
- A CSS-only flip animation: two stacked faces, `backface-visibility:
  hidden`, and a `transition` on `transform: rotateY(...)`
- `.slice()`, `.concat()`, `.every(...)`, `Math.random()`, `Math.floor(...)`
- Splitting one interaction (clicking a card) into a fast "handle the
  click" function and a separate "check the result" function

## What's next

This course stands on its own. For a broader menu of what to build next,
see [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md).
