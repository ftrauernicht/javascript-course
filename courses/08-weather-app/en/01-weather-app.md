🇬🇧 English | 🇩🇪 [Deutsch](../de/01-wetter-app.md)

[← Back to course overview](../../../README.md) · Related: [Course 4 – To-Do List](../../04-todo-list/en/01-todo-list.md), [Course 5 – Unit Converter](../../05-unit-converter/en/01-unit-converter.md), [Course 6 – Quiz](../../06-quiz/en/01-quiz.md), [Course 7 – Memory Game](../../07-memory-game/en/01-memory-game.md) (none required — the DOM-rendering pattern below will feel familiar if you've done any of them)

# Chapter 1 – Weather App

**Goal:** build a small app that looks up real, live weather for any city
you type in — the first course where your code talks to the outside world
instead of only working with data you typed in yourself. This course
assumes [Course 1 – Basics](../../01-basics/en/00-introduction.md) only
(values, variables, operators, brackets, functions, conditionals, loops)
and nothing else; it stands entirely on its own.

The finished reference files live in
[`courses/08-weather-app/code/`](../code/): `index.html`, `style.css`,
`script.js`. `index.html` and `style.css` are ready to use as they are.
`script.js` is the actual exercise: copy all three files into your own
working folder, empty out your copy of `script.js`, and build it back up
one piece at a time. As in [Course 5](../../05-unit-converter/en/01-unit-converter.md),
[Course 6](../../06-quiz/en/01-quiz.md), and
[Course 7](../../07-memory-game/en/01-memory-game.md), the trickiest part
is left for you to assemble from described steps, not handed to you fully
written.

No sign-up, no account, and no API key are needed anywhere in this
chapter — the weather service used here is free and open to call directly.

Here's the finished result you're working towards:

![The weather app with an empty search field](../assets/empty.png)

## 🟢 Core — The layout (HTML + CSS)

```html
<div class="app">
  <h1>Weather</h1>

  <form id="search-form">
    <input type="text" id="city-input" placeholder="Enter a city..." autocomplete="off" />
    <button type="submit">Search</button>
  </form>

  <div id="result"></div>
</div>
```

`#result` starts empty — JavaScript fills it once you've searched for a
city, the same "leave a container empty in HTML, fill it from JavaScript"
approach as every list or grid in earlier courses. See the full version in
[`index.html`](../code/index.html) and [`style.css`](../code/style.css);
the CSS is a plain card layout, nothing new.

From here on, everything goes into `script.js` — that's the file
`index.html` actually loads. Start it with:

```js
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const result = document.getElementById("result");
```

## 🟢 Core — The DOM, in short

*(If you've done Course 3, 4, 5, 6, or 7, all of this will be familiar —
skip ahead to the next section.)*

JavaScript doesn't see your HTML tags directly — it sees the **DOM**
(Document Object Model), the browser's live, in-memory representation of
the page. This chapter needs:

- [`document.getElementById(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
  finds one element by its `id`.
- [`addEventListener("submit", ...)`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  says "run this function whenever this form is submitted" — that's
  clicking the button *or* pressing Enter while the input is focused,
  both at once. The function you pass in (`(event) => { ... }`) is an
  [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) —
  a shorter way to write a small function, especially one you're only
  using once, right here.
- [`event.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
  stops a form's default behavior, which is otherwise to reload the whole
  page — without this line, every search would refresh the browser and
  lose your result instantly.
- `.value` reads whatever text is currently typed into an `<input>`.
- `.innerHTML` replaces everything inside an element with new HTML,
  exactly like earlier courses' rendering functions.

## 🟢 Core — Talking to a server: fetch, Promises, and async/await

Every course so far has worked only with data you typed into the code
yourself. This one asks another computer, somewhere on the internet, for
data — and that takes time: the request has to travel there, get answered,
and travel back. JavaScript can't just pause and wait, because a paused
browser tab would freeze completely. Instead, it hands you back a
**Promise**: a placeholder for a value that doesn't exist yet, but will
(or an error, if something goes wrong).

[`fetch(url)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)
starts a network request and returns a Promise for the response. The
cleanest way to work with that Promise is
[`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await):
it pauses *that one function* (never the whole page) until the Promise is
settled, then hands you the actual value directly, as if it had been there
all along. `await` only works inside a function marked
[`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

```js
async function greetSlowly() {
  console.log("Waiting...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("One second has passed.");
}

greetSlowly();
console.log("This logs immediately, before the function above finishes.");
```

This logs "Waiting...", then "This logs immediately...", then "One second
has passed." about a second later — the rest of the page's code keeps
running while `greetSlowly` is paused on its `await`, the same
"doesn't block anything else" idea as `setTimeout` in
[Course 7](../../07-memory-game/en/01-memory-game.md).

A real `fetch` call needs two `await`s: one for the response to arrive,
and a second one to read its body as JSON (which is itself asynchronous,
since the body can still be streaming in):

```js
async function getJoke() {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await response.json();
  console.log(data);
}

getJoke();
```

Run that in a console and you'll see a plain JavaScript object logged —
`fetch` and `.json()` did the work of turning raw network bytes into
something you can read `.setup` and `.punchline` off of directly.

## 🟢 Core — From a city name to coordinates

The weather service this chapter uses, [Open-Meteo](https://open-meteo.com/),
is actually two separate APIs: one that turns a place name into
coordinates (**geocoding**), and one that turns coordinates into a
forecast. Here's the first one, fully written — a worked example for the
pattern you'll reuse yourself in the next section:

```js
async function getCoordinates(city) {
  const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1&language=en&format=json";
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found: " + city);
  }

  const place = data.results[0];
  return { latitude: place.latitude, longitude: place.longitude, name: place.name, country: place.country };
}
```

A few things worth noticing:

- [`encodeURIComponent(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
  makes a string safe to put inside a URL — turning spaces and other
  special characters into the `%20`-style escapes a URL needs. Always wrap
  user-typed text in this before gluing it into a URL by hand.
- The API always answers with a `results` **array**, even for one match —
  asking for a city that doesn't exist gives back an empty array (`[]`),
  not an error. That's why `getCoordinates` checks the length itself and
  [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)s
  its own error when nothing came back — more on `throw` and catching it
  below.
- The function returns a plain object with just the four fields the rest
  of the app actually needs, instead of the much bigger object the API
  sent back — reshaping data into the shape you want is normal and worth
  doing early.

Try it: paste this function into a console (any page will do — it's not
tied to your `index.html`), then run `getCoordinates("Tokyo").then(console.log)`
and watch what comes back.

## 🟢 Core — From coordinates to a forecast

Now the second API call — this one's yours to write, using the exact same
pattern as `getCoordinates` above. `getCurrentWeather(latitude, longitude)`
should:

1. Build this URL (with the real `latitude`/`longitude` values spliced
   in): `https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
2. `await` a `fetch` of that URL, then `await` its `.json()`.
3. Return the `.current` property of the parsed data — that's an object
   shaped like `{ temperature_2m: 18.4, weather_code: 3, wind_speed_10m:
   11.2, ... }`.

```js
async function getCurrentWeather(latitude, longitude) {
  // your code here — the three steps above
}
```

No coordinates lookup is needed here — the forecast API takes latitude and
longitude directly, which is exactly what `getCoordinates` gave you.

## 🟢 Core — Rendering loading, error, and result states

These are given to you — pure DOM rendering, the same `innerHTML`-from-data
pattern as earlier courses, not the point of this chapter:

```js
const weatherCodes = {
  0: { text: "Clear sky", icon: "☀️" },
  1: { text: "Mainly clear", icon: "🌤️" },
  2: { text: "Partly cloudy", icon: "⛅" },
  3: { text: "Overcast", icon: "☁️" },
  45: { text: "Fog", icon: "🌫️" },
  48: { text: "Depositing rime fog", icon: "🌫️" },
  51: { text: "Light drizzle", icon: "🌦️" },
  53: { text: "Moderate drizzle", icon: "🌦️" },
  55: { text: "Dense drizzle", icon: "🌧️" },
  61: { text: "Slight rain", icon: "🌧️" },
  63: { text: "Moderate rain", icon: "🌧️" },
  65: { text: "Heavy rain", icon: "🌧️" },
  71: { text: "Slight snowfall", icon: "🌨️" },
  73: { text: "Moderate snowfall", icon: "🌨️" },
  75: { text: "Heavy snowfall", icon: "❄️" },
  80: { text: "Rain showers", icon: "🌦️" },
  81: { text: "Rain showers", icon: "🌧️" },
  82: { text: "Violent rain showers", icon: "⛈️" },
  95: { text: "Thunderstorm", icon: "⛈️" },
};

function describeWeatherCode(code) {
  return weatherCodes[code] || { text: "Unknown", icon: "❓" };
}

function renderLoading() {
  result.innerHTML = "<p>Loading...</p>";
}

function renderError(message) {
  result.innerHTML = '<p class="error">' + message + "</p>";
}

function renderWeather(place, weather) {
  const info = describeWeatherCode(weather.weather_code);
  result.innerHTML =
    '<div class="weather-card">' +
      "<h2>" + place.name + ", " + place.country + "</h2>" +
      '<p class="temperature">' + info.icon + " " + Math.round(weather.temperature_2m) + "°C</p>" +
      "<p>" + info.text + "</p>" +
      "<p>Wind: " + weather.wind_speed_10m + " km/h</p>" +
    "</div>";
}
```

`weatherCodes` is the **lookup-table pattern** from
[Course 5](../../05-unit-converter/en/01-unit-converter.md): the API only
gives you a numeric `weather_code`, and this table turns it into text and
an emoji a human can actually read.
[`Math.round(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
rounds the temperature to a whole number, since the API returns decimals
like `18.4`.

## 🟢 Core — Handling errors and tying it all together

Network requests fail — a typo'd city, no internet connection, the API
being down. [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
lets you attempt something risky and recover instead of crashing:

```js
try {
  const place = await getCoordinates("Nowhereville12345");
  console.log(place);
} catch (error) {
  console.log("Something went wrong:", error.message);
}
```

Whatever code inside `try { ... }` throws — including `getCoordinates`'s
own `throw new Error(...)` for a city with no results, and any network
failure `fetch` itself runs into — jumps straight to `catch (error) {
... }` instead of stopping the whole program.

Now write `handleSearch(event)`, the function the form's `"submit"` event
will call. It needs to:

1. Call `event.preventDefault()` (see the DOM recap above).
2. Read the typed city from `cityInput.value`, and
   [`.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
   it. If it's empty after trimming, `return` — nothing to search for.
3. Call `renderLoading()` so the user sees *something* while the requests
   are in flight.
4. Inside a `try` block: `await getCoordinates(city)`, then `await
   getCurrentWeather(...)` with that place's latitude/longitude, then
   `renderWeather(place, weather)`.
5. In the `catch` block: call `renderError(...)` with a friendly message
   mentioning the city that was searched for.

```js
async function handleSearch(event) {
  // your code here — the five steps above
}

searchForm.addEventListener("submit", handleSearch);
```

Save, reload `index.html`, and search for a real city — you should see a
loading message flash briefly, then the current temperature, conditions,
and wind speed. Search for something that isn't a city at all, and you
should see the error message instead of a broken page. If you get stuck,
[`code/script.js`](../code/script.js) shows one way to write both
functions.

## 🟡 Optional — Remember the last search

Using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
(the same persistent, key-value browser storage from
[Course 4](../../04-todo-list/en/01-todo-list.md)), save the last searched
city every time `handleSearch` succeeds, and on page load, if a city is
already stored, pre-fill `cityInput.value` with it and run the search
immediately — so reopening the app shows you the same city's weather
without retyping it.

## 🔴 Optional, genuine challenge — A short forecast

Open-Meteo's forecast endpoint can return more than just the current
conditions. Add `&daily=temperature_2m_max,temperature_2m_min,weather_code`
to the forecast URL (alongside the existing `current=...` parameter), and
the response gains a `.daily` object shaped like `{ time: ["2026-08-25",
"2026-08-26", ...], temperature_2m_max: [23.1, 21.7, ...],
temperature_2m_min: [14.2, 13.9, ...], weather_code: [1, 61, ...] }` — one
array per field, all the same length, one entry per day. Write a
`renderForecast(daily)` function that builds one small card per day
(skip today, `.slice(1)` to get tomorrow onward) showing its date, icon,
and high/low temperature, using
[`.map(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
over `daily.time` — you'll need the same index into every one of the
parallel arrays for each day.

## Try it yourself

Search for a real city and see its current weather:

![The weather app showing Berlin's current weather](../assets/result.png)

Search for something that isn't a real place:

![The weather app showing an error message for an unknown city](../assets/error.png)

Open [`courses/08-weather-app/code/index.html`](../code/index.html) in your
browser. Unlike earlier courses, this one needs an internet connection —
it's genuinely talking to a server.

## Checkpoint & what you learned

- Promises, `async`/`await`, and why network requests can't just "pause"
  the whole page
- `fetch(...)` plus `.json()` to call a real, public API and read its
  response
- `encodeURIComponent(...)` to safely build a URL from user input
- `try...catch` and `throw new Error(...)` to handle failure without
  crashing
- Reshaping an API's response into just the fields your app needs
- The lookup-table pattern again, this time turning an API's numeric codes
  into human-readable text

## What's next

This course stands on its own. For a broader menu of what to build next,
see [PROJECT-IDEAS.md](../../../PROJECT-IDEAS.md).
