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
   
    //read file and retunr notes object
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        console.log("this is data", JSON.parse(data))
        return res.json(JSON.parse(data))
    })
    //this returns that json obj
// console.log(db)
//  res.json(db)
})

app.post("/api/notes", (req, res) => {
    console.log(db)
    res.json(db)
})




app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT)
})


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// })