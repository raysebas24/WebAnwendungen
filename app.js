const express =require("express");                                  //Einbinden des Moduls 'express'. Webserver selbst
const app = express();                                              //Initialisieren des 'express' Moduls

app.listen(3000, () => {                                            //Abhören des angegebenen Ports. Hier 3000
    console.log("Web-Server started and listening on port 3000");
});

app.use(express.static(__dirname));                                 //Middleware, welche statische Datein bereitstellt. Hier unsere Webseite

app.get("/",(req,res) => {                       //Dieser Code wird nie durchlaufen!!!
    res.sendFile(__dirname + "/index.html");
    console.log(">>> send index <<<")
});

