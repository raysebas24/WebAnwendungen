const express =require("express");
const app = express();

app.listen(3000, () => {
    console.log("Web-Server started and listening on port 3000");
});

var path = require('path');

try{

    //view engine
    app.set('view engine', 'ejs')

    app.use(express.static(__dirname));                         //express.static stellt statische Dateien bereit. (z.B. Bilder, CSS-Dateien, usw.)
    app.use(express.static('views'));                           //app.use registriert ein Middleware. Ich kann jetzt Dateien aus 'views' verwenden
    app.set('views', __dirname + '/views');                     //app.set speichert Eigenschaften, welche später von app.get aufgerufen werden können. Speichern und abrufen vno Variablen
    app.use(express.static('js'));
    app.set('js', __dirname + '/js');
    app.use(express.static('public'));
    app.set('public', __dirname + '/public');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/public', express.static(path.join(__dirname, 'public')));



    app.get('/', (req, res) => {
        console.log("Home page entered")
        res.render('index')
    })

    app.get('/index', (req, res) => {
        console.log("Index page entered")
        res.render('index')
    })

    app.get('/buchen', (req, res) => {
        console.log("Buchen page entered")
        res.render('buchen')
    })

    app.get('/betreiber', (req, res) => {
        console.log("Betreiber page entered")
        res.render('betreiber')
    })

    app.get('/hafen', (req, res) => {
        console.log("Hafen page entered")
        res.render('hafen')
    })

    app.get('/admin', (req, res) => {
        console.log("Admin page entered")
        res.render('admin')
    }) 

} catch(ex){
    console.error(ex);
}