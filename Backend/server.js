/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})      //???
/////////////////

const helper = require('./helper.js');
const fileHelper = require('./fileHelper.js');                  //Überprüft Dateien auf Vorhandensein vor dem beschreiben
console.log('Starting server...');

try {
    // connect database
    console.log('Connect database...');
    const Database = require('better-sqlite3');                 //Einbinden des Moduls 'better-sqlite3'
    const dbOptions = { verbose: console.log };                 //??? Verbose = mehr Informationen
    const dbFile = './db/webanw2.sqlite';                       //Verweis auf Speicherort der Datenbank
    const dbConnection = new Database(dbFile, dbOptions);       //Neue Datenbank erstellen

    // create server
    const HTTP_PORT = 8000;
    const express = require('express');                         //Einbinden des Moduls 'express'. Webserver selbst
    const fileUpload = require('express-fileupload');           //Middleware für Dateiuploads
    const cors = require('cors');                               //Middleware für CORS Requests
    const bodyParser = require('body-parser');                  //Middleware zum Parsen von Requests. Vereinfacht Requests
    const morgan = require('morgan');                           //Middleware zum loggen von HTTP Requests.
    const _ = require('lodash');                                //Middleware für Hilfsfunktionen

    console.log('Creating and configuring Web Server...');
    const app = express();                                      //Initialisieren des 'express' Moduls
    
    // provide service router with database connection / store the database connection in global server environment
    app.locals.dbConnection = dbConnection;

    console.log('Binding middleware...');
    app.use(express.static(__dirname + '/public'))              //Middleware, welche statische Datein bereitstellt
    app.use(fileUpload({                                        //Verarbeiten von Dateiuploads und festlegen deren größe
        createParentPath: true,
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024        // limit to 2MB
        }
    }));
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(function(request, response, next) {
        response.setHeader('Access-Control-Allow-Origin', '*'); 
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(morgan('dev'));

    // binding endpoints
    const TOPLEVELPATH = '/api';                                            //Deklariert meinen Top-Pfad, ab welchen dann umgelenkt werden soll. Alles ab localshost:8000/api
    console.log('Binding enpoints, top level Path at ' + TOPLEVELPATH);     
    
    var serviceRouter = require('./services/buchungsanfrage.js');           //Einbinden der Router Middleware 'buchungsanfrage' (liegt unter 'services')
    app.use(TOPLEVELPATH, serviceRouter);
    
    // send default error message if no matching endpoint found
    app.use(function (request, response) {
        console.log('Error occured, 404, resource not found');
        response.status(404).json({'fehler': true, 'nachricht': 'Resource nicht gefunden'});
    });


    // starting the Web Server
    console.log('\nBinding Port and starting Webserver...');

    var webServer = app.listen(HTTP_PORT, () => {                   //Abhören des angegebenen Ports. Hier HTTP_PORT = 8000
        console.log('Listening at localhost, port ' + HTTP_PORT);
        console.log('\nUsage: http://localhost:' + HTTP_PORT + TOPLEVELPATH + '/SERVICENAME/SERVICEMETHOD/....');
        console.log('\n\n-----------------------------------------');
        console.log('exit / stop Server by pressing 2 x CTRL-C');
        console.log('-----------------------------------------\n\n');
    });

} catch (ex) {
    console.error(ex);
}