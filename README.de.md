🇩🇪 Deutsch | 🇬🇧 [English](README.md)

# Training – Trainee JavaScript

Ein projektbasierter Einsteigerkurs in JavaScript, geschrieben, um Kolleginnen
und Kollegen, angehenden Azubis und allen anderen Interessierten die
Grundlagen der Softwareentwicklung zu vermitteln. Er ist so gedacht, dass man
ihn 1:1 weitergeben kann: den Link zu diesem Repository schicken, und alles
Nötige für den Einstieg ist bereits da. Programmiererfahrung wird auf Seiten
der Lernenden nicht vorausgesetzt. Jedes Kapitel baut auf dem vorherigen auf,
und jedes Kapitel hat optionale Vertiefungen für alle, die mehr
Herausforderung möchten.

Dieser Kurs existiert **auf Deutsch und Englisch, gleichberechtigt
nebeneinander**: Jedes Kapitel liegt als zwei getrennte Dateien mit demselben
Inhalt vor — lies, was dir leichter fällt, und wechsle jederzeit. Code und
Code-Kommentare sind dagegen immer auf Englisch geschrieben. Das ist eine
bewusste Entscheidung und zugleich eine reale Konvention: Professioneller
Code wird unabhängig von der Teamsprache auf Englisch geschrieben, und daran
gewöhnt man sich am besten von der ersten Zeile an.

<img src="courses/03-calculator-gui/assets/empty.png" alt="Der in Kurs 3 gebaute GUI-Taschenrechner" width="240" />

*Der Taschenrechner, den du in Kurs 3 baust — angefangen bei nichts als den
Programmier-Grundlagen aus Kurs 1.*

## Diesen Kurs auf deinen Computer holen

**Variante A — ganz ohne Werkzeuge, wenn du gerade erst anfängst:**

1. Geh zu <https://github.com/ftrauernicht/training-trainee-javascript>.
2. Klick auf den grünen **Code**-Button → **Download ZIP**.
3. Entpack die heruntergeladene ZIP-Datei irgendwo auf deinem Computer
   (Rechtsklick → *Alle extrahieren* unter Windows, oder Doppelklick unter
   Mac).
4. Öffne den entpackten Ordner. Du hast jetzt alle Dateien, die dieser Kurs
   braucht.

