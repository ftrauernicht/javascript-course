🇩🇪 Deutsch | 🇬🇧 [English](CONTRIBUTING.md)

# Mitwirken bei Training - Trainee - Javascript

Dies ist ein privates Projekt, das von einer Person gepflegt wird.

- Issues und Pull Requests sind willkommen.
- Pull Requests bitte klein und fokussiert halten -- das macht sie leichter
  zu prüfen und leichter rückgängig zu machen.
- Es wird keine Contributor License Agreement benötigt.
- Antwortzeiten variieren; dieses Repository wird nicht nach einem festen
  Zeitplan betreut.

## Einen neuen Kurs hinzufügen

Dieses Repository ist darauf angelegt, zu wachsen. Wer einen neuen Kurs
hinzufügt -- von Hand oder mit KI-Unterstützung -- sollte wissen, dass die
bestehenden Kurse Konventionen folgen, die aus keiner einzelnen Datei
ersichtlich sind; sie zeigen sich erst, wenn man mehrere Kurse
nebeneinander vergleicht. Sie stehen deshalb hier, damit ein neuer
Mitwirkender oder eine frische KI-Sitzung ohne Erinnerung an frühere
Arbeit sie befolgen kann, ohne sie erst mühsam zu rekonstruieren.

**Struktur**
- Jeder Kurs ist ein neuer Ordner `courses/NN-name/`, nummeriert in der
  Reihenfolge, in der er entstanden ist. Bei jedem neuen Kurs die
  Kurs-Tabelle und den Repository-Baum in `README.md`/`README.de.md`
  aktualisieren, sowie den Einleitungs-/Navigationstext in
  `PROJECT-IDEAS.md`/`PROJECT-IDEAS.de.md`.
- Jeder Kurs jenseits von Kurs 1 setzt **nur** Kurs 1
  (`courses/01-basics/`) voraus -- nie einen anderen Geschwister-Kurs.
  Braucht ein Kurs ein Konzept, das Kurs 1 nicht vermittelt (Klassen, das
  DOM, Array-Methoden, `setTimeout`, ...), wird es kurz inline erklärt,
  mit einem Hinweis wie "(falls du Kurs 3/4/... gemacht hast, spring
  weiter)" für Leser, die es schon kennen -- es wird nicht als bekannt
  vorausgesetzt.
- Kapitel liegen in parallelen `en/`- und `de/`-Ordnern mit identischem
  Inhalt und identischer Struktur, nicht als eine zweisprachige Datei.
  Code und Code-Kommentare sind immer auf Englisch. Sprachübergreifende
  Links zeigen auf die passende MDN-Sprachversion (`/en-US/` bzw. `/de/`).
- Jedes Kapitel benutzt dasselbe Drei-Stufen-System, einmal in Kurs 1
  Kapitel 0 eingeführt und sonst nirgends erneut erklärt: 🟢 Kern
  (notwendig), 🟡 Optional (mehr Übung), 🔴 Optional (eine echte
  Herausforderung).
- Ein Kurs mit lauffähigem Code bekommt einen `code/`-Ordner (die
  fertige Referenz -- unverändert lauffähig) und einen `assets/`-Ordner
  für Screenshots, auf die der Kapiteltext verweist.

**Vor der Veröffentlichung eines neuen Kapitels auf diese wiederkehrenden
Fehler prüfen** (gefunden, indem frühere Kurse als kompletter Anfänger
durchgegangen und jedes Snippet tatsächlich ausgeführt wurde):
- Querverweise auf "Kurs N" oder "Kapitel N" veralten still, wenn Inhalt
  umnummeriert oder aufgeteilt wird -- sowohl nach der Einzahl- als auch
  der Mehrzahlform suchen ("Kurs 3", "Kurs 3 und 4"), in beiden Sprachen.
- Ein Versprechen, etwas "später" zu erklären, muss tatsächlich eingelöst
  werden, oder ehrlich umformuliert werden, falls es nicht behandelt wird.
- Ein Kurs, der behauptet, nur Kurs 1 vorauszusetzen, muss gegen Kurs 1s
  *tatsächlichen* Inhalt geprüft werden, nicht den beabsichtigten --
  erneut prüfen, sobald sich Kurs 1 selbst ändert.
- Jedes Code-Snippet, besonders in optionalen Abschnitten, sollte vor der
  Veröffentlichung eigenständig ausgeführt werden, nicht nur auf
  Plausibilität gelesen.
- "Wohin gehört dieser Code" an jeder Stelle wiederholen, an der das
  mehrdeutig sein könnte, nicht nur einmal am Kapitelanfang.

**Wie viel Code man zeigt**: frühere Kurse (1-4) geben meist fertige,
funktionierende Funktionen zum Abtippen vor. Ab Kurs 5 bekommen die
Kapitel die neuen Bausteine (eine DOM-API, ein Sprachfeature, eine
Technik) vollständig erklärt, überlassen aber die Kernlogik der Übung --
den Teil, der eigentlich der Sinn des Kapitels ist -- als in Schritten
beschriebene Aufgabe zum Selbst-Zusammensetzen, mit der fertigen Version
nur in `code/script.js` als Musterlösung. Dieser Stil ist für neue Kurse
zu bevorzugen: das Ziel ist, dass Lernende denken und bauen, nicht nur
abtippen.

**Commit-Nachrichten** folgen [Conventional Commits](https://www.conventionalcommits.org/)
(`feat: add Course 8 - ...`, `fix: ...`, `docs: ...`). Ein neuer Kurs ist
typischerweise ein `feat:`-Commit, der Kapiteltext, Code, Assets und die
README-/PROJECT-IDEAS-Aktualisierungen zusammen abdeckt.
