const router = require("express").Router();
const fs = require('fs');
const Note = require("../data/note");
var notes = [];


// gets all notes by reading .json file and returning the data
router.get("/notes", function (req, res) {
    fs.readFile('./data/db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        return res.json(notes);
    });

});


// gets a note by reading the .json file and getting the note the user asked for by its id
router.get("/notes/:id", function (req, res) {
    var id = req.params.id;
    fs.readFileSync('./data/db.json', (err, data) => {
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
});

//creates or updates a NOTE. -1 if new note else updated note
router.post("/notes", function (req, res) {
    console.log("New Note ====================");
    fs.readFileSync('./data/db.json', (err, data) => {
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

    fs.writeFile("./data/db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('The file was updated!');
    });

    res.json(notes);
});

//deletes a note dpending on the id sent by the client-side js
router.delete("/notes/:id", function (req, res) {
    var id = req.params.id;
    fs.readFileSync('./data/db.json', (err, data) => {
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

    fs.writeFile("./data/db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('The file was updated!');
    });

    res.json(id);
});

module.exports = router;