**Variante B — mit [Git](https://git-scm.com/), falls du es bereits installiert hast:**

```
git clone https://github.com/ftrauernicht/training-trainee-javascript.git
```

So oder so muss nichts installiert oder gebaut werden, und es braucht auch
keinen Server. Kurs 1 spielt sich komplett in der Browser-Konsole ab. Kurs 2
genauso — direkt in die Konsole eingetippt (eine optionale Herausforderung
gegen Ende lässt dich eine Referenzdatei einfügen). Der Taschenrechner aus
Kurs 3 läuft, indem du einfach seine `index.html` doppelklickst. Los geht's
bei [Kurs 1 – Basics, Kapitel 0](courses/01-basics/de/00-einleitung.md).

## Was du vorher brauchst

Für Kurs 1 muss nichts installiert werden — nur ein Computer und ein
aktueller Browser.

| Werkzeug | Wofür | Link |
|---|---|---|
| Ein Browser | Um die Entwicklerkonsole zu öffnen — unser erster "Code-Editor" | [Google Chrome](https://www.google.com/chrome/), [Mozilla Firefox](https://www.mozilla.org/firefox/) |
| Ein Texteditor | Für Kurs 3 (den GUI-Taschenrechner), um HTML-/CSS-/JS-Dateien zu schreiben | [Visual Studio Code](https://code.visualstudio.com/) |

Eine Schritt-für-Schritt-Anleitung (inklusive dem Öffnen der Konsole) steht in
[Kurs 1 – Basics, Kapitel 0](courses/01-basics/de/00-einleitung.md).

## Kurse

Dieses Repository ist darauf angelegt, mit der Zeit mehr als einen Kurs zu
enthalten. Jeder bekommt unter `courses/` seine eigene Nummer, in der
Reihenfolge, in der er entstanden ist — ein künftiger Kurs 6 landet also
unter `courses/06-.../`, direkt neben diesen fünfen, ohne sie anzufassen.

Kurs 1 ist die gemeinsame Grundlage, die jeder spätere Kurs voraussetzt.
Kurs 2 bis Kurs 5 sind jeweils **unabhängige, eigenständige** Projekte, die
nur Kurs 1 voraussetzen — keiner setzt einen der anderen voraus. Wähl, was
dich mehr reizt, in welcher Reihenfolge du willst.

### Kurs 1 – Basics (`courses/01-basics/`)

Nicht an ein bestimmtes Projekt gebunden — das gemeinsame Vokabular, das
jeder spätere Kurs voraussetzt.

| # | Kapitel | Was du lernst |
|---|---|---|
| 0 | [Einleitung & Werkzeuge](courses/01-basics/de/00-einleitung.md) | Die Browser-Konsole, ein Texteditor, wie dieser Kurs aufgebaut ist |
| 1 | [Programmier-Grundlagen](courses/01-basics/de/01-programmier-grundlagen.md) | Werte, Variablen, Operatoren, die drei Klammerarten, Funktionen, Bedingungen, Schleifen |

### Kurs 2 – Taschenrechner Konsole (`courses/02-calculator-console/`)

Setzt nur Kurs 1 voraus. Ein Taschenrechner, komplett in der
Browser-Konsole gebaut — keine Dateien, keine Oberfläche.

| # | Kapitel | Was du lernst |
|---|---|---|
| 1 | [Taschenrechner in der Konsole](courses/02-calculator-console/de/01-taschenrechner-konsole.md) | Die Bausteine aus Kurs 1 zu einem echten Programm zusammensetzen — plus ein optionaler Klammer-Parser |

### Kurs 3 – Taschenrechner GUI (`courses/03-calculator-gui/`)

Setzt nur Kurs 1 voraus (nicht Kurs 2). Dieselbe Idee, mit einer echten,
klickbaren Oberfläche.

| # | Kapitel | Was du lernst |
|---|---|---|
| 1 | [Taschenrechner mit Oberfläche (GUI)](courses/03-calculator-gui/de/01-taschenrechner-gui.md) | HTML-/CSS-/JS-Grundlagen, das DOM, Events und ein sanfter erster Schritt in Richtung OOP (Klassen) |

### Kurs 4 – To-Do-Liste (`courses/04-todo-list/`)

Setzt nur Kurs 1 voraus. Eine To-Do-Liste mit Hinzufügen/Abhaken/Entfernen
und einem Daten-zu-HTML-Rendering-Muster, das weit über einen einzelnen
Taschenrechner-Button hinausgeht.

| # | Kapitel | Was du lernst |
|---|---|---|
| 1 | [To-Do-Liste](courses/04-todo-list/de/01-to-do-liste.md) | Objektliterale, Arrays aus Objekten, Daten als HTML rendern, Persistenz mit `localStorage` |

### Kurs 5 – Einheitenumrechner (`courses/05-unit-converter/`)

Setzt nur Kurs 1 voraus. Rechnet Länge, Gewicht und Temperatur zwischen
Einheiten um und gibt dir spürbar weniger fertigen Code zum Abtippen als
frühere Kurse — der Punkt hier ist, die Umrechnungslogik selbst zu bauen,
sobald du die Bausteine dafür hast.

| # | Kapitel | Was du lernst |
|---|---|---|
| 1 | [Einheitenumrechner](courses/05-unit-converter/de/01-einheitenumrechner.md) | Das Nachschlagetabellen-Muster, Elemente mit `document.createElement` bauen, eine Funktion verallgemeinern, indem man eine Annahme zu einem Parameter macht |

Es kommen mit der Zeit weitere Kurse dazu; dieser Abschnitt wächst mit.

## Projektideen

Sobald du Kurs 2 bis Kurs 5 abgeschlossen hast, findest du in
[PROJECT-IDEAS.de.md](PROJECT-IDEAS.de.md) eine sortierte Liste dessen, was
als Nächstes gebaut werden könnte — vom naheliegenden nächsten Schritt bis zu
etwas wirklich Ambitioniertem. Sie liegt an der Wurzel des Repositories,
nicht innerhalb eines einzelnen Kurses, weil jede dieser Ideen der Kurs 6
dieses Repositories werden könnte.

## Wie du diesen Kurs nutzt

1. Lies ein Kapitel von oben nach unten durch.
2. Tippe die Beispiele selbst ab, statt sie nur zu kopieren — Abtippen baut
   das Muskelgedächtnis auf, Kopieren baut nur einen Scrollbalken.
3. Jedes Kapitel hat einen **Kernteil** (🟢, notwendig, um weiterzumachen) und
   ein oder mehrere **optionale Teile** (🟡 solide Zusatzübung, 🔴 eine
   echte Herausforderung). Die optionalen Teile zu überspringen ist völlig in
   Ordnung — komm später zurück, wenn du magst.
4. Innerhalb eines Kurses verwenden spätere Kapitel ausdrücklich Code aus
   früheren weiter. Über Kurse hinweg wird dagegen nichts außer Kurs 1
   vorausgesetzt — Kurs 2 bis Kurs 5 bauen ihre jeweilige Logik bewusst
   von Grund auf neu, damit sich jeder davon in beliebiger Reihenfolge
   bearbeiten lässt.
5. Links innerhalb eines Kapitels führen genau dort, wo ein neuer Begriff
   auftaucht, zur passenden Seite bei [MDN Web Docs](https://developer.mozilla.org/de/)
   (dem Standard-Nachschlagewerk für JavaScript) — statt sie am Ende in einem
   Glossar zu sammeln. Ist ein Begriff unklar, ist der nächste Link dein
   Glossar.

## Aufbau des Repositories

```
PROJECT-IDEAS.md / .de.md   Ideen dafür, was ein künftiger Kurs sein könnte
courses/
  01-basics/                 Kurs 1 — allgemein, an kein Projekt gebunden
    en/                        Kapiteltexte, Englisch
    de/                        Kapiteltexte, Deutsch
  02-calculator-console/     Kurs 2 — Taschenrechner, in der Konsole
    en/                        Kapiteltexte, Englisch
    de/                        Kapiteltexte, Deutsch
    code/                      Musterlösungen (calculate.js, bracket-parser.js)
  03-calculator-gui/         Kurs 3 — Taschenrechner, mit GUI
    en/                        Kapiteltexte, Englisch
    de/                        Kapiteltexte, Deutsch
    code/                      der lauffähige GUI-Taschenrechner (index.html, style.css, script.js)
    assets/                    Screenshots aus dem Kapitel
  04-todo-list/              Kurs 4 — To-Do-Liste
    en/                        Kapiteltexte, Englisch
    de/                        Kapiteltexte, Deutsch
    code/                      die lauffähige To-Do-Liste (index.html, style.css, script.js)
    assets/                    Screenshots aus dem Kapitel
  05-unit-converter/         Kurs 5 — Einheitenumrechner
    en/                        Kapiteltexte, Englisch
    de/                        Kapiteltexte, Deutsch
    code/                      der lauffähige Einheitenumrechner (index.html, style.css, script.js)
    assets/                    Screenshots aus dem Kapitel
  06-.../                    künftige Kurse, nach demselben Muster
```

## Mitwirken

Siehe [CONTRIBUTING.md](CONTRIBUTING.md).
