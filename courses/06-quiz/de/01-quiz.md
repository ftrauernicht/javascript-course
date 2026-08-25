🇩🇪 Deutsch | 🇬🇧 [English](../en/01-quiz.md)

[← Zurück zur Kursübersicht](../../../README.de.md) · Verwandt: [Kurs 3 – Taschenrechner GUI](../../03-calculator-gui/de/01-taschenrechner-gui.md), [Kurs 4 – To-Do-Liste](../../04-todo-list/de/01-to-do-liste.md), [Kurs 5 – Einheitenumrechner](../../05-unit-converter/de/01-einheitenumrechner.md) (keiner davon nötig — falls du einen gemacht hast, werden dir manche Teile weiter unten vertraut vorkommen)

# Kapitel 1 – Quiz

**Ziel:** ein Multiple-Choice-Quiz bauen, das eine Frage nach der anderen
zeigt, Punkte zählt, zu jeder Antwort Rückmeldung gibt und mit einem
Ergebnisbildschirm endet, den du dir ansehen oder neu spielen kannst.
Dieser Kurs setzt nur
[Kurs 1 – Basics](../../01-basics/de/00-einleitung.md) voraus (Werte,
Variablen, Operatoren, Klammern, Funktionen, Bedingungen, Schleifen) und
sonst nichts; er steht vollständig für sich.

Die fertigen Referenzdateien liegen in
[`courses/06-quiz/code/`](../code/): `index.html`, `style.css`,
`script.js`. `index.html` und `style.css` sind so, wie sie sind, direkt
einsatzbereit — sie enthalten schon alles, was dieses Kapitel baut,
einschließlich der optionalen Teile weiter unten. `script.js` ist die
eigentliche Übung: kopiere alle drei Dateien in deinen eigenen
Arbeitsordner, leere deine Kopie von `script.js`, und bau sie Stück für
Stück wieder auf. Wie [Kurs 5](../../05-unit-converter/de/01-einheitenumrechner.md)
gibt dieses Kapitel dir weniger fertigen Code als die frühesten Kurse — du
bekommst die neuen Bausteine erklärt, und du setzt die eigentliche Logik
selbst zusammen.

Hier ist das fertige Ergebnis, auf das du hinarbeitest:

![Das Quiz zeigt seine erste Frage mit vier Antwortmöglichkeiten](../assets/empty.png)

## 🟢 Kern — Das Layout (HTML + CSS)

```html
<div class="app">
  <h1>Quiz</h1>

  <div id="question-screen">
    <p id="progress"></p>
    <h2 id="question-text"></h2>
    <ul id="options-list"></ul>
    <button id="next-button" class="hidden">Next</button>
  </div>

  <div id="result-screen" class="hidden">
    <h2>Your score</h2>
    <p id="score-text"></p>
    <ul id="review-list"></ul>
    <button id="restart-button">Play again</button>
  </div>
</div>
```

Zwei Dinge fallen auf:

- `#options-list` startet absichtlich leer — JavaScript füllt es mit
  jeweils einem `<button>` pro Antwort, aus Daten aufgebaut, genau wie
  sich Kurs 4s To-Do-Liste oder Kurs 5s Dropdowns selbst befüllt haben.
- `#result-screen` hat von Anfang an `class="hidden"`, und `.hidden` ist
  einfach eine CSS-Klasse in [`style.css`](../code/style.css), die
  `display: none;` setzt. Das ist keine besondere Browser-Funktion — einen
  ganzen Abschnitt der Seite zu zeigen oder zu verstecken ist nur das
  Hinzufügen oder Entfernen einer ganz normalen Klasse, genauso wie
  `task.done` in Kurs 4 eine `done`-Klasse hinzugefügt hat.

Die vollständige Version steht in [`index.html`](../code/index.html) und
[`style.css`](../code/style.css); das Styling ist hier nicht der Fokus, du
kannst es also gerne nur überfliegen.

Ab hier geht alles in `script.js` — das ist die Datei, die `index.html`
tatsächlich lädt. Starte mit:

