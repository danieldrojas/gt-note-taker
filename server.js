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
        const newNote = req.body
        console.log("This is newNote", newNote);
        arrayOfNotes.push(newNote)

        //Add id to each obj and assign them the value of index
        for (let i = 0; i < arrayOfNotes.length; i++) {
            arrayOfNotes[i].id = i;
        }
        console.log(arrayOfNotes);


        
    

        const stringArray = JSON.stringify(arrayOfNotes)


        

        //Overwrite db file 
        fs.writeFile(__dirname + "/db/db.json", stringArray, (err, data) => {
            if (err) throw err;
            console.log("this is my array after write",arrayOfNotes)

           return res.json(arrayOfNotes);
        })

        


        
    });
});
    


//  * DELETE`/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.This means you'll need to find a way to give each note a unique `id` when it's saved.In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


app.delete("/api/notes/:id", (req, res) => {



    const clickedID = parseInt(req.params.id)
    console.log("this type is ", typeof clickedID)


    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const arrayOfNotes = JSON.parse(data);

        console.log("click delete buttons and array is", arrayOfNotes)

        let filteredArrayOfNotes = arrayOfNotes.filter(function(objNotes) {
     return objNotes.id !== clickedID
            console.log("This is my obb", objNotes.id)
        
        });
        console.log("THIS IS A CLICKED NUMBER", clickedID)


        console.log("this is my filterd array", filteredArrayOfNotes)

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(filteredArrayOfNotes), (err) => {
            if (err) throw err;

            res.json(filteredArrayOfNotes)
            
        });



            




    })



    
});


app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT)
})


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// })