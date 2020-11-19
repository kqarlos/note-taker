// Dependencies=====================================
var express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Sets up the Express App
// =================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
// Lets express know to interpret incoming data as a json object
app.use(express.json());
app.use(express.static(__dirname + '/'));

//routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Starts the server to begin listening=========================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
