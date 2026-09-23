🇩🇪 Deutsch | 🇬🇧 [English](../en/01-calculator-gui.md)

[← Zurück zur Kursübersicht](../../../README.de.md) · Verwandt: [Kurs 2 – Taschenrechner Konsole](../../02-calculator-console/de/01-taschenrechner-konsole.md) (nicht vorausgesetzt, siehe "Weiter" unten)

# Kapitel 1 – Taschenrechner mit Oberfläche (GUI)

**Ziel:** einen Taschenrechner mit einer echten, klickbaren Oberfläche auf
einer Webseite bauen: mit Buttons, Anzeige, allem drum und dran. Dieser
Kurs setzt [Kurs 1 – Basics](../../01-basics/de/00-einleitung.md) voraus
(Variablen, Funktionen, Bedingungen) und sonst nichts; er steht vollständig
für sich.

Die fertigen Referenzdateien zu diesem Kapitel liegen in
[`courses/03-calculator-gui/code/`](../code/): `index.html`, `style.css`,
`script.js`. `index.html` und `style.css` kannst du unverändert übernehmen.
Struktur und Aussehen sind nicht der Punkt dieses Kapitels. `script.js` ist
dagegen die eigentliche Übung: Kopier dir alle drei Dateien in einen
eigenen Arbeitsordner, leer deine Kopie von `script.js`, und bau sie Stück
für Stück wieder auf, während du das Kapitel durcharbeitest. Die
`script.js` in `code/` ist die fertige Lösung, mit der du vergleichen oder
in die du reinschauen kannst, sobald der Text dich darauf hinweist. Öffne
deine `index.html` jederzeit (per Doppelklick oder aus dem Dateimanager), um
den aktuellen Stand zu sehen. Es ist einfach eine lokale Datei, kein
Server nötig.

So sieht das fertige Ergebnis aus, auf das du hinarbeitest:

![Der fertige Taschenrechner mit 0 in der Anzeige](../assets/empty.png)

## 🟢 Kern — Die drei Bausteine einer Webseite

Eine Webseite besteht aus drei Sprachen, jede mit genau einer Aufgabe:

