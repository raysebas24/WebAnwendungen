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