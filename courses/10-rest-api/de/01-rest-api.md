🇩🇪 Deutsch | 🇬🇧 [English](../en/01-rest-api.md)

[← Zurück zur Kursübersicht](../../../README.de.md) · Verwandt: [Kurs 4 – To-Do-Liste](../../04-todo-list/de/01-to-do-liste.md) (nicht nötig — dieser Kurs baut dieselbe Art von Daten, Aufgaben mit einem Erledigt-Status, als Server statt als Browser-Seite neu)

# Kapitel 1 – Eine REST-API mit Node.js + Express

**Ziel:** einen kleinen Server bauen, der eine Aufgabenliste speichert und
anderen Programmen erlaubt, sie über HTTP zu lesen, hinzuzufügen, zu
ändern und zu löschen — der erste Kurs, in dem dein JavaScript komplett
außerhalb eines Browsers läuft, in einem Terminal, als eigenes Programm.
Dieser Kurs setzt nur [Kurs 1 – Basics](../../01-basics/de/00-einleitung.md)
voraus (Werte, Variablen, Operatoren, Klammern, Funktionen, Bedingungen,
Schleifen) und sonst nichts; er steht vollständig für sich. Es gibt in
diesem Kapitel kein HTML, kein CSS und kein DOM.

Die fertigen Referenzdateien liegen in
[`courses/10-rest-api/code/`](../code/): `package.json` und `server.js`.
`server.js` ist die eigentliche Übung: kopiere `package.json` in deinen
eigenen Arbeitsordner, installier ihre Abhängigkeit, leere deine Kopie von
`server.js`, und bau sie Stück für Stück wieder auf. Wie in
[Kurs 5](../../05-unit-converter/de/01-einheitenumrechner.md) bis
[Kurs 9](../../09-budget-tracker/de/01-budget-tracker.md) bleiben die
kniffligsten Teile dir überlassen, aus beschriebenen Schritten
zusammengesetzt, statt fertig geschrieben vorzuliegen.

## Bevor du startest: Node.js installieren

