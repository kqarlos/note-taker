# Note Taker

</br>
<p align="center">
    <img src="https://img.shields.io/github/languages/count/kqarlos/note-taker?style=for-the-badge" alt="Languages" />
    <img src="https://img.shields.io/github/languages/top/kqarlos/note-taker?style=for-the-badge" alt="Top Language" />
    <img src="https://img.shields.io/github/languages/code-size/kqarlos/note-taker?style=for-the-badge" alt="Code Size" />
    <img src="https://img.shields.io/github/repo-size/kqarlos/note-taker?style=for-the-badge" alt="Repo Size" />   
    <img src="https://img.shields.io/tokei/lines/github/kqarlos/note-taker?style=for-the-badge" alt="Total Lines" />
    <img src="https://img.shields.io/github/package-json/dependency-version/kqarlos/note-taker/express?style=for-the-badge" alt="Express Version" />
    <img src="https://img.shields.io/github/last-commit/kqarlos/note-taker?style=for-the-badge" alt="Last Commit" />  
    <img src="https://img.shields.io/github/issues/kqarlos/note-taker?style=for-the-badge" alt="Issues" />  
    <img src="https://img.shields.io/github/followers/kqarlos?style=social" alt="Followers" />  
    </p>

## Description

Real-time note taking application. Take notes, update them, and delete them with this note-taker.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
    * [Screenshots](#screenshots)
    * [Snippets](#snippets)
* [Credits](#credits)
* [License](#license)

## Installation

Steps to run application:
1. Clone git repository
2. Install dependencies
3. Start the application with an empty db.json file
4. run app

```
git clone git@github.com:kqarlos/note-taker.git
npm install
node server.js

```

<p align="center">
    <a href="https://note-taker2020.herokuapp.com/"><img src="https://img.shields.io/badge/-👉 See Live Site-success?style=for-the-badge"  alt="Live Site" /></a>
</p>


## Usage

## Screenshots

* Working app

![Site](assets/images/live.gif)


## Snippets



1. app.post();

```javascript
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

```
* This function is called when a note is either created or updatd. It uses Express' _post()_ function to facilitate the way in which information is received. using req.body I can easily access and process the information sent by the client-side javascript. Before I process the information I get a hold of all the existing notes. Then I check if the note is new or if it already exists. In which case, the information is either pushed into the array or updated. After this, the _db.json_ file gets written with the new list of notes.

2. Client to. Server side on getting a note.

```javascript

//gets a note CLIENT SIDE
$(document).on("click", ".list-group-item", function (e) {
    $("#notes").empty();
    $("#form").css("display", "none");
    $("#note").css("display", "block");
    //Gets the note id 
    var id = parseInt($(this).attr("data-id"));
    $("#noteID").append(id);
    //uses note id to query the server on that id
    $.get(`/api/notes/${id}`, function (data) {
        //updates web elements
        $("#noteTitle").val(data.title);
        $("#noteContent").val(data.body);

    });
});

// gets a note SERVER SIDE
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
    
```
* These two pieces of code show how information is processed on the client side and then sent over to the server to be retrieved from the _db.json_ file. On the client-side, the _note.id_ is retrieved from the DOM. The _note.id_ is sent to the server with a _get()_ method. On the server side _Express_ receives the id and with this, the Note is retreived form the _db.json_ file. Now, the _Note_ object is returned to the client-side and processed to be displayed on the user's screen.


## Credits

### Author

- 💼 Carlos Toledo: [portfolio](https://kqarlos.github.io)
- :octocat: Github: [kqarlos](https://www.github.com/kqarlos)
- LinkedIn: [carlos-toledo415](https://www.linkedin.com/in/carlos-toledo415/)


### Built With

</br>
<p align="center">
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/-HTML-orange?style=for-the-badge"  alt="HMTL" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS-blue?style=for-the-badge" alt="CSS" /></a>
    <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/-Javascript-yellow?style=for-the-badge" alt="Javascript" /></a>
    <a href="https://getbootstrap.com/"><img src="https://img.shields.io/badge/-Bootstrap-blueviolet?style=for-the-badge" alt="Bootstrap" /></a>
    <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/-Node-orange?style=for-the-badge" alt="Node" /></a>
    <a href="https://www.npmjs.com/package/express"><img src="https://img.shields.io/badge/-Express-blue?style=for-the-badge" alt="Express" /></a>
</p>

## License

<p align="center">
    <img align="center" src="https://img.shields.io/github/license/kqarlos/note-taker?style=for-the-badge" alt="MIT license" />
</p>
