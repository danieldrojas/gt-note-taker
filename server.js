const express = require("express");
const path = require("path");
const app = express();
const db = require("./db/db.json")
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
   
    //read file and return notes object
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        // console.log("this is data", JSON.parse(data))
        return res.json(JSON.parse(data))
    })
  
})

    // < !-- * POST`/api/notes` - Should receive a new note to save on the request body, add it to the`db.json` file, and then return the new note to the client. -- >

app.post("/api/notes", (req, res) => {
  

    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const arrayOfNotes = JSON.parse(data);
        console.log("this is my array",arrayOfNotes)
        const newNote = req.body;
        console.log("This is newNote", newNote);
        arrayOfNotes.push(newNote)

        const stringArray = JSON.stringify(arrayOfNotes)


        

        //Over weriteFile db first and then push new value
        fs.writeFile(__dirname + "/db/db.json", stringArray, (err, data) => {
            if (err) throw err;
            console.log("this is my array after write",arrayOfNotes)

           return res.json(arrayOfNotes);
        })

        


        // console.log("this is arrayofnotes", arrayOfNotes)
        // JSON.parse(arrayOfNotes);
        // console.log(JSON.stringify(arrayOfNotes));

        
    });
});
    





app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT)
})


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// })