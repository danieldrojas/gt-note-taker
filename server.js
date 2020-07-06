const express = require("express");
const path = require("path");
const app = express();

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
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

//Api Routes
app.post("/notes")




app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT)
})