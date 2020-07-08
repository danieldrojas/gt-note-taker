const express = require("express");
const path = require("path");
const app = express();
let db = require("./db/db.json")
const fs = require("fs")

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));




//View Routes:
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

//Api Routes
app.get("/api/notes", (req, res) => {
   
   // read file and return notes object
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        return res.json(JSON.parse(data))
    })
  
})

app.post("/api/notes", (req, res) => {   
  
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const arrayOfNotes = JSON.parse(data);
        const newNote = req.body
        arrayOfNotes.push(newNote)

        //Add id to each obj and assign them the value of index
        for (let i = 0; i < arrayOfNotes.length; i++) {
            arrayOfNotes[i].id = i;
        }
        const stringArray = JSON.stringify(arrayOfNotes)       

        //Overwrite db file 
        fs.writeFile(__dirname + "/db/db.json", stringArray, (err, data) => {
            if (err) throw err;

           return res.json(arrayOfNotes);
        })       
    });
});

app.delete("/api/notes/:id", (req, res) => {
    const clickedID = parseInt(req.params.id)
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const arrayOfNotes = JSON.parse(data);
        let filteredArrayOfNotes = arrayOfNotes.filter(function (objNotes) {
            return objNotes.id !== clickedID;        
        });
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(filteredArrayOfNotes), (err) => {
            if (err) throw err;
            res.json(filteredArrayOfNotes);
            
        });
    })    
});

//Listen to PORT 
app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT)
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})