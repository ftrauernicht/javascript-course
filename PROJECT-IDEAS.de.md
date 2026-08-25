🇩🇪 Deutsch | 🇬🇧 [English](PROJECT-IDEAS.md)

[← Zurück zur Repository-Übersicht](README.de.md) · Kommt nach: [Kurs 2 – Taschenrechner Konsole](courses/02-calculator-console/de/01-taschenrechner-konsole.md), [Kurs 3 – Taschenrechner GUI](courses/03-calculator-gui/de/01-taschenrechner-gui.md), [Kurs 4 – To-Do-Liste](courses/04-todo-list/de/01-to-do-liste.md), [Kurs 5 – Einheitenumrechner](courses/05-unit-converter/de/01-einheitenumrechner.md), [Kurs 6 – Quiz](courses/06-quiz/de/01-quiz.md), [Kurs 7 – Memory-Spiel](courses/07-memory-game/de/01-memory-spiel.md), [Kurs 8 – Wetter-App](courses/08-weather-app/de/01-wetter-app.md), [Kurs 9 – Budget-Tracker](courses/09-budget-tracker/de/01-budget-tracker.md), [Kurs 10 – REST-API](courses/10-rest-api/de/01-rest-api.md) und [Kurs 11 – Full-Stack-Notizen-App](courses/11-notes-app/de/01-notizen-app.md)

# Ideen für deine nächsten Projekte

Kurs 2 bis Kurs 11 (der Taschenrechner, zweimal, eine To-Do-Liste, ein
Einheitenumrechner, ein Quiz, ein Memory-Spiel, eine Wetter-App, ein
Budget-Tracker, eine REST-API und eine Full-Stack-Notizen-App) decken die
Grundlagen ausführlich ab — Variablen, Funktionen, das DOM, Daten als
HTML rendern, ein erster Schritt in Richtung OOP, das Sprechen mit einer
echten API, JavaScript außerhalb des Browsers ausführen, und ein
Frontend mit einem datenbankgestützten Server verbinden. Was danach
kommt, liegt bei dir: hier ist eine sortierte Liste an Projektideen, grob
geordnet von "naheliegender nächster Schritt" bis "wirklich
ambitioniert", jeweils mit den wichtigsten neuen Fähigkeiten, die sie dir
vermitteln würden. Wähl, was dir am meisten Spaß macht — Motivation zählt
mehr als das strikte Einhalten der Reihenfolge. Jede dieser Ideen könnte
der Kurs 12 dieses Repositories werden — oder einfach dein eigenes
Nebenprojekt.

