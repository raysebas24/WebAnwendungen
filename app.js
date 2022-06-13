const express =require("express");
const app = express();

app.listen(3000, () => {
    console.log("Web-Server started and listening on port 3000");
});

app.use(express.static(__dirname));

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html");
});

//Das ist ein Test Kommentar. Ich erweiter KOmmenta aus main
//Das ist ein Test Kommentar
//Hier kommt der zweite Kommentar von bugFix
//Hier noch ein Testkommentart von bugFix Nummer 2
