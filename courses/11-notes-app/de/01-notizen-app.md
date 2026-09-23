🇩🇪 Deutsch | 🇬🇧 [English](../en/01-notes-app.md)

[← Zurück zur Kursübersicht](../../../README.de.md) · Verwandt: [Kurs 8 – Wetter-App](../../08-weather-app/de/01-wetter-app.md), [Kurs 10 – REST-API](../../10-rest-api/de/01-rest-api.md) (keiner davon nötig — dieser Kurs nutzt beide Muster: Kurs 8s `fetch` im Frontend, Kurs 10s Express-Routen im Backend, die jetzt aber miteinander statt mit der Außenwelt sprechen)

# Kapitel 1 – Full-Stack-Notizen-App

**Ziel:** eine Notizen-App mit einer echten, dauerhaften Datenbank
dahinter bauen: dein eigenes Frontend, im selben Browser-Tab, spricht
mit deinem eigenen Backend, das jede Notiz in einer echten
SQLite-Datenbankdatei speichert statt im Arbeitsspeicher oder in
`localStorage`. Das ist der erste Kurs, der alles verbindet, was frühere
Kurse getrennt gebaut haben: eine Browser-Oberfläche, einen Server, und
jetzt echten, dauerhaften Speicher. Vorausgesetzt wird nur
[Kurs 1 – Basics](../../01-basics/de/00-einleitung.md) (Werte,
Variablen, Operatoren, Klammern, Funktionen, Bedingungen, Schleifen) und
sonst nichts; der Kurs steht vollständig für sich, auch wenn er zügig
durch Terrain geht, das [Kurs 8](../../08-weather-app/de/01-wetter-app.md)
und [Kurs 10](../../10-rest-api/de/01-rest-api.md) jeweils langsam
abgedeckt haben.

Die fertigen Referenzdateien liegen in
[`courses/11-notes-app/code/`](../code/): `package.json`, `db.js`,
`server.js`, und ein `public/`-Ordner mit `index.html`, `style.css` und
`script.js`. `db.js` und das HTML/CSS sind so, wie sie sind, direkt
einsatzbereit. `server.js` und `public/script.js` sind die eigentliche
Übung: kopiere den ganzen `code/`-Ordner, installier die Abhängigkeit,
leere deine Kopien dieser beiden Dateien, und bau sie Stück für Stück
wieder auf. Wie in [Kurs 5](../../05-unit-converter/de/01-einheitenumrechner.md)
bis [Kurs 10](../../10-rest-api/de/01-rest-api.md) bleiben die
kniffligsten Teile dir überlassen, aus beschriebenen Schritten
zusammengesetzt, statt fertig geschrieben vorzuliegen.

