🇩🇪 Deutsch | 🇬🇧 [English](../en/00-introduction.md)

[← Zurück zur Kursübersicht](../../../README.de.md) · Weiter: [Kapitel 1 – Programmier-Grundlagen](01-programmier-grundlagen.md) →

# Kapitel 0 – Einleitung & Werkzeuge

## Was ist JavaScript, und warum starten wir in der Konsole?

JavaScript ist die Programmiersprache, die in jedem Webbrowser eingebaut ist.
Sie sorgt dafür, dass Webseiten etwas *tun* — auf Klicks reagieren, Texte
aktualisieren, ein Formular prüfen — statt nur dazuliegen wie ein
ausgedrucktes Blatt Papier. Mehr dazu bei MDN:
["Was ist JavaScript?"](https://developer.mozilla.org/de/docs/Learn_web_development/Core/Scripting/What_is_JavaScript).

Jeder Browser bringt außerdem eine **Entwicklerkonsole** mit: einen Ort, an
dem man JavaScript eintippen und sofort ausführen kann — ganz ohne Dateien,
Installation oder Einrichtung. Dieses unmittelbare Feedback — etwas
eintippen, das Ergebnis sehen — ist der beste Weg, die Grundbausteine einer
Sprache zu lernen. Deshalb spielt sich dieses gesamte erste Kapitel dort ab.

## Die Konsole öffnen

- **Chrome / Edge:** `Strg+Shift+J` (Windows/Linux) bzw. `Cmd+Option+J`
  (Mac). Alternativ: Rechtsklick irgendwo auf der Seite → *Untersuchen* →
  Reiter *Konsole*. Details:
  [Chrome DevTools – Konsole öffnen](https://developer.chrome.com/docs/devtools/console/)
- **Firefox:** `Strg+Shift+K` (Windows/Linux) bzw. `Cmd+Option+K` (Mac).
  Details:
  [Firefox DevTools – Web-Konsole](https://firefox-source-docs.mozilla.org/devtools-user/web_console/)

Öffne sie jetzt, auf einer beliebigen Seite (auch auf dieser hier, falls du
sie auf GitHub liest). Du solltest ein leeres Panel mit einem blinkenden
Cursor sehen, bereit für Eingaben.

## Deine erste Zeile JavaScript

Klick in die Konsole und tippe:

```js
1 + 1
```

Drück <kbd>Enter</kbd>. Es sollte `2` erscheinen. Das war's — du hast gerade
dein erstes Programm ausgeführt.

Probier noch etwas:

```js
console.log("Hallo Welt!");
```

`console.log(...)` ist die Art, wie JavaScript absichtlich etwas ausgibt
(statt einfach nur das Ergebnis der letzten Zeile anzuzeigen, wie es `1 + 1`
oben getan hat). Du wirst das ständig benutzen, um zu sehen, was dein Code
gerade tut — stell es dir vor wie JavaScripts Art, dir zu antworten.
Nachschlagen: [MDN – console.log()](https://developer.mozilla.org/de/docs/Web/API/console/log_static).

Kurz zum Semikolon (`;`) am Zeilenende: JavaScript funktioniert meistens auch
ohne, aber es zu schreiben ist die übliche Konvention und vermeidet später
ein paar verwirrende Sonderfälle. Dieser Kurs verwendet es durchgehend — mach
es gerne genauso.

## Ein Texteditor, für später

Dieser Kurs (Kurs 1 – Basics) bleibt komplett in der Konsole — noch kein
Editor nötig. In Kurs 3 – Taschenrechner GUI schreibst du echte Dateien
(HTML, CSS, JavaScript), und dafür lohnt sich ein richtiger Texteditor statt
der Konsole. (Kurs 2 – Taschenrechner Konsole bleibt, genau wie dieser hier,
in der Konsole.)
[Visual Studio Code](https://code.visualstudio.com/) ist kostenlos, läuft
unter Windows/Mac/Linux und ist der meistgenutzte Editor für Webentwicklung —
installier ihn, wann immer du willst, es eilt noch nicht.

## Wie dieser Kurs aufgebaut ist

Jedes Kapitel folgt demselben Muster:

- 🟢 **Kern** — der Pflichtteil. Den schließt du ab, bevor es zum nächsten
  Kapitel geht.
- 🟡 **Optional, mehr Übung** — vertieft dieselben Ideen des Kapitels noch
  etwas. Gut zu machen, aber nicht Pflicht.
- 🔴 **Optional, echte Herausforderung** — ein anspruchsvolleres Zusatzziel,
  das manchmal ein Konzept vorzieht, das eigentlich erst später drankäme. Es
  ist völlig in Ordnung, wenn es beim ersten Versuch nicht klappt — du kannst
  jederzeit nach einem späteren Kapitel zurückkommen.

Die Kapitel bauen absichtlich aufeinander auf, und die Kurse genauso: Alles
aus diesem Kurs gilt als bekannt vorausgesetzt für jeden Kurs, der danach
kommt. Kurs 2 und Kurs 3 zum Beispiel knüpfen beide unmittelbar dort an, wo
dieser hier aufhört — unabhängig voneinander. Heb also auf, was du
schreibst; du brauchst es wieder.

Noch etwas zur Sprache: Dieser Kurs liegt als getrennte, parallele Dateien
auf Deutsch und Englisch vor — lies, was dir leichter fällt. **Der Code
selbst und seine Kommentare sind immer auf Englisch**, so wie es in echten
Software-Teams unabhängig von der gesprochenen Sprache üblich ist. Links zum
Weiterlesen (meistens zu [MDN Web Docs](https://developer.mozilla.org/de/),
dem Standard-Nachschlagewerk für JavaScript) stehen direkt im Text, dort wo
ein neuer Begriff zum ersten Mal auftaucht — statt am Ende in einem Glossar
gesammelt zu werden.

## Bereit?

Weiter zu [Kapitel 1 – Programmier-Grundlagen](01-programmier-grundlagen.md).
