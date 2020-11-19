var path = require("path");
const router = require("express").Router();

//routes to index
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
});

// route to all notes
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../notes.html"));
});


module.exports = router;