Wie Kurs 10 braucht das hier [Node.js](https://nodejs.org/) installiert.
Falls du diesen Kurs schon gemacht hast, bist du startklar; sonst siehe
dessen Abschnitt "Bevor du startest".

## 🟢 Kern — Die Form einer Full-Stack-App

Ein einziger Express-Server erledigt hier zwei Aufgaben gleichzeitig: er
beantwortet API-Anfragen (`/api/notes`, genau wie Kurs 10s `/tasks`)
*und* er liefert die HTML-/CSS-/JS-Dateien des Frontends als einfache
statische Dateien aus. Beides kommt vom selben Ursprung
(`http://localhost:3000`), was ein ganzes Problem umgeht, mit dem ein
getrennt gehostetes Frontend und Backend sonst vom ersten Tag an zu
kämpfen hätten:
[CORS](https://developer.mozilla.org/de/docs/Web/HTTP/CORS)
(Cross-Origin Resource Sharing), die Sicherheitsregel des Browsers, die
verhindert, dass eine Seite frei eine API auf einem anderen Ursprung
aufruft. Deshalb liegt der Frontend-Code auch in
seinem eigenen `public/`-Ordner: Express liefert alles in diesem Ordner
direkt aus, an der Wurzel-URL, und nichts außerhalb davon.

## 🟢 Kern — Projekt einrichten

Dieselbe Form wie Kurs 10:

```json
{
  "name": "notes-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

```
npm install
```

## 🟢 Kern — HTTP und Express, kurz erklärt

*(Falls du [Kurs 10](../../10-rest-api/de/01-rest-api.md) gemacht hast,
spring direkt weiter: das ist derselbe Stoff, nur schneller.)*

Eine HTTP-Anfrage hat eine **Methode** (`GET` liest, `POST` erstellt,
`PATCH` ändert einen Teil von etwas, `DELETE` entfernt) und einen
**Pfad** (`/api/notes`, `/api/notes/3`). Eine Antwort hat einen
**Statuscode** (`200` Erfolg, `201` erstellt, `204` Erfolg ohne Inhalt,
`400` die Anfrage war ungültig, `404` keine solche Ressource).
[Express](https://expressjs.com/) ordnet ein Methode-plus-Pfad-Muster
einer Handler-Funktion zu: `app.get("/api/notes/:id", (req, res) => {
... })` läuft, wann immer eine `GET`-Anfrage für einen Pfad wie
`/api/notes/3` reinkommt, mit `req.params.id` gleich `"3"`.
`app.use(express.json())` liest einen JSON-Anfrage-Body in `req.body`
ein. `res.json(...)` schickt eine JSON-Antwort; `res.status(...)` setzt
vorher den Statuscode.

## 🟢 Kern — Eine echte Datenbank: SQLite

Jeder Kurs bis hierhin, der sich etwas merken musste, hat entweder
`localStorage` genutzt (eine Browser-Funktion, nur für diesen einen
Browser) oder ein einfaches Array im Arbeitsspeicher des Servers
(Kurs 10, weg, sobald der Server neu startet). Eine **Datenbank** ist
keins von beidem: eine echte Datei auf der Festplatte, gebaut zum
Speichern und Abfragen strukturierter Daten, die Neustarts übersteht und
weit mehr Daten verwalten kann, als bequem in den Arbeitsspeicher passen.
[SQLite](https://www.sqlite.org/) speichert eine ganze Datenbank als eine
einzelne Datei und braucht dafür, anders als die meisten Datenbanken,
keinen separaten Serverprozess. Noch besser: aktuelle Node.js-Versionen
bringen SQLite-Unterstützung **eingebaut** mit, also gibt es dafür,
anders als bei Express, gar nichts per `npm install` zu holen.

```js
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("notes.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL
  )
`);
```

`new DatabaseSync("notes.db")` öffnet diese Datei (und erstellt sie, wenn
sie noch nicht existiert). Ab hier wird alles direkt von dieser Datei
auf der Festplatte gelesen und dorthin geschrieben.
[SQL](https://developer.mozilla.org/de/docs/Glossary/SQL) (Structured
Query Language) ist eine eigene, kleine Sprache zum Beschreiben von Daten
und Fragen dazu, kein JavaScript. `CREATE TABLE IF NOT EXISTS notes
(...)` beschreibt eine **Tabelle** namens `notes`: Zeilen aus Daten,
jede gleich geformt, eine **Spalte** pro Informationsstück.
`id INTEGER PRIMARY KEY AUTOINCREMENT` ist eine Zahl, die jede Zeile
eindeutig identifiziert und sich selbst automatisch ausfüllt (das
Datenbank-Gegenstück zu Kurs 10s `crypto.randomUUID()`, nur fortlaufende
ganze Zahlen statt zufälliger Zeichenketten). `TEXT NOT NULL` bedeutet
"Text, erforderlich"; `DEFAULT ''` gibt `content` eine leere
Zeichenkette, wenn keine übergeben wird. `IF NOT EXISTS` bedeutet, dass
das bei jedem Serverstart sicher ausgeführt werden kann: es erstellt die
Tabelle nur beim ersten Mal tatsächlich.

Der Rest von `db.js` bekommst du vollständig fertig. SQL ist in diesem
Kapitel neues Terrain, es lohnt sich, es einmal komplett durchgearbeitet
zu sehen statt aus Schritten zusammenzusetzen:

```js
function getAllNotes() {
  return db.prepare("SELECT * FROM notes ORDER BY updated_at DESC").all();
}

function getNote(id) {
  return db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
}

function createNote(title, content) {
  const updatedAt = new Date().toISOString();
  const result = db
    .prepare("INSERT INTO notes (title, content, updated_at) VALUES (?, ?, ?)")
    .run(title, content, updatedAt);
  return getNote(result.lastInsertRowid);
}

function updateNote(id, title, content) {
  const updatedAt = new Date().toISOString();
  db.prepare("UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?").run(
    title,
    content,
    updatedAt,
    id
  );
  return getNote(id);
}

function deleteNote(id) {
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
}

module.exports = { getAllNotes, getNote, createNote, updateNote, deleteNote };
```

Vier SQL-Anweisungen, eine pro Aufgabe: `SELECT` liest Zeilen (`*`
bedeutet "jede Spalte"; `ORDER BY updated_at DESC` sortiert
zuletzt-bearbeitet-zuerst, dieselbe Idee wie `.sort(...)` aus
[Kurs 9](../../09-budget-tracker/de/01-budget-tracker.md), nur von der
Datenbank statt von JavaScript erledigt), `INSERT` fügt eine Zeile hinzu,
`UPDATE` ändert eine, `DELETE` entfernt eine. Sowohl `UPDATE` als auch
`DELETE` nutzen `WHERE id = ?`, um genau eine Zeile zu treffen, dieselbe
Rolle, die `req.params.id` in Kurs 10s Routen spielt. `db.prepare(sql)`
kompiliert das SQL einmal; `.get(...)`/`.all(...)`/`.run(...)` führen es
dann aus, mit echten Werten, die der Reihe nach in jeden `?`-**Platzhalter**
eingesetzt werden.

Die Platzhalter sind für mehr als nur Bequemlichkeit wichtig: bau eine
SQL-Zeichenkette nie, indem du Nutzereingaben direkt hineinklebst
(`"SELECT * FROM notes WHERE id = " + id`, zum Beispiel). Ein Titel- oder
Content-Feld mit etwas wie `'; DROP TABLE notes; --` könnte dann als
*weiteres SQL* interpretiert werden statt als reiner Text, ein Angriff
namens [SQL-Injection](https://developer.mozilla.org/de/docs/Glossary/SQL_Injection).
Platzhalter halten Werte als Werte, nie als Code, egal was darin steht.
Nutz sie immer für alles, was aus einer Anfrage kommt.

## 🟢 Kern — Die API: Notizen lesen

`server.js` startet wie das aus Kurs 10, plus dem Laden von `db.js`:

```js
const express = require("express");
const path = require("path");
const notes = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/notes", (req, res) => {
  res.json(notes.getAllNotes());
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.getNote(req.params.id);

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  res.json(note);
});
```

`express.static(...)` ist das, was den `public/`-Ordner zum Frontend
macht: jede Datei darin (`index.html`, `style.css`, `script.js`) wird
direkt unter ihrem Pfad ausgeliefert, und Express ist schlau genug,
`index.html` automatisch für die Wurzel `/` auszuliefern. Die beiden
`GET`-Routen sind genau Kurs 10s Muster, sie rufen nur `db.js`s
Funktionen auf statt ein Array im Arbeitsspeicher zu durchsuchen.

## 🟢 Kern — Die API: Notizen schreiben

Jetzt bist du dran: dasselbe Muster wie Kurs 10s `POST`/`PATCH`, diesmal
gegen eine echte Datenbank. `app.post("/api/notes", (req, res) => { ...
})` soll:

1. `req.body.title` lesen, trimmen. Ist es leer, antworte mit
   `res.status(400).json({ error: "title is required" })` und `return`.
2. Andernfalls `notes.createNote(title, req.body.content || "")`
   aufrufen und mit `res.status(201).json(...)` und dem Ergebnis
   antworten.

```js
app.post("/api/notes", (req, res) => {
  // dein Code hier — die zwei Schritte oben
});
```

`app.patch("/api/notes/:id", (req, res) => { ... })` soll:

1. Die Notiz mit `notes.getNote(req.params.id)` nachschlagen. Gibt es
   keinen Treffer, genauso mit `404` antworten wie die `GET`-Route oben
   und `return`.
2. Den neuen `title` (`req.body.title.trim()`, falls mitgeschickt, sonst
   der bestehende Titel der Notiz) und `content` (`req.body.content`,
   falls mitgeschickt, sonst der bestehende Inhalt) bestimmen. Beides
   mit `!== undefined` prüfen, dieselbe Überlegung wie in Kurs 10:
   `content: ""` ist ein gültiger Wert zum Setzen, und eine einfache
   Falsy-Prüfung würde ihn fälschlich überspringen.
3. `notes.updateNote(req.params.id, title, content)` aufrufen und mit
   `res.json(...)` und dem Ergebnis antworten.

```js
app.patch("/api/notes/:id", (req, res) => {
  // dein Code hier — die drei Schritte oben
});
```

Das hier bekommst du fertig, dieselbe Form ein drittes Mal:

```js
app.delete("/api/notes/:id", (req, res) => {
  const existing = notes.getNote(req.params.id);

  if (!existing) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  notes.deleteNote(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log("Notes app listening on http://localhost:" + PORT);
});
```

Speichern, `node server.js` ausführen, und `http://localhost:3000`
öffnen; die Seite lädt (ausgeliefert von `express.static`), und
`curl -X POST http://localhost:3000/api/notes -H "Content-Type: application/json" -d "{\"title\":\"Test\"}"`
in einem zweiten Terminal sollte eine Notiz erstellen und sie mit
generierter `id` zurückgeben.

## 🟢 Kern — Das Frontend, kurz erklärt

*(Falls du [Kurs 8](../../08-weather-app/de/01-wetter-app.md) gemacht
hast, spring direkt weiter.)*

`fetch(url, options)` startet eine Netzwerkanfrage und gibt ein
[Promise](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise)
zurück;
[`async`/`await`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/async_function)
lässt dich "warte darauf, dann mach weiter" schreiben, ohne die Seite
einzufrieren. Eine `POST`/`PATCH`-Anfrage braucht eine `method`, einen
`Content-Type: application/json`-Header, und einen mit
[`JSON.stringify(...)`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
gebauten `body`. `.innerHTML`, aufgebaut aus `.map(...)`/`.join("")` über
ein Array von Objekten, ist das inzwischen vertraute Render-Muster.

Das HTML ([`public/index.html`](../code/public/index.html)) ist ein
zweispaltiges Layout: eine Seitenleiste `#note-list` und ein
Editor-Formular mit `#title-input`, `#content-input`, `#save-button` und
`#delete-button`. Lies die vollständige Datei; sie bekommst du so, wie
sie ist, zusammen mit [`style.css`](../code/public/style.css). Starte
`public/script.js` mit:

```js
const noteList = document.getElementById("note-list");
const newButton = document.getElementById("new-button");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const deleteButton = document.getElementById("delete-button");

let notes = [];
let currentId = null;
```

`currentId` merkt sich, welche Notiz (falls überhaupt) gerade im Editor
geladen ist: `null` bedeutet "eine neue, noch nicht gespeicherte
Notiz."

Diese zwei bekommst du fertig, Laden und Rendern, das etablierte Muster:

```js
async function loadNotes() {
  const response = await fetch("/api/notes");
  notes = await response.json();
  renderList();
}

function renderList() {
  noteList.innerHTML = notes
    .map((note) => {
      const selectedClass = note.id === currentId ? "selected" : "";
      const snippet = note.content.slice(0, 40) || "No content yet";
      return (
        '<li class="' + selectedClass + '" data-id="' + note.id + '">' +
          '<p class="note-title">' + note.title + "</p>" +
          '<p class="note-snippet">' + snippet + "</p>" +
        "</li>"
      );
    })
    .join("");

  noteList.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      selectNote(Number(item.dataset.id));
    });
  });
}

function selectNote(id) {
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return;
  }

  currentId = note.id;
  titleInput.value = note.title;
  contentInput.value = note.content;
  deleteButton.disabled = false;
  renderList();
}

function clearForm() {
  currentId = null;
  titleInput.value = "";
  contentInput.value = "";
  deleteButton.disabled = true;
  renderList();
}

newButton.addEventListener("click", clearForm);
```

## 🟢 Kern — Die Teile verbinden

Das hier ist der eigentliche Punkt des Kapitels: `handleSave(event)`,
aufgerufen beim `"submit"`-Ereignis des Formulars, muss entscheiden, ob
gerade eine neue Notiz erstellt oder eine bestehende geändert wird. Es
ist die eine Entscheidung, die bisher noch nichts treffen musste.

1. `event.preventDefault()` aufrufen.
2. `titleInput.value.trim()` und `contentInput.value` lesen. Ist der
   Titel leer, `return`.
3. Ist `currentId === null` (eine neue Notiz): `POST` an `/api/notes`
   mit einem JSON-Body aus `{ title: title, content: content }`, die
   erstellte Notiz mit `.json()` aus der Antwort auslesen, und
   `currentId` auf ihre `id` setzen.
4. Andernfalls (eine bestehende Notiz bearbeiten): `PATCH` an
   `"/api/notes/" + currentId` mit demselben Body; diesmal muss die
   Antwort nicht gelesen werden.
5. In beiden Fällen mit `await loadNotes()` abschließen, damit die
   Seitenleiste zeigt, was jetzt tatsächlich in der Datenbank steht.

```js
async function handleSave(event) {
  // dein Code hier — die fünf Schritte oben
}

noteForm.addEventListener("submit", handleSave);
```

`handleDelete()`, aufgerufen beim `"click"` des Löschen-Buttons:

1. Ist `currentId === null`, `return`; nichts zu löschen.
2. `DELETE` an `"/api/notes/" + currentId`.
3. `clearForm()` aufrufen, dann `await loadNotes()`.

```js
async function handleDelete() {
  // dein Code hier — die drei Schritte oben
}

deleteButton.addEventListener("click", handleDelete);

deleteButton.disabled = true;
loadNotes();
```

Speichern, Seite neu laden, und eine Notiz erstellen: sie sollte in der
Seitenleiste erscheinen. Draufklicken, den Inhalt ändern, wieder
speichern — dieselbe Notiz aktualisiert sich, statt eine zweite zu
erstellen. Auf "+ New note" klicken, einen anderen Titel eintragen,
speichern; eine wirklich neue erscheint. Eine löschen, und sie ist weg,
dauerhaft, auch nach einem Neustart des Servers. Falls du nicht
weiterkommst, [`code/public/script.js`](../code/public/script.js) und
[`code/server.js`](../code/server.js) zeigen einen Weg, wie man alle vier
Teile schreiben kann.

## 🟡 Optional — Notizen durchsuchen

Füg ein Suchfeld über der Notizliste hinzu. Bei jedem Tastendruck die
Liste mit
[`.filter(...)`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
(aus [Kurs 9](../../09-budget-tracker/de/01-budget-tracker.md)) über das
bereits geladene `notes`-Array neu rendern, dabei nur Notizen behalten,
deren Titel oder Inhalt den Suchtext enthält (ohne Groß-/Kleinschreibung
zu beachten:
[`.toLowerCase()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
auf beiden Seiten vor dem Vergleich). Das filtert Daten, die schon im
Browser sind, keine neue Anfrage nötig.

## 🔴 Optional, echte Herausforderung — Suche mit SQL stattdessen

Bau jetzt dieselbe Suche serverseitig. SQLs `LIKE`-Operator macht
Mustervergleich, mit `%` als Platzhalter: `WHERE title LIKE ?` mit einem
Wert von `"%bread%"` passt auf jeden Titel, der irgendwo "bread"
enthält. Füg `db.js` eine Funktion hinzu (`searchNotes(query)`), die
etwas wie `SELECT * FROM notes WHERE title LIKE ? OR content LIKE ?
ORDER BY updated_at DESC` ausführt, aufgerufen mit `"%" + query + "%"`
zweimal (einmal pro `?`). Verdrahte sie als `GET /api/notes?q=...`
(`req.query.q` hält den Wert des Query-Strings), mit Rückfall auf
`getAllNotes()`, wenn `q` fehlt, und aktualisier dann das Suchfeld im
Frontend so, dass es diesen Endpunkt aufruft statt das schon geladene
Array zu filtern. Der echte Unterschied zur 🟡-Version: das skaliert auf
eine Datenbank mit weit mehr Notizen, als jemals praktikabel wäre, in den
Browser zu laden und von Hand zu filtern. Die Datenbank sucht, nicht
JavaScript.

## Probier es selbst aus

Eine leere Notizen-App, bereit für die erste Notiz:

![Die Notizen-App ohne Notizen](../assets/empty.png)

Notizen in der Seitenleiste aufgelistet, eine ausgewählt und im Editor
geöffnet:

![Die Notizen-App mit einer im Editor ausgewählten Notiz](../assets/populated.png)

Führ `node server.js` innerhalb von
[`courses/11-notes-app/code/`](../code/) aus (nach `npm install`) und
öffne `http://localhost:3000` in deinem Browser.

## Checkpoint & was du gelernt hast

- Wie ein einzelner Server sowohl ein Frontend (`express.static`) als
  auch eine JSON-API vom selben Ursprung ausliefern kann und damit CORS
  komplett umgeht
- SQLite und SQL: `CREATE TABLE`, `SELECT`/`INSERT`/`UPDATE`/`DELETE`,
  Platzhalter, und warum SQL-Injection Platzhalter nicht optional macht
- Nodes eingebautes `node:sqlite`: eine echte Datenbank ohne zusätzliche
  Abhängigkeit zu installieren
- Entscheiden, ob eine Aktion ein Erstellen oder ein Ändern ist (`POST`
  vs. `PATCH`), basierend auf Zustand, den du clientseitig verfolgst
  (`currentId`)
- Daten, die einen Serverneustart überstehen, zum ersten Mal in dieser
  Kursreihe

## Was als Nächstes kommt

Das war Idee 8 aus [PROJECT-IDEAS.de.md](../../../PROJECT-IDEAS.de.md):
Frontend und Backend, die endlich über eine echte Datenbank miteinander
sprechen. Was dort noch übrig ist, wird noch ambitionierter: etwas in
einem Frontend-Framework neu bauen, oder ein Echtzeit-Multiplayer-Spiel.
