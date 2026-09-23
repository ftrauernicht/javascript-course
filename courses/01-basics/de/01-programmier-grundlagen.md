🇩🇪 Deutsch | 🇬🇧 [English](../en/01-programming-basics.md)

[← Zurück zur Kursübersicht](../../../README.de.md) · Zurück: [Kapitel 0 – Einleitung & Werkzeuge](00-einleitung.md) · Weiter: [Kurs 2](../../02-calculator-console/de/01-taschenrechner-konsole.md) oder [Kurs 3](../../03-calculator-gui/de/01-taschenrechner-gui.md) →

# Kapitel 1 – Programmier-Grundlagen

**Ziel:** bevor irgendetwas gebaut wird, einen Überblick über die kleine
Menge an Bausteinen bekommen, die sich fast jede Programmiersprache teilt:
Werte, Variablen, Operatoren, die drei Arten von Klammern, Funktionen,
Entscheidungen und Wiederholung. Kapitel 0 hat gezeigt, *wie* man in die
Konsole tippt; dieses Kapitel zeigt, *was* man dort eintippen darf. Nichts
davon ist Wegwerfwissen. Kurs 2 und Kurs 3 verwenden jeden einzelnen dieser
Bausteine, um jeweils einen Taschenrechner zu bauen.

Lass die Konsole aus [Kapitel 0](00-einleitung.md) offen und probier die
Beispiele direkt aus.

## 🟢 Kern — Werte und ihre Typen

Ein **Wert** ist ein einzelnes Stück Daten. Die drei Arten, die du ständig
brauchen wirst:

```js
42          // eine Zahl (number)
"hello"     // ein String (Text) — einfache oder doppelte Anführungszeichen gehen beide
true        // ein Boolean — immer nur true oder false
```

JavaScript verrät dir den Typ eines Werts auf Wunsch mit dem Operator
[`typeof`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/typeof),
praktisch, um ein Gefühl dafür zu bekommen:

```js
typeof 42        // "number"
typeof "hello"    // "string"
typeof true      // "boolean"
```

Es gibt noch ein paar weitere Typen: Arrays und Objekte sind die wichtigsten
davon. Dieser Kurs deckt sie nicht ausführlich ab; du bekommst genau so
viel Array-Wissen, wie du brauchst, direkt dort erklärt, wo ein späterer
Kurs es tatsächlich benötigt (Kurs 3 tut das). Vollständige Liste:
[MDN – Datentypen](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Data_structures).

## 🟢 Kern — Variablen: einem Wert einen Namen geben

Eine Variable ist eine benannte Box, in die du einen Wert legen und später
wieder herausholen kannst:

```js
let alter = 16;
const name = "Alex";
```

Nutze [`let`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/let)
für einen Wert, der sich später ändern kann, und
[`const`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/const)
für einen, der nicht neu zugewiesen werden soll. (In älterem Code oder
Tutorials taucht manchmal noch `var` auf: die ursprüngliche Art, eine
Variable zu deklarieren, aus Gründen der Abwärtskompatibilität noch
vorhanden, mit ein paar wirklich verwirrenden Eigenheiten, die `let` und
`const` beheben sollten. Es gibt heute keinen Grund mehr, danach zu greifen;
mehr dazu: [MDN – var](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/var).)

Ein Variablenname muss mit einem Buchstaben, `$` oder `_` beginnen, ist
groß-/kleinschreibungssensitiv (`alter` und `Alter` sind zwei verschiedene
Variablen) und wird per Konvention in `camelCase` geschrieben: erstes Wort
klein, jedes weitere Wort mit großem Anfangsbuchstaben (`vorname`,
`gesamtPunktzahl`).

## 🟢 Kern — Operatoren: mit Werten etwas tun

