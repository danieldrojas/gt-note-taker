const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Routes:
app.get("/", (req, res) => {
    res.send("Hello world")
})




app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT)
})