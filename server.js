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
    var newNote = req.body
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
    var id = req.params.id;
    fs.readFileSync('db.json', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });

    console.log(notes);
    console.log("ID to delete: " + id);

    for (var i = 0; i < notes.length; i++) {
        // console.log("id to delete: " + id);
        // console.log("Current Note: ");
        // console.log(notes[i]);
        // console.log("note id: ");
        // console.log(notes[i].id);

        if (notes[i].id == id) {
            console.log("Deleted this note");
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