Die arithmetischen kennst du schon
(`+` `-` `*` `/` `%` `**`, siehe
[MDN – Arithmetische Operatoren](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators#arithmetic_operators)).
Drei weitere Familien sind genauso wichtig:

**Zuweisung**: `=` speichert einen Wert; die anderen sind Kurzschreibweisen
für "nimm den aktuellen Wert, tu etwas damit, speichere ihn zurück":

```js
let punkte = 10;
punkte += 5;  // dasselbe wie: punkte = punkte + 5;  → 15
punkte *= 2;  // dasselbe wie: punkte = punkte * 2;  → 30
```

**Vergleich**: eine Ja/Nein-Frage über zwei Werte stellen:

```js
5 === 5    // true  (strikte Gleichheit: gleicher Wert UND gleicher Typ)
5 === "5"  // false (eine Zahl ist nie vom gleichen Typ wie ein String)
5 !== 3    // true  (ungleich)
5 < 10     // true
5 >= 5     // true
```

Nutze `===` und `!==`, nicht `==` und `!=`. Die Zwei-Gleichheitszeichen-
Varianten versuchen erst, die Werte passend zu konvertieren, bevor sie
vergleichen (`5 == "5"` ergibt `true`!), was mehr verwirrende Fehler
verursacht, als es an Tipparbeit spart. Dieser Kurs nutzt überall bewusst
die strikte Gleichheit. Details:
[MDN – Gleichheitsvergleiche](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness).

**Logisch**: Wahr/Falsch-Werte verknüpfen oder umkehren:

```js
true && false   // false ("und" — beide Seiten müssen wahr sein)
true || false   // true  ("oder" — mindestens eine Seite muss wahr sein)
!true           // false ("nicht" — kehrt den Wert um)
```

Vollständige Referenz:
[MDN – Ausdrücke und Operatoren](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Expressions_and_operators).

**Ternär (bedingt)**: ein kompaktes, einzeiliges if/else, das einen *Wert*
liefert statt einen Block auszuführen:

```js
const alter = 16;
const bezeichnung = alter >= 18 ? "erwachsen" : "minderjährig";
// bezeichnung ist "erwachsen", wenn alter >= 18, sonst "minderjährig"
```

Lies `bedingung ? wertWennWahr : wertWennFalsch` von links nach rechts. Am
nützlichsten für kurze Entweder-oder-Entscheidungen wie diese; für alles
Längere liest sich ein vollständiges `if`/`else` (unten) klarer. Mehr:
[MDN – Bedingter (ternärer) Operator](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Conditional_operator).

## 🟢 Kern — Die drei Arten von Klammern

Anfänger verwechseln diese ständig; es lohnt sich, sie als drei
unterschiedliche Werkzeuge zu lernen statt als "irgendwelche Schnörkel":

**Runde Klammern `()`** haben zwei Aufgaben. Gruppierung, um die
Rechenreihenfolge zu steuern, genau wie in der Mathematik:

```js
(2 + 3) * 4  // 20, nicht 14
```

...und das Aufrufen einer Funktion, oder das Auflisten dessen, was sie
entgegennimmt:

```js
console.log("hi");           // console.log mit einem Wert aufrufen
function add(a, b) { ... }   // a und b stehen in runden Klammern
```

**Geschweifte Klammern `{}`** markieren einen **Block**: eine Gruppe von
Anweisungen, die zusammengehören und als eine Einheit ausgeführt werden. Du
findest sie um den Körper einer Funktion, um den Körper eines `if`s und um
den Körper einer Schleife (beides kommt gleich in diesem Kapitel). Ein Block
ist ein Behälter, kein Wert für sich. Mehr dazu:
[MDN – Block-Anweisung](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/block).

**Eckige Klammern `[]`** stehen für Arrays (geordnete Listen von Werten)
und dafür, ein einzelnes Element über seine Position auszulesen:

```js
const farben = ["rot", "grün", "blau"];
farben[0]; // "rot" — gezählt wird ab 0, nicht ab 1
```

Genau wie bei den anderen Typen bekommst du auch hier nur so viel, wie du
gerade brauchst; der Rest folgt dort, wo Kurs 3 Arrays tatsächlich einsetzt.
Erkenne für jetzt einfach die Form wieder, wenn
du sie siehst. Mehr:
[MDN – Indizierte Sammlungen](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Indexed_collections).

## 🟢 Kern — Funktionen: einem Verhalten einen Namen geben

Die baust du richtig, praktisch, in Kurs 2 oder Kurs 3; für jetzt nur die
Form, damit dir später nichts unbekannt vorkommt:

```js
function add(a, b) {
  return a + b;
}

add(3, 4); // 7
```

`a` und `b` sind **Parameter**: Platzhalter für die Werte, die beim Aufruf
der Funktion tatsächlich übergeben werden. `return` gibt einen Wert an die
Stelle zurück, die die Funktion aufgerufen hat. Mehr:
[MDN – Funktionen](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Functions).

## 🟢 Kern — Entscheidungen treffen: if / else

```js
const temperatur = 8;

if (temperatur < 10) {
  console.log("Jacke anziehen.");
} else if (temperatur < 20) {
  console.log("Ein leichter Pullover reicht.");
} else {
  console.log("Shorts-Wetter!");
}
```

JavaScript prüft die Bedingungen von oben nach unten und führt den Block der
ersten Bedingung aus, die `true` ergibt; der Rest wird komplett
übersprungen. `else` (und `else if`) sind beide optional. Mehr:
[MDN – if...else](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/if...else).

## 🟢 Kern — Sich wiederholen: Schleifen

Eine **Schleife** führt denselben Code-Block mehrfach aus. Die
[`for`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for)-Schleife
ist das Arbeitspferd, wenn du ungefähr weißt, wie oft du etwas wiederholen
willst:

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

Ihre drei Teile, durch Semikolons getrennt: **Start** (`let i = 1`, läuft
einmal, bevor irgendetwas anderes passiert), **Bedingung** (`i <= 5`, wird
vor jedem Durchlauf geprüft; die Schleife stoppt in dem Moment, in dem das
`false` ergibt) und **Schritt** (`i++`, läuft nach jedem Durchlauf). `i++`
ist die Kurzform für `i = i + 1`; Details:
[MDN – Inkrement](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Increment).

[`while`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/while)
ist die einfachere Schwester, für den Fall, dass du die genaue Anzahl vorher
nicht kennst; sie läuft einfach weiter, solange ihre Bedingung wahr bleibt:

```js
let zaehler = 0;
while (zaehler < 3) {
  console.log("Hallo!");
  zaehler++;
}
```

**Probier es selbst:** Schreib eine `for`-Schleife, die die Zahlen 1 bis 10
ausgibt. Schreib dann eine, die nur die geraden Zahlen ausgibt, indem du mit
`%` prüfst: "Ist diese Zahl durch 2 teilbar?".

## 🟡 Optional — Kommentare

```js
// ein einzeiliger Kommentar
/* ein
   mehrzeiliger
   Kommentar */
```

Der Computer ignoriert Kommentare komplett; sie sind Notizen für Menschen,
die den Code lesen, auch für dein zukünftiges Ich. Guter Stil (und die
eigene Regel dieses Kurses) ist, das *Warum* zu kommentieren, nicht das
*Was*: Wenn der Code schon zeigt, was er tut, fügt ein Kommentar, der das
wiederholt, nur Lärm hinzu. Mehr:
[MDN – Kommentare](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Lexical_grammar#comments).

## 🟡 Optional — Truthy und Falsy

Innerhalb der Bedingung eines `if` akzeptiert JavaScript *jeden* Wert, nicht
nur `true`/`false`; manche Werte werden automatisch wie `false` behandelt
("falsy"): `0`, `""` (leerer String), `null`, `undefined` und `NaN` (kurz
für "Not a Number", was bei einer ungültigen Rechenoperation herauskommt,
z. B. `0 / 0`). Alles andere ist "truthy". Das bleibt meistens unsichtbar,
bis es dich einmal überrascht. Gut zu wissen, dass es existiert. Mehr:
[MDN – Truthy](https://developer.mozilla.org/de/docs/Glossary/Truthy),
[MDN – Falsy](https://developer.mozilla.org/de/docs/Glossary/Falsy).

## 🔴 Optional, echte Herausforderung — FizzBuzz

Eine kleine, berühmte Übung, die Schleifen, Bedingungen und den
Modulo-Operator (`%`) gemeinsam trainiert, ein solider Abschluss, bevor es
weiter zu Kurs 2 oder Kurs 3 geht:

> Durchlaufe die Zahlen 1 bis 15. Gib für jede aus: `"Fizz"`, wenn sie durch
> 3 teilbar ist, `"Buzz"`, wenn sie durch 5 teilbar ist, `"FizzBuzz"`, wenn
> sie durch beides teilbar ist, sonst die Zahl selbst.

Probier es selbst, bevor du weiterliest; du hast aus diesem Kapitel allein
schon jedes nötige Werkzeug (eine `for`-Schleife, `if`/`else if`/`else` und
`%`). Ein Tipp, falls du einen willst: Prüf "durch beides teilbar", *bevor*
du eines der beiden einzeln prüfst, sonst kommt der speziellere Fall nie
zum Zug.

## Was du gelernt hast

- Werte und ihre Typen (`number`, `string`, `boolean`) und `typeof`
- Variablen (`let`, `const`)
- Operatoren: arithmetisch, Zuweisung, Vergleich (`===` statt `==`), logisch, ternär
- Die drei Klammerarten: `()` Gruppierung/Aufruf, `{}` Blöcke, `[]` Arrays
- Funktionen, in ihrer Form (Parameter, `return`)
- Bedingungen (`if`/`else if`/`else`)
- Schleifen (`for`, `while`)
- *(optional)* Kommentare, Truthy/Falsy

## Weiter

Das war das letzte Kapitel von Kurs 1. Jeder andere Kurs in diesem
Repository baut nur auf diesem hier auf. Keiner setzt einen der anderen
voraus, wähl also, was dich mehr reizt:

- [Kurs 2 – Taschenrechner Konsole](../../02-calculator-console/de/01-taschenrechner-konsole.md): ein Taschenrechner, komplett in der Browser-Konsole.
- [Kurs 3 – Taschenrechner GUI](../../03-calculator-gui/de/01-taschenrechner-gui.md): dieselbe Idee, mit einer echten, klickbaren Oberfläche.
- [Kurs 4 – To-Do-Liste](../../04-todo-list/de/01-to-do-liste.md): Aufgaben hinzufügen, abhaken und entfernen, gespeichert über Besuche hinweg.
- [Kurs 5 – Einheitenumrechner](../../05-unit-converter/de/01-einheitenumrechner.md): Länge, Gewicht und Temperatur umrechnen.
- [Kurs 6 – Quiz](../../06-quiz/de/01-quiz.md): ein Multiple-Choice-Quiz mit Punktestand.
- [Kurs 7 – Memory-Spiel](../../07-memory-game/de/01-memory-spiel.md): ein Karten-Memory-Spiel.
- [Kurs 8 – Wetter-App](../../08-weather-app/de/01-wetter-app.md): echtes, aktuelles Wetter für eine beliebige eingetippte Stadt.
- [Kurs 9 – Budget-Tracker](../../09-budget-tracker/de/01-budget-tracker.md): Einnahmen und Ausgaben mit einem Kategorie-Diagramm.
- [Kurs 10 – REST-API](../../10-rest-api/de/01-rest-api.md): ein kleiner Server, gebaut mit Node.js und Express.
- [Kurs 11 – Full-Stack-Notizen-App](../../11-notes-app/de/01-notizen-app.md): ein Frontend und ein Backend, die über eine echte Datenbank miteinander sprechen.

So oder so wird jeder einzelne dieser Bausteine Teil eines echten Programms.