- **HTML** liefert die Struktur: welche Elemente es gibt (ein Button, eine
  Überschrift, ein Textfeld) und wie sie verschachtelt sind.
  [MDN – HTML-Grundlagen](https://developer.mozilla.org/de/docs/Learn_web_development/Core/Structuring_content).
- **CSS** bestimmt das Aussehen: Farben, Abstände, Layout.
  [MDN – CSS-Grundlagen](https://developer.mozilla.org/de/docs/Learn_web_development/Core/Styling_basics).
- **JavaScript** steuert das Verhalten: was passiert, wenn du klickst, tippst oder
  wartest. Das ist die Schicht, um die es in diesem Kapitel geht.

Eine minimale HTML-Datei sieht so aus:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Taschenrechner</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- Inhalt kommt hierhin -->
  <script src="script.js"></script>
</body>
</html>
```

`<link rel="stylesheet" ...>` bindet die CSS-Datei ein; `<script src="...">`
am Ende von `<body>` bindet die JavaScript-Datei ein, und zwar *nachdem*
die Elemente der Seite existieren. Das ist wichtig: JavaScript, das läuft,
bevor ein Element existiert, kann es noch nicht finden.

## 🟢 Kern — Das Layout bauen (HTML + CSS)

Der Taschenrechner besteht aus einer Anzeige plus einem Raster aus Buttons.
Wirf einen Blick auf die vollständige Version in
[`index.html`](../code/index.html). Der wichtige Teil ist, dass jeder
Button ein kleines eigenes Attribut trägt, das beschreibt, was er tut:

```html
<div id="display" class="display">0</div>

<button data-digit="7">7</button>
<button data-operator="+">+</button>
<button data-action="equals">=</button>
<button data-action="clear">C</button>
```

`data-digit`, `data-operator` und `data-action` sind
[eigene Data-Attribute](https://developer.mozilla.org/de/docs/Web/HTML/How_to/Use_data_attributes):
ein standardisierter, JavaScript-freundlicher Weg, einem HTML-Element eine
kleine Information mitzugeben, ohne sich einen eigenen Tag auszudenken. Du
liest diese gleich in JavaScript wieder aus.

Das Aussehen des Taschenrechners (der dunkle Hintergrund, das Raster, die
orangen Operator-Buttons) steckt komplett in
[`style.css`](../code/style.css) und nutzt
[CSS Grid](https://developer.mozilla.org/de/docs/Web/CSS/CSS_grid_layout).
Überflieg es, aber mach dir jetzt noch keine Sorgen, CSS Grid vollständig zu
beherrschen; das ist ein Thema für ein eigenes, späteres Kapitel.

## 🟢 Kern — Eine kleine Rechen-Engine

Bevor überhaupt ein Button verdrahtet wird, schreib die eigentliche
Rechenlogik als eine kleine, eigenständige Funktion, unabhängig von jedem
Button und jeder Anzeige:

```js
function calculate(a, operator, b) {
  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "*") {
    return a * b;
  } else if (operator === "/") {
    if (b === 0) {
      console.warn("Cannot divide by zero.");
      return NaN;
    }
    return a / b;
  } else {
    console.warn("Unknown operator: " + operator);
    return NaN;
  }
}

calculate(3, "+", 4); // 7
```

Beide Fehlerfälle geben
[`NaN`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/NaN)
("Not a Number") zurück, statt abzustürzen. So kann, wer `calculate`
aufgerufen hat, bemerken, dass etwas schiefgelaufen ist, und reagieren,
statt dass die ganze Seite abstürzt.

Füg das in die Browser-Konsole ein (siehe
[Kurs 1 – Basics](../../01-basics/de/00-einleitung.md), falls du eine
Auffrischung brauchst, wie man sie öffnet) und probier ein paar Rechnungen
aus, bevor du sie an irgendetwas anschließt. Beachte: Das ist eine **reine
Funktion**. Dieselben drei Eingaben liefern immer dasselbe Ergebnis, und sie
fasst die Seite überhaupt nicht an. Genau deshalb lässt sie sich so einfach
für sich allein testen und genauso leicht an Buttons anschließen. (Falls du
diese Funktion schon in
[Kurs 2 – Taschenrechner Konsole](../../02-calculator-console/de/01-taschenrechner-konsole.md)
gebaut hast: Es ist dieselbe Idee. Überflieg diesen Abschnitt ruhig.)

## 🟢 Kern — Buttons zum Leben erwecken (DOM + Events)

Bisher hat sich alles in der Konsole abgespielt. Ab jetzt kommt alles, was
du schreibst, in `script.js`. Das ist die Datei, die `index.html`
tatsächlich lädt, also muss alles, was bleiben soll, dort stehen, nicht nur
in einer einzelnen Konsolenzeile.

JavaScript sieht deine HTML-Tags nicht direkt: Es sieht das **DOM**
(Document Object Model), die vom Browser erzeugte, lebendige Repräsentation
der Seite im Speicher. Du findest darin Elemente und hängst dann Verhalten
an sie an. Füg das zu `script.js` hinzu, nach der `calculate`-Funktion von
oben:

```js
const display = document.getElementById("display");
```

[`document.getElementById`](https://developer.mozilla.org/de/docs/Web/API/Document/getElementById)
findet ein einzelnes Element über seine `id`, hier das `<div id="display">`
aus dem Layout-Abschnitt.

Bevor die echten Buttons verdrahtet werden, lohnt es sich, das Muster fürs
Klick-Handling einmal für sich zu sehen. Das Folgende ist ein
**Wegwerf-Experiment, nichts, das in `script.js` landen soll**: Öffne
`index.html` in deinem Browser, öffne *die Konsole dieser Seite* (genauso
wie in [Kurs 1 – Basics](../../01-basics/de/00-einleitung.md), nur auf
dieser Seite statt einem leeren Tab; das braucht eine tatsächlich geladene
Seite, um `display` und die Buttons zu finden, weshalb es in einer reinen
Node-Konsole nicht funktionieren würde, wie es `calculate` noch tat), und
füg das direkt dort ein:

```js
const equalsButton = document.querySelector('[data-action="equals"]');
equalsButton.addEventListener("click", () => {
  console.log("Equals was clicked!");
});
```

Klick auf `=` und schau in die Konsole. Dann:

- [`document.querySelector` / `querySelectorAll`](https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll) findet Elemente über einen CSS-artigen Selektor, zum Beispiel "jedes Element mit einem `data-action`-Attribut gleich `"equals"`".
- [`addEventListener("click", ...)`](https://developer.mozilla.org/de/docs/Web/API/EventTarget/addEventListener) bedeutet "führe diese Funktion aus, sobald auf dieses Element geklickt wird". Die übergebene Funktion (`() => { ... }`) ist eine [Arrow Function](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Arrow_functions): eine kürzere Schreibweise für eine kleine Funktion, besonders wenn du sie nur einmal, genau hier, brauchst.

Jetzt zurück in `script.js`, für echt: Verdrahte die Ziffern-Buttons mit ein
paar einfachen Variablen, die den Zustand mitführen:

```js
let currentValue = "0";
let previousValue = null;
let operator = null;

function updateDisplay() {
  display.textContent = currentValue;
}

document.querySelectorAll("[data-digit]").forEach((button) => {
  button.addEventListener("click", () => {
    currentValue = currentValue === "0" ? button.dataset.digit : currentValue + button.dataset.digit;
    updateDisplay();
  });
});
```

- `button.dataset.digit` ist die Art, wie JavaScript ein `data-digit="..."`
  -Attribut wieder ausliest.
- [`.forEach(...)`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  führt eine Funktion einmal für jedes Element einer Liste aus, hier einmal
  pro Ziffern-Button, sodass dieser eine `addEventListener`-Aufruf alle zehn
  Ziffern verdrahtet, statt ihn zehnmal zu wiederholen. `querySelectorAll`
  liefert genau so eine Liste zurück.

Speicher `script.js` und lad `index.html` neu: Die Ziffern-Buttons
funktionieren jetzt: klick `7` dann `3`, und die Anzeige zeigt `73`. Die
Operator-, Gleich- und Löschen-Buttons bleiben vorerst bewusst
unverdrahtet. Sie mit losen Variablen wie diesen sauber umzusetzen wird
schnell unübersichtlich (merken, ob man "auf die zweite Zahl wartet",
`3 + 4 × 2` als Kette statt nur einer Operation behandeln, und so weiter):
genau das Problem, das der nächste Abschnitt löst.

## 🟢 Kern — Von losen Variablen zu einer Klasse: ein sanfter erster Schritt in Richtung OOP

Schau dir an, was gerade passiert ist: `currentValue`, `previousValue`,
`operator` und mehrere Funktionen gehören alle zusammen: Keins davon ergibt
für sich allein Sinn, sie ergeben nur Sinn als *Zustand und Verhalten eines
Taschenrechners*. Wenn Daten und die Funktionen, die auf ihnen arbeiten, so
zusammengehören, gibt dir JavaScript eine Möglichkeit, sie in einer Sache zu
bündeln: eine **Klasse**.

Stell dir eine Klasse als Bauplan vor (einen Keksausstecher); ein daraus
erzeugtes **Objekt** (`new Calculator(...)`) ist ein einzelner Keks, der nach
diesem Bauplan gebacken wurde. Du könntest aus derselben Klasse mehrere,
voneinander unabhängige Taschenrechner erzeugen, wenn du wolltest.

```js
class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.currentValue = "0";
    this.previousValue = null;
    this.operator = null;
  }

  inputDigit(digit) {
    this.currentValue =
      this.currentValue === "0" ? digit : this.currentValue + digit;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentValue;
  }
}

