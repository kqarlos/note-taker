// Dependencies=====================================
var express = require("express");
var path = require("path");
const fs = require('fs');

// Sets up the Express App
// =================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [];

//routes to index
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// route to all notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// gets all notes
app.get("/api/notes", function (req, res) {
    fs.readFile('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        return res.json(notes);
    });

});

//creates new NOTE
app.post("/api/notes", function (req, res) {
    var newNote = {
        id: req.body.id,
        title: req.body.title,
        body: req.body.body

    }
    fs.readFileSync('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });

    notes.push(newNote);

    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('The file was updated!');
    });

    res.json(notes);
});

//deletes a note
app.delete("/api/notes/:id", function (req, res) {

    fs.readFileSync('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });


    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1);
        }
    }

    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('The file was updated!');
    });

    res.json(notes);
})

// Starts the server to begin listening=========================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
