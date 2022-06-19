const helper = require('../helper.js');
const BuchungsanfrageDao = require('../dao/buchungsanfrageDao.js');                 //Einbinden des Modules 'buchungsanfrageDao'
const express = require('express');
var serviceRouter = express.Router();                                               //

console.log('- Service Buchungsanfrage');

serviceRouter.get('/buchungsanfrage/gib/:id', function(request, response) {
    console.log('Service Buchungsanfrage: Client requested one record, id=' + request.params.id);

    const buchungsanfrageDao = new BuchungsanfrageDao(request.app.locals.dbConnection);
    try {
        var obj = buchungsanfrageDao.loadById(request.params.id);
        console.log('Service Buchungsanfrage: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Buchungsanfrage: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/buchungsanfrage/alle', function(request, response) {                            //URL Aufruf für die Ausgabe 'aller' Datensätze
    console.log('Service Buchungsanfrage: Client requested all records');

    const buchungsanfrageDao = new BuchungsanfrageDao(request.app.locals.dbConnection);             //Neues Datenbank-Objekt -> lifetime = request lifetime
    try {
        var arr = buchungsanfrageDao.loadAll();                                                     //führt aus der 'buchungsanfrageDao' die 'loadAll()' funktion aus
        console.log('Service Buchungsanfrage: Records loaded, count=' + arr.length);                //Gibt mir auf der Konsole die Anzahl der Buchungseinträe aus
        response.status(200).json(arr);                                                             //Gibt mir auf der Konsole ein Erfolgreichen Response zurück
    } catch (ex) {
        console.error('Service Buchungsanfrage: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/buchungsanfrage/existiert/:id', function(request, response) {
    console.log('Service Buchungsanfrage: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const buchungsanfrageDao = new BuchungsanfrageDao(request.app.locals.dbConnection);
    try {
        var exists = buchungsanfrageDao.exists(request.params.id);
        console.log('Service Buchungsanfrage: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Buchungsanfrage: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/buchungsanfrage', function(request, response) {
    console.log('Service Buchungsanfrage: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.nachname)) 
        errorMsgs.push('nachname fehlt');
    if (helper.isUndefined(request.body.vorname)) 
        errorMsgs.push('vorname fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.handynr)) 
        errorMsgs.push('handynr fehlt');
    if (helper.isUndefined(request.body.beginn)) 
        errorMsgs.push('beginn fehlt');
    if (helper.isUndefined(request.body.ende)) 
        errorMsgs.push('ende fehlt');
    if (helper.isUndefined(request.body.bootslaenge)) 
        errorMsgs.push('bootslaenge fehlt');    
    if (errorMsgs.length > 0) {
        console.log('Service Buchungsanfrage: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const buchungsanfrageDao = new BuchungsanfrageDao(request.app.locals.dbConnection);
    try {
        var obj = buchungsanfrageDao.create(request.body.nachname, request.body.vorname,request.body.email, request.body.handynr,request.body.beginn, request.body.ende,request.body.bootslaenge);
        console.log('Service Buchungsanfrage: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Buchungsanfrage: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/buchungsanfrage', function(request, response) {
    console.log('Service Buchungsanfrage: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.nachname)) 
        errorMsgs.push('nachname fehlt');
    if (helper.isUndefined(request.body.vorname)) 
        errorMsgs.push('vorname fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.handynr)) 
        errorMsgs.push('handynr fehlt');
    if (helper.isUndefined(request.body.beginn)) 
        errorMsgs.push('beginn fehlt');
    if (helper.isUndefined(request.body.ende)) 
        errorMsgs.push('ende fehlt');
    if (helper.isUndefined(request.body.bootslaenge)) 
        errorMsgs.push('bootslaenge fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Buchungsanfrage: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const buchungsanfrageDao = new BuchungsanfrageDao(request.app.locals.dbConnection);
    try {
        var obj = buchungsanfrageDao.update(request.body.id, request.body.nachname, request.body.vorname, request.body.email, request.body.handynr, request.body.beginn, request.body.ende, request.body.bootslaenge);
        console.log('Service Buchungsanfrage: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Buchungsanfrage: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/buchungsanfrage/:id', function(request, response) {
    console.log('Service Buchungsanfrage: Client requested deletion of record, id=' + request.params.id);

    const buchungsanfrageDao = new BuchungsanfrageDao(request.app.locals.dbConnection);
    try {
        var obj = buchungsanfrageDao.loadById(request.params.id);
        buchungsanfrageDao.delete(request.params.id);
        console.log('Service Buchungsanfrage:: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Buchungsanfrage: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;