```js
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const progress = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextButton = document.getElementById("next-button");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-button");
```

## 🟢 Kern — Das DOM, kurz erklärt

*(Falls du Kurs 3, 4 oder 5 gemacht hast, ist dir das alles schon
vertraut — spring direkt zum nächsten Abschnitt.)*

JavaScript sieht deine HTML-Tags nicht direkt — es sieht das **DOM**
(Document Object Model), die lebendige, speicherinterne Darstellung der
Seite im Browser. Dieses Kapitel braucht eine Handvoll DOM-Werkzeuge:

- [`document.getElementById(...)`](https://developer.mozilla.org/de/docs/Web/API/Document/getElementById)
  findet ein Element anhand seiner `id` — genau das haben die Zeilen oben
  gerade getan.
- [`document.querySelectorAll(...)`](https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll)
  findet *jedes* passende Element für einen CSS-artigen Selektor, als
  Liste, über die du mit
  [`.forEach(...)`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  iterieren kannst — weiter unten benutzt, um jeden Antwort-Button auf
  einmal zu behandeln, egal wie viele es gerade gibt.
- [`addEventListener("click", ...)`](https://developer.mozilla.org/de/docs/Web/API/EventTarget/addEventListener)
  bedeutet "führe diese Funktion aus, wann immer dieses Ereignis bei
  diesem Element eintritt."
- [`.classList.add(...)`/`.classList.remove(...)`](https://developer.mozilla.org/de/docs/Web/API/Element/classList)
  fügen eine einzelne CSS-Klasse zu einem Element hinzu oder entfernen sie,
  ohne andere, die es schon hat, zu stören — so wird oben die
  `.hidden`-Klasse umgeschaltet, und so wird ein Antwort-Button als
  `.correct` oder `.wrong` markiert.
- `.dataset` liest ein `data-*`-Attribut aus einem Element wieder aus
  (immer als Text) — dieselbe Idee der benutzerdefinierten
  Daten-Attribute wie in Kurs 3 oder 4, hier benutzt, um zu wissen, welchen
  Options-Index ein angeklickter Button darstellt.

## 🟢 Kern — Klassen, kurz erklärt

*(Falls du Kurs 3 gemacht hast, ist dir das alles schon vertraut — spring
direkt zum nächsten Abschnitt.)*

Eine **Klasse** ist eine Vorlage, um Objekte zu erzeugen, die alle
dieselbe Form und dasselbe Verhalten teilen. Statt für jede einzelne Frage
von Hand `{ text: ..., options: ..., correctIndex: ... }` zu schreiben,
beschreibst du die Form einmal:

```js
class Question {
  constructor(text, options, correctIndex) {
    this.text = text;
    this.options = options;
    this.correctIndex = correctIndex;
  }

  isCorrect(optionIndex) {
    return optionIndex === this.correctIndex;
  }
}
```

- Der [`constructor`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Classes/constructor)
  läuft, sobald du eine neue Frage erstellst, und richtet ihre Daten ein.
- [`this`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/this)
  bezieht sich auf "das konkrete Frage-Objekt, das gerade gebaut oder
  benutzt wird" — `this.text = text` speichert das Argument auf genau
  diesem einen Objekt.
- `isCorrect(...)` ist eine **Methode**: eine Funktion, die zur Klasse
  gehört und mit `this` auf die eigenen Daten des Objekts zugreifen kann.
  Jede Frage, die du erstellst, bekommt ihre eigene Kopie der Daten, teilt
  sich aber dieselbe `isCorrect`-Logik.
- `new Question("...", [...], 1)` — das Schlüsselwort
  [`new`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/new) —
  erstellt ein tatsächliches Frage-Objekt nach dieser Vorlage.

Mehr dazu: [MDN – Klassen](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Classes).

## 🟢 Kern — Die Fragen modellieren

```js
const questions = [
  new Question("What is the capital of France?", ["Berlin", "Paris", "Madrid", "Rome"], 1),
  new Question("Which planet is known as the Red Planet?", ["Earth", "Venus", "Mars", "Jupiter"], 2),
  new Question("What is 7 x 8?", ["54", "56", "58", "64"], 1),
];

let currentIndex = 0;
let score = 0;
let answered = false;
```

Schreib gerne deine eigenen Fragen, statt diese zu kopieren — der
`correctIndex` ist einfach die Position (beginnend bei 0) der richtigen
Antwort im `options`-Array. `answered` merkt sich, ob die aktuelle Frage
schon angeklickt wurde, damit ein zweiter Klick auf eine andere Option
deinen Punktestand nicht nachträglich verändert.

## 🟢 Kern — Die aktuelle Frage rendern

```js
function renderQuestion() {
  const question = questions[currentIndex];

  progress.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionText.textContent = question.text;

  optionsList.innerHTML = question.options
    .map((option, index) => '<li><button class="option" data-index="' + index + '">' + option + "</button></li>")
    .join("");

  optionsList.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      handleAnswer(Number(button.dataset.index));
    });
  });

  nextButton.classList.add("hidden");
  answered = false;
}

renderQuestion();
```

Das ist dasselbe "altes HTML wegwerfen, neues HTML aus Daten aufbauen, dann
Listener an die neuen Elemente neu anhängen"-Muster, das Kurs 4 für seine
To-Do-Liste benutzt hat, hier angewandt auf Antwort-Buttons statt
Aufgaben. Der Aufruf von `renderQuestion()` ganz unten führt es einmal
sofort aus, damit die erste Frage schon beim Laden der Seite zu sehen ist.

## 🟢 Kern — Eine Antwort prüfen

Hier übernimmst du. `handleAnswer(selectedIndex)` läuft, wenn jemand auf
einen der Antwort-Buttons klickt — `selectedIndex` ist der, auf den
geklickt wurde. Die Funktion muss:

1. Nichts tun, wenn diese Frage schon beantwortet wurde (`answered`
   prüfen, bei Bedarf mit `return` sofort aufhören).
2. Sie als beantwortet markieren.
3. Die aktuelle Frage fragen, ob `selectedIndex` richtig war (genau dafür
   ist `isCorrect(...)` da), und wenn ja, 1 zu `score` addieren.
4. Jeden Antwort-Button durchgehen
   (`optionsList.querySelectorAll(".option")`, mit
   `.forEach((button, index) => { ... })`) und:
   - ihn deaktivieren (`button.disabled = true;`), damit in dieser Runde
     nichts mehr angeklickt werden kann,
   - falls `index` dem `correctIndex` der Frage entspricht, die Klasse
     `"correct"` hinzufügen,
   - andernfalls, falls `index` dem angeklickten `selectedIndex`
     entspricht, die Klasse `"wrong"` hinzufügen (eine richtig
     angeklickte Antwort hat durch die Regel darüber schon `"correct"`
     bekommen, ist also nie beides).
5. Den "Next"-Button einblenden
   (`nextButton.classList.remove("hidden");`).

```js
function handleAnswer(selectedIndex) {
  // dein Code hier — die fünf Schritte oben
}
```

Speichern, `index.html` neu laden, und eine Antwort anklicken: die
richtige Option sollte grün werden, und eine falsche Wahl sollte rot
werden, während die richtige daneben trotzdem grün wird. Falls du nicht
weiterkommst: `handleAnswer` in [`code/script.js`](../code/script.js)
zeigt einen Weg, wie man es schreiben kann.

## 🟢 Kern — Weitermachen, und das Ergebnis zeigen

Noch zwei Funktionen, und das Quiz ist von Anfang bis Ende spielbar:

```js
nextButton.addEventListener("click", nextQuestion);

function nextQuestion() {
  // dein Code hier:
  // - 1 zu currentIndex addieren
  // - wenn currentIndex noch eine gültige Position in `questions` ist, renderQuestion() erneut aufrufen
  // - andernfalls ist das Quiz vorbei — stattdessen showResult() aufrufen
}

function showResult() {
  // dein Code hier:
  // - questionScreen verstecken, resultScreen zeigen (classList, wie die "hidden"-Klasse oben)
  // - scoreText.textContent auf etwas wie "You got 4 out of 5 correct." setzen
}
```

Probier es einmal komplett durch: beantworte jede Frage, und der
Ergebnisbildschirm sollte erscheinen und deinen Punktestand zeigen.

## 🟡 Optional — Die Reihenfolge der Antworten mischen

Aktuell steht die richtige Antwort bei jedem Spielen immer an derselben
Stelle im `options`-Array. Misch `question.options` neu (und denk daran,
neu zu berechnen, wo die richtige Antwort gelandet ist, da `correctIndex`
unter der Annahme der ursprünglichen Reihenfolge geschrieben wurde), bevor
du jede Frage renderst, damit ein erneutes Spielen nicht bedeutet,
Options-Positionen statt Antworten auswendig zu lernen.

## 🔴 Optional, echte Herausforderung — Deine Antworten überprüfen

Das `<ul id="review-list"></ul>` auf dem Ergebnisbildschirm ist dafür da:
nach Ende des Quiz jede Frage nochmal auflisten, mit dem, was du
geantwortet hast, und was die richtige Antwort tatsächlich war. Dafür
musst du dir jede Antwort merken, sobald sie passiert — z. B. ein
`answers`-Array, auf das `handleAnswer` mit `.push()`
`{ question, selectedIndex, isCorrect }` draufpackt — und dann in
`showResult()` das HTML der Review-Liste aus diesem Array aufbauen, mit
demselben `.map(...)`/`.join(...)`-Muster, das `renderQuestion()` schon
für die Optionen benutzt. `courses/06-quiz/code/script.js` hat eine
funktionierende Version, einschließlich eines "Play again"-Buttons, der
alles zurücksetzt und `renderQuestion()` erneut aufruft, falls du das
Quiz weiter ausbauen willst.

## Probier es selbst aus

Beantworte eine Frage richtig, und die richtige Option wird grün:

![Eine richtig beantwortete Frage, grün hervorgehoben](../assets/correct.png)

Beantworte eine falsch, und sowohl deine (falsche) Wahl als auch die
richtige Antwort leuchten auf:

![Eine falsche Antwort rot hervorgehoben, mit der richtigen Antwort in Grün](../assets/wrong.png)

Beantworte alle Fragen, um deinen Punktestand und eine Übersicht jeder
Antwort zu sehen:

![Der Ergebnisbildschirm zeigt 4 von 5 Punkten, mit einer Übersicht pro Frage](../assets/result.png)

Öffne [`courses/06-quiz/code/index.html`](../code/index.html) in deinem
Browser — Doppelklick auf die Datei funktioniert problemlos, da alles
lokal läuft, ohne externe Anfragen.

## Checkpoint & was du gelernt hast

- Klassen als Vorlagen für Objekte, die Form und Verhalten teilen:
  `constructor`, `this`, Methoden, `new`
- Ein kleines Quiz als Array aus Objekten (bzw. Klasseninstanzen)
  modellieren — dieselbe Idee wie Kurs 4s To-Do-Liste, angewandt auf ein
  anderes Thema
- Aus Daten neu rendern und nach jedem Rendern Listener neu anhängen
- `.classList.add(...)`/`.remove(...)`, um sowohl den Rückmeldungs-Status
  eines einzelnen Buttons als auch die Sichtbarkeit eines ganzen
  Bildschirms umzuschalten
- Ein Feature in benannte Funktionen aufteilen (`handleAnswer`,
  `nextQuestion`, `showResult`), die jeweils genau eine klare Aufgabe
  haben

## Was als Nächstes kommt

Dieser Kurs steht für sich. Für eine größere Auswahl, was als Nächstes zu
bauen wäre, siehe [PROJECT-IDEAS.de.md](../../../PROJECT-IDEAS.de.md).
