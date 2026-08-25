🇩🇪 Deutsch | 🇬🇧 [English](PROJECT-IDEAS.md)

[← Zurück zur Repository-Übersicht](README.de.md) · Kommt nach: [Kurs 2 – Taschenrechner Konsole](courses/02-calculator-console/de/01-taschenrechner-konsole.md), [Kurs 3 – Taschenrechner GUI](courses/03-calculator-gui/de/01-taschenrechner-gui.md) und [Kurs 4 – To-Do-Liste](courses/04-todo-list/de/01-to-do-liste.md)

# Ideen für deine nächsten Projekte

Kurs 2, Kurs 3 und Kurs 4 (der Taschenrechner, zweimal, und eine To-Do-Liste)
decken die Grundlagen ausführlich ab — Variablen, Funktionen, das DOM, Daten
als HTML rendern, ein erster Schritt in Richtung OOP. Was danach kommt,
liegt bei dir: hier ist eine sortierte Liste an Projektideen, grob geordnet
von "naheliegender nächster Schritt" bis "wirklich ambitioniert", jeweils
mit den wichtigsten neuen Fähigkeiten, die sie dir vermitteln würden. Wähl,
was dir am meisten Spaß macht — Motivation zählt mehr als das strikte
Einhalten der Reihenfolge. Jede dieser Ideen könnte der Kurs 5 dieses
Repositories werden — oder einfach dein eigenes Nebenprojekt.

| # | Projekt | Neue Fähigkeiten, zusätzlich zu dem, was du schon kannst | Schwierigkeit |
|---|---|---|---|
| 1 | ~~To-Do-Liste~~ — Aufgaben hinzufügen, entfernen und abhaken | ✅ Gebaut — siehe [Kurs 4 – To-Do-Liste](courses/04-todo-list/de/01-to-do-liste.md) | ⭐ |
| 2 | **Einheitenumrechner** — Länge, Gewicht, Temperatur | Formulare, `<select>`-Dropdowns, weitere kleine reine Funktionen wie `calculate` | ⭐ |
| 3 | **Multiple-Choice-Quiz** — Fragen, Punktestand, ein Ergebnisbildschirm | Arrays von Objekten, eine `Question`-Klasse, bedingtes Rendern | ⭐⭐ |
| 4 | **Memory-Spiel** — Karten umdrehen, Paare finden | Spielzustand, [`setTimeout`](https://developer.mozilla.org/de/docs/Web/API/Window/setTimeout), CSS-Übergänge/Animationen | ⭐⭐ |
| 5 | **Wetter-App** — echtes Wetter für eine eingetippte Stadt | [`fetch`](https://developer.mozilla.org/de/docs/Web/API/Window/fetch), `async`/`await`, Arbeiten mit einer öffentlichen API und echtem JSON, Umgang mit Netzwerkfehlern | ⭐⭐⭐ |
| 6 | **Budget-Tracker** — Einnahmen/Ausgaben, laufende Summen, Kategorien | Array-Methoden (`filter`, `map`, `reduce`), fortgeschrittenere Persistenz, ein erstes einfaches Diagramm | ⭐⭐⭐ |
| 7 | **Eine kleine REST-API mit Node.js + Express** — dein eigener kleiner Server | [Node.js](https://nodejs.org/), npm, [Express](https://expressjs.com/), erstmals JavaScript außerhalb des Browsers ausführen | ⭐⭐⭐⭐ |
| 8 | **Vollwertige Notiz-App** — dein Frontend im Stil von Idee 5 spricht mit deinem eigenen Backend im Stil von Idee 7 und speichert Notizen in einer echten Datenbank | Frontend und Backend verbinden, eine Datenbank (z. B. SQLite), vollständiges CRUD (Create/Read/Update/Delete) | ⭐⭐⭐⭐ |
| 9 | **Etwas mit einem Frontend-Framework neu bauen** (React oder Vue) — z. B. die To-Do-Liste oder den Taschenrechner | Komponentenbasiertes Denken, vom Framework verwalteter Zustand, eine Build-Toolchain | ⭐⭐⭐⭐ |
| 10 | **Ein kleines Echtzeit-Mehrspieler-Spiel** — z. B. Tic-Tac-Toe live gegen eine andere Person | [WebSockets](https://developer.mozilla.org/de/docs/Web/API/WebSockets_API), Echtzeitkommunikation, grundlegende Spielarchitektur | ⭐⭐⭐⭐⭐ |

Ein paar Anmerkungen zum Lesen dieser Liste:

- Ideen 2–4 brauchen nichts über das hinaus, was Kurs 2, Kurs 3 und Kurs 4
  schon vermittelt haben — dieselben Werkzeuge, neue Arten von Problemen.
- Idee 5 ist der natürliche Punkt, um "alles passiert sofort in meinem
  eigenen Code" hinter sich zu lassen und mit der Außenwelt umzugehen
  (Netzwerke sind langsam und schlagen manchmal fehl — das ist selbst eine
  Fähigkeit).
- Bei den Ideen 7–8 hört JavaScript auf, "nur eine Browsersprache" zu sein —
  dieselbe Sprache, aber auf einem Server laufend.
- Idee 9 kommt bewusst *nachdem* du ein paar Dinge von Hand gebaut hast:
  Frameworks ergeben am meisten Sinn, sobald man die Probleme selbst gespürt
  hat, die sie lösen.

Egal wofür du dich entscheidest: Dieselben Gewohnheiten aus Kurs 2, Kurs 3
und Kurs 4 gelten weiter — zuerst die Kernversion bauen, sie einfach halten,
und erst dann zur
optionalen, schwierigeren Variante eines Features greifen, wenn die einfache
funktioniert.