const calculator = new Calculator(display);
```

Ein paar Begriffe zu dem, was du hier siehst:

- Der `constructor` läuft einmal, wenn du das Objekt mit `new` erzeugst. Er
  richtet die Startwerte des Objekts ein.
- `this` bezieht sich auf "das konkrete Objekt, für das diese Methode gerade
  aufgerufen wurde": Innerhalb von `Calculator` ist `this.currentValue` der
  eigene Wert genau dieses Objekts, sodass zwei verschiedene
  `Calculator`-Objekte jeweils ihre eigene, unabhängige `currentValue` haben.
- `inputDigit` und `updateDisplay` sind **Methoden**: Funktionen, die
  innerhalb der Klasse leben und mit `this` arbeiten.

Nachschlagen: [MDN – Klassen](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Classes).
Das ist absichtlich der kleine, nützliche Ausschnitt von OOP: keine
Vererbung, keine statischen Member, keine privaten Felder. Die gibt es und
sie lohnen sich irgendwann zu lernen, aber sie wären zusätzliches Gewicht,
das du für einen Taschenrechner nicht brauchst.

Ersetz in `script.js` den Ziffern-Verdrahtungsblock
(`document.querySelectorAll(...)`) durch diese Klassen-Version
(`button.dataset.digit` geht jetzt direkt an `calculator.inputDigit(...)`
statt an eine lose `currentValue`-Variable). Die vollständige Klasse in
[`script.js`](../code/script.js) rundet das mit drei weiteren Teilen ab, die
gut zu kennen sind, bevor du sie liest:

- `inputDigit` selbst bekommt etwas mehr Logik als oben gezeigt: eine
  Schutzabfrage, damit zweimal `.` tippen keinen zweiten Dezimalpunkt
  einfügt, und ein Flag (`shouldResetDisplay`), das die Anzeige direkt nach
  einem Operator-Klick zurücksetzt. Ohne das würde `3`, `+`, `4` als `34`
  erscheinen statt die `3` durch `4` zu ersetzen.
- `chooseOperator` behandelt außerdem Verkettung: Wird ein Operator
  gedrückt, während schon einer aussteht, ruft sie im Stillen zuerst
  `equals()` auf, was dafür sorgt, dass `3 + 4 × 2` korrekt `14`
  anzeigt, statt durcheinanderzukommen.
- In `equals()` wird schließlich `calculate` (aus dem Abschnitt "Eine kleine
  Rechen-Engine" oben) aufgerufen:
  `calculate(Number(this.previousValue), this.operator, Number(this.currentValue))`.

Nichts davon ändert die *Form*, die du gerade gelernt hast: Es ist immer
noch ein `constructor` plus Methoden, die mit `this` arbeiten, nur mit ein
paar mehr praxisnahen Sonderfällen abgedeckt. Sobald deine `script.js`
damit übereinstimmt, lad `index.html` neu und öffne wieder ihre Konsole:
Probier dort direkt `calculator.inputDigit("7")` und dann
`calculator.inputDigit("3")`. Du siehst `"73"` auf dem echten
Taschenrechner erscheinen, ein schneller Weg, die Klasse von außen
anzustoßen, auch wenn du normalerweise einfach die Buttons klicken würdest.

## 🟡 Optional — Tastatur-Unterstützung

Aktuell reagiert der Taschenrechner nur auf Klicks. Füg einen Listener für
Tastatureingaben hinzu, damit auch Tippen funktioniert:

```js
document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    calculator.inputDigit(event.key);
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    calculator.chooseOperator(event.key);
  } else if (event.key === "Enter") {
    calculator.equals();
  } else if (event.key === "Escape") {
    calculator.clear();
  }
});
```

`["+", "-", "*", "/"].includes(event.key)` prüft, ob `event.key` einer
dieser vier Strings ist, kürzer als vier einzelne `||`-Vergleiche.
Nachschlagen: [MDN – KeyboardEvent](https://developer.mozilla.org/de/docs/Web/API/KeyboardEvent),
[MDN – Array.includes](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).

## 🟡 Optional — Ein Rechenverlauf

Führ ein Array vergangener Berechnungen mit und stell sie als Liste dar,
gute Übung mit
[Arrays](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Indexed_collections)
und dem Umwandeln von Daten in HTML.

Füg irgendwo in `index.html` (z. B. unter dem Taschenrechner) eine leere
Liste zum Reinrendern hinzu:

```html
<ul id="history"></ul>
```

Dann in `script.js`:

```js
const historyElement = document.getElementById("history");
const history = [];