Jeder Kurs bis hierhin hat nur einen Browser gebraucht. Dieser hier
braucht [Node.js](https://nodejs.org/), installiert auf deinem Computer —
es lässt JavaScript als eigenständiges Programm laufen, nicht nur
innerhalb eines Browser-Tabs. Lad die **LTS**-Version für dein
Betriebssystem herunter, installier sie, und bestätige dann in einem
Terminal (Eingabeaufforderung, PowerShell, oder das eingebaute Terminal
deines Editors), dass es funktioniert hat:

```
node --version
npm --version
```

Beide sollten eine Versionsnummer ausgeben.
[npm](https://www.npmjs.com/) (Node Package Manager) kommt zusammen mit
Node.js — es lädt Bibliotheken herunter, die andere veröffentlicht haben,
und verwaltet sie, wie die, die dieses Kapitel nutzt.

## 🟢 Kern — HTTP, kurz erklärt

*(Falls du schon mal eine Webseite gebaut und dabei in den
Netzwerk-Tab deines Browsers geschaut hast, ist dir das meiste schon
vertraut.)*

Eine REST-API ist ein Server, mit dem andere Programme über
[HTTP](https://developer.mozilla.org/de/docs/Web/HTTP) sprechen —
dasselbe Protokoll, das dein Browser nutzt, um jede Seite zu laden. Jede
Anfrage hat:

- Eine **Methode**, die die Art der Aktion beschreibt: `GET` (Daten
  lesen, ändert nie etwas), `POST` (etwas Neues erstellen), `PATCH`
  (einen Teil von etwas Bestehendem ändern), `DELETE` (etwas entfernen).
- Einen **Pfad**, wie `/tasks` oder `/tasks/7` — um welche Ressource es
  bei der Anfrage geht.
- Manchmal einen **Body** — Daten, die mit der Anfrage mitgeschickt
  werden, meist JSON, genutzt von `POST` und `PATCH`, um zu sagen, *was*
  erstellt oder geändert werden soll.

Jede Antwort hat einen **Statuscode** — eine dreistellige Zahl, die
zusammenfasst, was passiert ist: `200 OK` (Erfolg), `201 Created` (ein
`POST` war erfolgreich), `204 No Content` (Erfolg, nichts zum
Zurückschicken — typisch für `DELETE`), `400 Bad Request` (die Anfrage
selbst war ungültig), `404 Not Found` (keine solche Ressource). Eine
**REST-API** ist einfach ein Server, der um dieses
Methode-plus-Pfad-Muster herum organisiert ist: `GET /tasks` liest jede
Aufgabe, `GET /tasks/7` liest Aufgabe 7, `POST /tasks` erstellt eine
Aufgabe, und so weiter — der "REST"-Teil ist eine Sammlung weit
verbreiteter Konventionen, keine Technologie, die man installiert.

## 🟢 Kern — Das Projekt einrichten

In einem neuen, leeren Ordner beschreibt `package.json` das Projekt und
seine Abhängigkeiten:

```json
{
  "name": "tasks-api",
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

[Express](https://expressjs.com/) ist eine kleine, extrem weit verbreitete
Bibliothek, die die HTTP-Details übernimmt (Anfragen einlesen, einen Pfad
dem richtigen Code zuordnen, Antworten verschicken), damit du dich darauf
konzentrieren kannst, was jede Route tun soll. Mit `package.json` an Ort
und Stelle lädt das Express selbst in einen neuen `node_modules`-Ordner
herunter:

```
npm install
```

`node_modules` kann groß werden und wird nie in ein Repository
committet — ein `.gitignore` schließt es aus, da `package.json` reicht,
damit jeder andere es mit demselben Befehl neu erzeugen kann.

## 🟢 Kern — Hallo, Express

Erstell `server.js` und starte mit einem Server, der nichts tut außer zu
antworten:

```js
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json([]);
});

app.listen(PORT, () => {
  console.log("Tasks API listening on http://localhost:" + PORT);
});
```

Führ ihn mit `node server.js` aus (oder `npm start`, das nutzt das
`"start"`-Skript aus `package.json`). Das Terminal gibt die Meldung aus
`app.listen` aus und bleibt dann einfach so stehen — das ist richtig, die
Aufgabe eines Servers ist es, weiterzulaufen und auf Anfragen zu warten,
nicht fertig zu werden. `Strg+C` in diesem Terminal stoppt ihn.

Ein paar neue Dinge:

- [`require("express")`](https://nodejs.org/api/modules.html#requireid)
  ist Nodes Art, eine Bibliothek zu laden — das CommonJS-Gegenstück zu
  `<script src="...">`, nur für Code statt für den Browser.
- `express()` erstellt die App; `app.get(path, handler)` registriert eine
  Funktion, die für `GET`-Anfragen läuft, die zu `path` passen. `req`
  (die eingehende Anfrage) und `res` (die Werkzeuge, um sie zu
  beantworten) werden automatisch bereitgestellt.
- `res.json(...)` schickt sein Argument als JSON-Antwort zurück — das
  Server-Gegenstück zu `JSON.stringify(...)`, für dich erledigt.
- `app.use(express.json())` sagt Express, den JSON-Body einer Anfrage
  automatisch in `req.body` einzulesen, für jede Route darunter — ohne
  diese Zeile wäre `req.body` `undefined`, selbst wenn eine Anfrage JSON
  schickt.
- `app.listen(PORT, callback)` lässt den Server auf echte
  Netzwerkverbindungen an diesem Port warten, und führt dann `callback`
  aus, sobald er bereit ist.

Während der Server läuft, öffne ein **zweites** Terminal (das erste ist
beschäftigt, den Server auszuführen) und probier:

```
curl http://localhost:3000/tasks
```

Du solltest `[]` sehen — das leere Array, das `res.json([])`
zurückgeschickt hat. [`curl`](https://curl.se/) ist ein
Kommandozeilen-Werkzeug, um HTTP-Anfragen direkt zu stellen, ohne
Browser; es ist auf macOS und Linux vorinstalliert, und auf Windows
10/11. Ein grafisches Werkzeug wie [Postman](https://www.postman.com/)
oder Insomnia funktioniert genauso, falls du lieber klickst als tippst.

## 🟢 Kern — Daten im Arbeitsspeicher und sie lesen

Echte APIs speichern Daten in einer Datenbank; diese hier behält alles in
einem einfachen Array im Arbeitsspeicher, das bei jedem Neustart des
Servers zurückgesetzt wird — absichtlich einfach gehalten, damit der
Fokus auf HTTP selbst bleibt. Ersetz die Route mit dem leeren Array oben
durch:

```js
const crypto = require("crypto");

let tasks = [
  { id: crypto.randomUUID(), text: "Learn Express", done: false },
  { id: crypto.randomUUID(), text: "Build a REST API", done: false },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(task);
});
```

- [`crypto.randomUUID()`](https://nodejs.org/api/crypto.html#cryptorandomuuid)
  ist in Node eingebaut und erzeugt bei jedem Aufruf eine neue, eindeutige
  Id-Zeichenkette. Frühere Browser-Kurse haben die Position eines
  Elements im Array als seine Identität genutzt (`data-index`) — das
  funktioniert nicht mehr, sobald Elemente in beliebiger Reihenfolge
  erstellt und gelöscht werden können, auf einem Server, mit dem auch
  andere Programme sprechen, daher bekommen Aufgaben stattdessen ihre
  eigene dauerhafte `id`, unabhängig von der Position im Array.
- `:id` in `"/tasks/:id"` ist ein **Routen-Parameter** — ein Platzhalter,
  der auf alles an dieser Stelle im Pfad passt (`/tasks/abc-123` macht
  `req.params.id` gleich `"abc-123"`). `.find(...)` (dieselbe
  Array-Methode aus früheren Kursen) findet die passende Aufgabe.
- `res.status(404).json(...)` setzt den Statuscode der Antwort, bevor ihr
  Body verschickt wird — ohne einen expliziten `.status(...)`-Aufruf
  nutzt Express standardmäßig `200`, was für "nicht gefunden" gelogen
  wäre.

Starte den Server neu (`Strg+C`, dann wieder `node server.js`) und
probier beide:

```
curl http://localhost:3000/tasks
curl http://localhost:3000/tasks/<eine-echte-id-aus-der-zeile-oben-einfügen>
```

## 🟢 Kern — Eine Aufgabe erstellen

Jetzt bist du dran. `app.post("/tasks", (req, res) => { ... })` soll:

1. `req.body.text` lesen. Fehlt es, oder ist es nach
   [`.trim()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
   leer, antworte mit `res.status(400).json({ error: "text is required"
   })` und `return`.