| # | Projekt | Neue Fähigkeiten, zusätzlich zu dem, was du schon kannst | Schwierigkeit |
|---|---|---|---|
| 1 | ~~To-Do-Liste~~ — Aufgaben hinzufügen, entfernen und abhaken | ✅ Gebaut — siehe [Kurs 4 – To-Do-Liste](courses/04-todo-list/de/01-to-do-liste.md) | ⭐ |
| 2 | ~~Einheitenumrechner~~ — Länge, Gewicht, Temperatur | ✅ Gebaut — siehe [Kurs 5 – Einheitenumrechner](courses/05-unit-converter/de/01-einheitenumrechner.md) | ⭐ |
| 3 | ~~Multiple-Choice-Quiz~~ — Fragen, Punktestand, ein Ergebnisbildschirm | ✅ Gebaut — siehe [Kurs 6 – Quiz](courses/06-quiz/de/01-quiz.md) | ⭐⭐ |
| 4 | ~~Memory-Spiel~~ — Karten umdrehen, Paare finden | ✅ Gebaut — siehe [Kurs 7 – Memory-Spiel](courses/07-memory-game/de/01-memory-spiel.md) | ⭐⭐ |
| 5 | ~~Wetter-App~~ — echtes Wetter für eine eingetippte Stadt | ✅ Gebaut — siehe [Kurs 8 – Wetter-App](courses/08-weather-app/de/01-wetter-app.md) | ⭐⭐⭐ |
| 6 | ~~Budget-Tracker~~ — Einnahmen/Ausgaben, laufende Summen, Kategorien | ✅ Gebaut — siehe [Kurs 9 – Budget-Tracker](courses/09-budget-tracker/de/01-budget-tracker.md) | ⭐⭐⭐ |
| 7 | ~~Eine kleine REST-API mit Node.js + Express~~ — dein eigener kleiner Server | ✅ Gebaut — siehe [Kurs 10 – REST-API](courses/10-rest-api/de/01-rest-api.md) | ⭐⭐⭐⭐ |
| 8 | ~~Vollwertige Notiz-App~~ — ein Frontend spricht mit deinem eigenen Backend und speichert Notizen in einer echten Datenbank | ✅ Gebaut — siehe [Kurs 11 – Full-Stack-Notizen-App](courses/11-notes-app/de/01-notizen-app.md) | ⭐⭐⭐⭐ |
| 9 | **Die To-Do-Liste in Vue neu bauen** — dieselbe Hinzufügen/Abhaken/Entfernen-App, jetzt vom Framework verwaltet | Vue 3 (Composition API), Vite, `ref()`/reaktiver Zustand, eine Parent/Child-Komponentenaufteilung (Props runter, Events hoch), `v-for`/`v-if`-Templating | ⭐⭐⭐⭐ |
| 10 | **Live Tic-Tac-Toe** — zwei Spieler in getrennten Browser-Tabs (oder auf getrennten Computern), automatisch zusammengeführt und in Echtzeit synchron gehalten von einem Server, der den tatsächlichen Spielzustand besitzt | Die native [`WebSocket`](https://developer.mozilla.org/de/docs/Web/API/WebSocket)-API des Browsers, ein Node-WebSocket-Server mit [`ws`](https://www.npmjs.com/package/ws), ein kleines Client-Server-Nachrichtenprotokoll, serverautoritativer Spielzustand | ⭐⭐⭐⭐⭐ |

Ein paar Anmerkungen zum Lesen dieser Liste:

- Ideen 2–4 brauchten nichts über das hinaus, was der jeweils vorherige
  Kurs schon vermittelt hatte — dieselben Werkzeuge, neue Arten von
  Problemen. Ab hier betreten die Ideen unten wirklich neues Terrain.
- Idee 5 ist der natürliche Punkt, um "alles passiert sofort in meinem
  eigenen Code" hinter sich zu lassen und mit der Außenwelt umzugehen
  (Netzwerke sind langsam und schlagen manchmal fehl — das ist selbst eine
  Fähigkeit).
- Bei den Ideen 7–8 hört JavaScript auf, "nur eine Browsersprache" zu sein —
  dieselbe Sprache, aber auf einem Server laufend, am Ende sogar wieder mit
  einem Frontend verbunden, über eine echte Datenbank statt Arbeitsspeicher
  oder `localStorage`.
- Idee 9 kommt bewusst *nachdem* du ein paar Dinge von Hand gebaut hast:
  Frameworks ergeben am meisten Sinn, sobald man die Probleme selbst gespürt
  hat, die sie lösen. Die Wahl fällt gezielt auf Vue statt React, wegen der
  Lernkurve: Vues Template-Syntax bleibt nah am HTML/CSS/JS, das du schon
  kennst, während Reacts JSX ein größerer gedanklicher Sprung ist — und
  neu gebaut wird die To-Do-Liste statt der Taschenrechner, weil deren
  manuelles "HTML wegwerfen und alles von Hand neu rendern" genau das ist,
  was die Reaktivität eines Frameworks ersetzt. (React hat weiterhin den
  größeren Arbeitsmarkt, falls dir das wichtiger ist als die sanftere
  Lernkurve.)
- Idee 10 bleibt bewusst bei Tic-Tac-Toe — die Regeln brauchen keine
  Erklärung, sodass das komplette Schwierigkeitsbudget in die eigentliche
  Lektion fließt: der Server hält das eine wahre Spielbrett und
  entscheidet, wer am Zug ist, ein Client *schlägt* nur einen Zug vor, und
  der Server validiert, übernimmt und verteilt das Ergebnis an beide
  Spieler. Genutzt werden die rohe `ws`-Bibliothek und das im Browser
  eingebaute `WebSocket`, nicht Socket.io — eine Partie braucht nie mehr
  als zwei verbundene Sockets, sodass Socket.ios
  Rooms-/Namespace-/Reconnect-Maschinerie hier Aufwand ohne echten Nutzen
  wäre.

Egal wofür du dich entscheidest: Dieselben Gewohnheiten aus Kurs 2 bis
Kurs 11 gelten weiter — zuerst die Kernversion bauen, sie einfach halten,
und erst dann zur
optionalen, schwierigeren Variante eines Features greifen, wenn die einfache
funktioniert.
