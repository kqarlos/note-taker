// Dependencies=====================================
var express = require("express");
var path = require("path");
const fs = require('fs');
const Note = require("./note");


// Sets up the Express App
// =================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/'));


var notes = [];

//routes to index
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// route to all notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// gets all notes by reading .json file and returning the data
app.get("/api/notes", function (req, res) {
    fs.readFile('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        return res.json(notes);
    });

});


// gets a note by reading the .json file and getting the note the user asked for by its id
app.get("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    fs.readFileSync('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });

    console.log("Looking for note ID: " + id + "=============");

    for (var i = 0; i < notes.length; i++) {

        if (notes[i].id == id) {
            console.log("Found:");
            console.log(notes[i]);
            return res.json(notes[i]);
        }
    }

    res.json(id);
})

//creates or updates a NOTE. -1 if new note else updated note
app.post("/api/notes", function (req, res) {
    console.log("New Note ====================");
    fs.readFileSync('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });

    var newNote;
    if (req.body.id == -1) {
        newNote = new Note(req.body.title, req.body.body);
        notes.push(newNote);

    } else {
        newNote = req.body;
        for (var i = 0; i < notes.length; i++) {
            if (newNote.id == notes[i].id) {
                notes.splice(i, 1, newNote);
            }
        }
    }
    console.log(newNote);

    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('The file was updated!');
    });

    res.json(notes);
});

//deletes a note dpending on the id sent by the client-side js
app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    fs.readFileSync('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });

    for (var i = 0; i < notes.length; i++) {

        if (notes[i].id == id) {
            console.log("Deleting ==============");
            console.log(notes[i]);
            notes.splice(i, 1);
        }
    }

    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('The file was updated!');
    });

    res.json(id);
})

// Starts the server to begin listening=========================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
