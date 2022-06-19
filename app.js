const express =require("express");
const app = express();

app.listen(3000, () => {
    console.log("Web-Server started and listening on port 3000");
});

var path = require('path');
//view engine
app.set('view engine', 'ejs')

app.use(express.static(__dirname));
app.use(express.static('views'));
app.set('views', __dirname + '/views');
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
    console.log("Home page entered")
    res.render('index')
})

app.get('/buchen', (req, res) => {
    res.render('buchen')
})

app.get('/betreiber', (req, res) => {
    res.render('betreiber')
})

app.get('/hafen', (req, res) => {
    res.render('hafen')
})

app.get('/admin', (req, res) => {
    res.render('admin')
}) 


//Das ist ein Test Kommentar. Ich erweiter KOmmenta aus main
//Das ist ein Test Kommentar
//Hier kommt der zweite Kommentar von bugFix
//Hier noch ein Testkommentart von bugFix Nummer 2