2. Andernfalls ein neues Aufgaben-Objekt bauen — `{ id:
   crypto.randomUUID(), text: <der getrimmte Text>, done: false }` — und
   es mit `.push(...)` auf `tasks` legen.
3. Mit `res.status(201).json(newTask)` antworten — `201 Created`, mit der
   neuen Aufgabe (samt ihrer generierten `id`) im Body, damit weiß, wer
   die Anfrage geschickt hat, mit welcher Id als Nächstes gearbeitet
   werden kann.

```js
app.post("/tasks", (req, res) => {
  // dein Code hier — die drei Schritte oben
});
```

Testen (das zweite Terminal, der Server läuft weiter im ersten):

```
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"text\":\"Write the chapter\"}"
```

`-X POST` setzt die Methode, `-H` fügt den Header hinzu, der dem Server
sagt, dass der Body JSON ist (genau danach sucht `express.json()`), und
`-d` ist der Body selbst. Du solltest eine `201`-Antwort mit deiner neuen
Aufgabe zurückbekommen, `id` inklusive — und `curl
http://localhost:3000/tasks` danach sollte sie in der vollständigen Liste
zeigen.

## 🟢 Kern — Eine Aufgabe ändern

`app.patch("/tasks/:id", (req, res) => { ... })`, mit demselben
Nachschlage-Muster wie `GET /tasks/:id` oben:

1. Die Aufgabe über `req.params.id` finden, genauso wie `GET /tasks/:id`
   es tut. Gibt es keinen Treffer, genauso mit `404` antworten und
   `return`.
2. Ist `req.body.text` nicht `undefined`, setz `task.text` darauf. Ist
   `req.body.done` nicht `undefined`, setz `task.done` darauf. (Auf
   `undefined` zu prüfen statt nur auf Wahrheitswert ist hier wichtig —
   `done: false` ist ein gültiger Wert zum Setzen, und eine
   Falsy-Prüfung würde ihn stillschweigend ignorieren.)
3. Mit `res.json(task)` antworten — die aktualisierte Aufgabe, Status
   `200` standardmäßig.

```js
app.patch("/tasks/:id", (req, res) => {
  // dein Code hier — die drei Schritte oben
});
```

`PATCH` (*einen Teil* von etwas ändern) unterscheidet sich bewusst von
`PUT` (das Ganze ersetzen) — dieser Handler fasst nur die Felder an, die
die Anfrage tatsächlich mitgeschickt hat, deshalb prüfen beide gezielt
gegen `undefined`. Testen, eine Aufgabe als erledigt zu markieren:

```
curl -X PATCH http://localhost:3000/tasks/<id> -H "Content-Type: application/json" -d "{\"done\":true}"
```

## 🟢 Kern — Eine Aufgabe löschen

Das hier bekommst du fertig — dasselbe Nachschlage-Muster ein drittes
Mal, nichts Neues:

```js
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  tasks.splice(index, 1);
  res.status(204).end();
});
```

[`.findIndex(...)`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
ist das Geschwister von `.find(...)` — es gibt die Position des
passenden Elements zurück (oder `-1`, wenn nichts passt) statt des
Elements selbst, was `.splice(...)` braucht, um es zu entfernen.
`res.status(204).end()` schickt eine Antwort ganz ohne Body — `204 No
Content` bedeutet "es hat geklappt, es gibt nichts mitzuteilen", also
gibt es nichts für `.json(...)`.

Testen, dann mit einem `GET` bestätigen, dass sie wirklich weg ist
(diesmal ein `404`):

```
curl -X DELETE http://localhost:3000/tasks/<id>
curl http://localhost:3000/tasks/<id>
```

## 🟡 Optional — Nach Status filtern

Füg Unterstützung für `GET /tasks?done=true` (und `?done=false`) hinzu,
das nur passende Aufgaben zurückgibt, volle Liste ungefiltert, wenn der
Query-String fehlt. Innerhalb des bestehenden `GET /tasks`-Handlers hält
`req.query.done` den `done`-Wert des Query-Strings als **Zeichenkette**
(`"true"` oder `"false"`, nie ein echter Boolean), wenn vorhanden,
`undefined`, wenn nicht — filter `tasks` entsprechend mit `.filter(...)`,
bevor du `res.json(...)` aufrufst.

## 🔴 Optional, echte Herausforderung — Aufgaben in eine Datei speichern

Aktuell gehen beim Stoppen des Servers alle Aufgaben verloren. Nutz Nodes
eingebautes [`fs`](https://nodejs.org/api/fs.html)-Modul (`const fs =
require("fs");`), um `tasks` nach jeder Änderung, die es verändert, in
eine `tasks.json`-Datei zu schreiben (`fs.writeFileSync("tasks.json",
JSON.stringify(tasks))`), und sie beim Start wieder zu laden, statt des
fest eingebauten Zwei-Aufgaben-Arrays (`fs.existsSync("tasks.json")`, um
zu prüfen, ob die Datei schon existiert, dann
`JSON.parse(fs.readFileSync("tasks.json", "utf-8"))`, um sie zu lesen).
Das ist dieselbe "Daten in Text verwandeln, um sie zu speichern, beim
Reinlesen wieder einlesen"-Idee wie bei `localStorage` in früheren
Kursen — nur eine echte Datei auf der Festplatte statt des
Browser-Speichers, und genau der Grund, warum eine wirklich ernsthafte
App stattdessen zu einer echten Datenbank greift, was genau dorthin
führt, wo die nächste Idee in
[PROJECT-IDEAS.de.md](../../../PROJECT-IDEAS.de.md) hingeht.

## Checkpoint & was du gelernt hast

- JavaScript als eigenständiges Programm mit Node.js ausführen, außerhalb
  jedes Browsers
- `npm` und `package.json`, um eine Abhängigkeit zu deklarieren und zu
  installieren
- HTTP-Methoden, Pfade, Statuscodes und JSON-Bodys — das Vokabular, aus
  dem jede REST-API gebaut ist
- Express: `app.get`/`.post`/`.patch`/`.delete`, Routen-Parameter
  (`:id`), `req.body`, `req.params`, und `res.status(...).json(...)`
- Eine API direkt mit `curl` testen, ganz ohne Browser oder Oberfläche
- Warum eine vom Server verwaltete Liste stabile Ids
  (`crypto.randomUUID()`) statt Array-Position braucht

## Was als Nächstes kommt

Dieser Kurs steht für sich. Für eine größere Auswahl, was als Nächstes zu
bauen wäre — inklusive ein Frontend mit einem Server genau wie diesem zu
verbinden, mit einer echten Datenbank dahinter —, siehe
[PROJECT-IDEAS.de.md](../../../PROJECT-IDEAS.de.md).
