/// <reference path="typings/index.d.ts" />
// --------------------------------- IMPORT MODULES ON -----------------------------------
import express = require('express');
import path = require('path');
// --------------------------------- IMPORT MODULES OFF ----------------------------------

// --------------------------------- VARIABLES INIT ON -----------------------------------
var Datastore = require('nedb');

// Persistent datastore with automatic loading
var unitsDB = new Datastore(
                {
                    filename: 'database/units.database',
                    autoload: true
                }
            );

var port: number = process.env.PORT || 3000;

var app = express();

// Allow CORS - because of the two servers (lite-server and node server app)
var cors = require('cors');
app.use(cors()); 

// var jsonfile = require('jsonfile');
// --------------------------------- VARIABLES INIT OFF ----------------------------------

// ----------------------------- GENERATE DATABASE FILE ON -------------------------------
/*var new_db = new Datastore(
                {
                    filename: 'database/no_spaces_database.database',
                    autoload: true
                }
            );
jsonfile.readFile('database/original_database.json', function(err, content) {
    console.log('content from JSON file',content);
    new_db.insert(content, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });
});*/
// ----------------------------- GENERATE DATABASE FILE OFF ------------------------------

// ------------------------------------- ROUTE ON -----------------------------------------
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

var renderSystemJs = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'systemjs.config.js'));
}
app.get('/systemjs.config.js', renderSystemJs);

app.get('/content', function (req: express.Request, res: express.Response){
    console.log('GET all units');
    
    unitsDB.find({}, function (err, docs) {
        // console.log('all units result: ',docs);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs));
    });

});

app.get('/unit/:unitId/lesson/:lessonId', function (req, res) {

    var requestedUnitId = parseInt(req.params.unitId);
    console.log('GET unit with _id: ',requestedUnitId);

    var requestedLessonId = parseInt(req.params.lessonId);
    console.log('GET lesson with _id: ',requestedLessonId);

    unitsDB.findOne({ _id: requestedUnitId, "lessons._id":requestedLessonId }, function (err, docs) {
        // the findOne function returns only an object, not an array

        /**
         * In this case 'docs' contains the complete unit document that fits the query filter
         */
        // console.log('lets see our lesson: ',docs.lessons);
        res.setHeader('Content-Type', 'application/json');
        
        // Get and return only the lesson object that fits the query filter
        var requestedLesson = docs.lessons.find( lesson => lesson._id === requestedLessonId);
        // console.log('the one that I want: ', requestedLesson);
        res.send(JSON.stringify(requestedLesson));
    });

});

app.get('/unit/:unitId', function (req, res) {

    var requestedId = parseInt(req.params.unitId);
    console.log('GET unit with _id 1: ',requestedId);

    unitsDB.findOne({ _id: requestedId }, function (err, docs) {
        // the findOne function returns only an object, not an array
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs));
    });

});

app.put('/unit/:unitId', function (req, res) {
    console.log('Got a PUT request to unit!!');
    // unitsDB.
    res.send('Got a PUT request to unit!!')
})

var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
}
app.get('/*', renderIndex);

// ------------------------------------- ROUTE OFF ---------------------------------------

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This awesome express app is listening on: '+ host +':' + port);
});