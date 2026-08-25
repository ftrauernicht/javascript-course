🇩🇪 Deutsch | 🇬🇧 [English](../en/01-calculator-console.md)

[← Zurück zur Kursübersicht](../../../README.de.md) · Zurück: [Kurs 1 – Basics](../../01-basics/de/01-programmier-grundlagen.md)

# Kapitel 1 – Taschenrechner in der Konsole

**Ziel:** einen Taschenrechner bauen, der addieren, subtrahieren,
multiplizieren und dividieren kann — zuerst durch das Eintippen einzelner
Ausdrücke, dann mit einer eigenen, wiederverwendbaren Funktion. Alles in
diesem Kapitel spielt sich in der Browser-Konsole aus
[Kurs 1 – Basics](../../01-basics/de/00-einleitung.md) ab.

## 🟢 Kern — Direkt rechnen

Die Konsole versteht Rechenoperationen genau wie ein Taschenrechner. Probier
Folgendes nacheinander aus:

```js
3 + 4
10 - 2
6 * 7
20 / 4
7 % 2   // Rest / Modulo: was bleibt beim Teilen von 7 durch 2 übrig? → 1
2 ** 8  // Potenz: 2 hoch 8 → 256
```

JavaScript hält sich an dieselbe Rechenreihenfolge, die du aus der Schule
kennst (Punkt- vor Strichrechnung), also ergibt `3 + 4 * 2` korrekt `11`,
nicht `14`. Vollständige Liste der Operatoren:
[MDN – Arithmetische Operatoren](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators#arithmetic_operators).

## 🟢 Kern — Variablen: Zahlen mit Namen aufbewahren

Eine **Variable** ist eine benannte Box, in die du einen Wert legen und
später wieder herausholen kannst.

```js
let a = 5;
let b = 3;
let ergebnis = a + b;
console.log(ergebnis); // 8
```

Nutze `let` für einen Wert, der sich später ändern kann, und
[`const`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/const)
für einen, der nicht neu zugewiesen werden soll — z. B. `const pi = 3.14159;`.
Details zu `let`: [MDN – let](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/let).

**Probier es selbst:** speichere zwei Zahlen in Variablen und berechne ihr
Produkt sowie ihren Rest.

## 🟢 Kern — Funktionen: eine wiederverwendbare Maschine

`3 + 4` einzutippen funktioniert, aber es berechnet immer nur genau diese
eine Sache. Eine **Funktion** ist eine kleine, wiederverwendbare Maschine: du
gibst ihr Eingaben (*Parameter*), sie gibt dir eine Ausgabe zurück
(*Rückgabewert*).

```js
function add(a, b) {
  return a + b;
}

add(3, 4); // 7
add(10, 20); // 30
```

Nachschlagen: [MDN – Funktionen](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Functions).

Jetzt verallgemeinern wir `add` zu einer echten Taschenrechner-Funktion, die
zusätzlich einen *Operator* entgegennimmt und danach entscheidet, was zu tun
ist. Dafür braucht es eine Bedingung — eine Möglichkeit für Code, zwischen
mehreren Pfaden zu wählen. Das passende Werkzeug für "wähle eine von mehreren
exakten Übereinstimmungen" ist
[`switch`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/switch)
(eine [`if`/`else`-Kette](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/if...else)
würde ebenfalls funktionieren — es gibt oft mehr als einen richtigen Weg,
etwas zu schreiben):

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
calculate(6, "?", 2);  // gibt eine Warnung aus, liefert undefined
```

Die Schreibweise `` `Unknown operator: "${operator}"` `` ist ein
[Template Literal](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Template_literals) —
Backticks statt Anführungszeichen erlauben es, eine Variable direkt mit
`${...}` in einen Text einzusetzen.

**Probier es selbst:** ruf `calculate` mit allen vier Operatoren und
verschiedenen Zahlen auf. Erweitere den `switch` anschließend um zwei
weitere Fälle: `"%"` für den Rest und `"**"` für die Potenz.

## 🟡 Optional — Division durch null sauber behandeln

Division durch null lässt JavaScript nicht abstürzen — `10 / 0` liefert
still und leise `Infinity` (und `0 / 0` liefert
[`NaN`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/NaN),
"Not a Number"). Das ist selten das, was der Nutzer eines Taschenrechners
eigentlich erwartet. Ergänze den `"/"`-Fall um eine Schutzabfrage:

```js
case "/":
  if (b === 0) {
    console.warn("Cannot divide by zero.");
    return undefined;
  }
  return a / b;
```

Nachschlagen: [MDN – Infinity](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Infinity).

## 🔴 Optional, echte Herausforderung — Mit Klammern rechnen

`calculate` verarbeitet genau eine Rechenoperation zwischen zwei Zahlen. Ein
echter Ausdruck wie `"(3 + 4) * 2"` enthält mehr als eine Operation *und*
Klammern, die die normale Rechenreihenfolge außer Kraft setzen — `calculate`
allein kann das nicht als Ganzes auswerten. Das zum Laufen zu bringen ist ein
kleines, echtes Parsing-Problem — und ein guter erster Vorgeschmack darauf,
was "Parsen" überhaupt bedeutet.

Die Idee, in zwei Schritten:

1. **Tokenisieren** — den String `"(3 + 4) * 2"` in eine flache Liste von
   Einzelteilen zerlegen: `["(", "3", "+", "4", ")", "*", "2"]`. Das läuft
   einfach Zeichen für Zeichen durch den String, fasst zusammenhängende
   Ziffern zusammen und behandelt `(`, `)`, `+`, `-`, `*`, `/` jeweils als
   eigenes Element.
2. **Parsen** — diese Liste von Tokens lesen und ein Ergebnis berechnen,
   dabei Klammern respektieren und berücksichtigen, dass `*`/`/` stärker
   binden als `+`/`-`. Der klassische, elegante Weg dafür ist ein
   **rekursiver Abstiegs-Parser** (recursive descent parser): eine Funktion
   pro "Rangstufe" der Rechenreihenfolge, wobei jede Stufe die nächsttiefere
   aufruft und — bei Klammern — ganz nach oben zurückspringt. Hintergrund:
   [Wikipedia – Parser (Abschnitt "Rekursiver Abstiegsparser")](https://de.wikipedia.org/wiki/Parser#Parser_f%C3%BCr_kontextfreie_Grammatiken),
   [MDN – Rekursion](https://developer.mozilla.org/de/docs/Glossary/Recursion).

Eine vollständige, kommentierte Musterlösung liegt in
[`courses/02-calculator-console/code/bracket-parser.js`](../code/bracket-parser.js).
Öffne sie, lies sie in Ruhe durch und versuch,
`evaluateExpression("(3 + 4) * 2")` von Hand nachzuvollziehen, Funktionsaufruf
für Funktionsaufruf, bevor du sie ausführst. Einmal in die Konsole geladen:

```js
evaluateExpression("(3 + 4) * 2"); // 14
evaluateExpression("2 + 3 * 4");   // 14
evaluateExpression("(2 + 3) * (4 - 1)"); // 15
```

Das soll schwierig sein — es ist das erste wirklich "programmierertypische"
Problem in diesem Kurs, keine bloß längere Version von dem, was vorher kam.
Sie ist nicht nötig, um den Kurs abzuschließen — wenn es beim ersten Mal noch
nicht klickt, ist das völlig in Ordnung, komm einfach zurück, wann immer du
magst. (Eine verlockende Abkürzung
wäre JavaScripts eingebautes
[`eval()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/eval),
das einen solchen String tatsächlich auswerten würde. Das steht hier nur der
Vollständigkeit halber — `eval` auf etwas anzuwenden, dem man nicht restlos
vertraut, ist ein bekanntes Sicherheitsrisiko, und der eigene kleine Parser
lehrt ohnehin deutlich mehr.)

## Was du gelernt hast

- Direktes Rechnen und JavaScripts Rechenreihenfolge
- Variablen (`let`, `const`)
- Funktionen: Parameter, Rückgabewerte, Wiederverwendbarkeit
- Bedingungen (`switch`, `if`/`else`)
- Template Literals
- *(optional)* Einen kleinen Ausdruck tokenisieren und rekursiv parsen

## Weiter

Dieser Kurs steht für sich — du hast einen vollständigen Taschenrechner
gebaut. Wenn du dasselbe Problem gerne mit einer echten, klickbaren
Oberfläche statt der Konsole lösen möchtest, deckt
[Kurs 3 – Taschenrechner GUI](../../03-calculator-gui/de/01-taschenrechner-gui.md)
genau das ab — auch er setzt diesen Kurs nicht voraus, fang also an, wo es
dich mehr reizt. Eine breitere Auswahl, was als Nächstes kommen könnte,
steht in [PROJECT-IDEAS.de.md](../../../PROJECT-IDEAS.de.md).