function recordHistory(a, operator, b, result) {
  history.push(a + " " + operator + " " + b + " = " + result);
  historyElement.innerHTML = history
    .map((entry) => "<li>" + entry + "</li>")
    .join("");
}
```

- [`.push(...)`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/push) fügt einem Array ein Element am Ende hinzu.
- [`.map(...)`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/map) baut ein *neues* Array, indem eine Funktion auf jedes Element eines bestehenden angewendet wird: Hier wird jeder Verlaufseintrag in einen `<li>...</li>`-String verwandelt. `.join("")` klebt dieses Array aus Strings anschließend zu einem einzigen zusammen, bereit für `innerHTML`.

Ruf `recordHistory(...)` mit denselben vier Werten auf, direkt bevor
`equals()` `this.currentValue` aktualisiert.

## 🔴 Optional, echte Herausforderung — Klammern in der GUI

Füg `(`- und `)`-Buttons hinzu und berechne, statt Schritt für Schritt mit
jeweils zwei Zahlen, den *gesamten* Ausdruck als String (z. B.
`"(3+4)*2"`) auf einmal, sobald Gleich gedrückt wird, unter Berücksichtigung
von Klammern und der normalen Rechenreihenfolge. Das bedeutet, einen eigenen
kleinen Parser zu schreiben: einen Tokenizer plus eine Funktion, die
Klammern und Rechenreihenfolge respektiert. Das ist dasselbe Problem, das
die optionale Klammer-Parser-Herausforderung in
[Kurs 2 – Taschenrechner Konsole](../../02-calculator-console/de/01-taschenrechner-konsole.md)
angeht, falls du eine Musterlösung zum Vergleichen willst; andernfalls ist es
eine befriedigende Sache, sie von Grund auf selbst zu bauen.

## Probier es selbst

Klick `3`, `+`, `4`, `×`, `2`, `=`, und du solltest Folgendes sehen:

![Die Anzeige des Taschenrechners zeigt 14, nach dem Klicken von 3, +, 4, ×, 2, =](../assets/result-14.png)

Beachte: Hier steht `14`, Schritt für Schritt berechnet (3 + 4 = 7, dann
7 × 2 = 14), von links nach rechts, so wie einfache Taschenrechner
funktionieren, *nicht* die mathematisch "korrekte" Rechenreihenfolge (die
`11` ergeben würde). Nur ein selbstgeschriebener Parser (siehe die optionale
Herausforderung oben) berücksichtigt die volle Rechenreihenfolge; dieser
einfache GUI-Taschenrechner tut das bewusst nicht, genau wie die meisten
echten Taschenrechner auch.

Öffne [`courses/03-calculator-gui/code/index.html`](../code/index.html) in
deinem Browser. Ein Doppelklick auf die Datei genügt, da alles lokal läuft
und keine externen Anfragen stattfinden. Wenn du lieber komfortabel
speichern-und-neu-laden möchtest, aktualisiert VS Codes
[Live-Server-Erweiterung](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
die Seite automatisch bei jedem Speichern.

## Zwischenstand & was du gelernt hast

- HTML-Struktur, CSS für Layout/Aussehen, JavaScript für Verhalten
- Das DOM: Elemente finden, `data-*`-Attribute auslesen
- Events: `addEventListener`
- Eine kleine, reine Rechen-Funktion, angeschlossen an eine echte Oberfläche
- Klassen: `constructor`, `this`, Methoden, ein bewusst kleiner erster Schritt in Richtung OOP
- *(optional)* Einen eigenen, klammer-respektierenden Parser schreiben

## Wie es weitergeht

Dieser Kurs steht für sich: Du hast einen vollständigen Taschenrechner mit
echter Oberfläche gebaut. Falls noch nicht geschehen: [Kurs 2 – Taschenrechner Konsole](../../02-calculator-console/de/01-taschenrechner-konsole.md)
löst dasselbe Problem ohne grafische Oberfläche; ein Blick lohnt sich, um
die beiden Ansätze zu vergleichen, ist aber nicht Voraussetzung. Eine
breitere Auswahl, was als Nächstes kommen könnte, steht in
[PROJECT-IDEAS.de.md](../../../PROJECT-IDEAS.de.md).
