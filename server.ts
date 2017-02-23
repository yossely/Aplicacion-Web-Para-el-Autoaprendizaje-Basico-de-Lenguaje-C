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
                    filename: 'database/one_explanation_database.database',
                    autoload: true
                }
            );

var port: number = process.env.PORT || 3000;

var app = express();

// Allow CORS - because of the two servers (lite-server and node server app)
var cors = require('cors');
app.use(cors()); 

// File System API
var fs = require('fs');

// Child process to run commands
const spawn = require('child_process').spawn;

// Required to parse the body content and get the parameters in the POST callbacks
var bodyParser = require('body-parser');

// --------------------------------- VARIABLES INIT OFF ----------------------------------

// ------------------------------------- ROUTE ON -----------------------------------------
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.use(express.static('user_code_folder'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// GET - return systemjs.config.js
var renderSystemJs = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'systemjs.config.js'));
}
app.get('/systemjs.config.js', renderSystemJs);


// GET - return All Units
app.get('/content', function (req: express.Request, res: express.Response){    
    unitsDB.find({}, function (err, docs) {
        // console.log('all units result: ',docs);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs));
    });
});

// POST - create a .c file with the user C Code and compile it into JS with emcc
// POST method is used to submits data to be processed to a specified resource
app.post('/unit/:unitId/lesson/:lessonId/compileCCode', function (req, res) {
    var cCode: String = req.body.c_code;

    console.log('lets compile this C Code: ',cCode );

    fs.writeFile("user_code_folder/user_code.c", cCode, function(err) {
        // Error creating and writing into .c file
        if(err) {
            res.send(JSON.stringify('Error on compiling C Code... (creating and writing into .c file)'));
            // The return statement is needed for stop this callback and avoid continue with C Code compilation
            return console.log('Error writing file: ',err);
        }

        console.log("The file was saved successfully!");

        // var emsc = spawn('emcc',['user_code_folder/test.c','-o','user_code_folder/test.js']);
        var emsc = spawn('emcc',['user_code_folder/user_code.c',
                                 '--pre-js','user_code_folder/module_configuration.js',
                                 '--post-js','user_code_folder/console_behavior.js',
                                 '-o','user_code_folder/user_code_compiled.js']);
        emsc.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        emsc.stderr.on('data', (data) => {
            /* ToDo: 
                - Handle the emcc error and return a custom message to the user */
            
            // Http 500 - Internal Server Error (For now)
            res.status(500).end();
            console.log(`Error on compiling C Code with emcc, stderr: ${data}`);
        });

        emsc.on('close', (data) => {
            res.send(JSON.stringify('C Code compiled successfully, now load the JS'));
            console.log('finish');
        });
    }); 
});


// GET - return the JS file that contains the user C Code compiled.
app.get('/user_code_folder/user_code_compiled.js', function (req, res) {
    // res.send(JSON.stringify('alert test file'));
    res.sendFile(path.join(__dirname, '/user_code_folder','user_code_compiled.js'));
    // res.sendFile(path.join(__dirname, '/user_code_folder','alert_test.js'));

});


// GET - return the Markdown file that contains the explanation text
app.get('/database/explanations/:lessonFile', function (req, res) {
    // res.send(JSON.stringify('alert test file'));
    // res.sendFile(path.join(__dirname, '/user_code_folder','user_code_compiled.js'));
    var requestedLessonFile = req.params.lessonFile;
    console.log('GET lesson md file!! ',requestedLessonFile);
    res.sendFile(path.join(__dirname, '/database/explanations',requestedLessonFile));
});


// GET - return the specified lessson that belongs to the specified unit
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


// GET - return the specified Unit
app.get('/unit/:unitId', function (req, res) {

    var requestedId = parseInt(req.params.unitId);
    console.log('GET unit with _id 1: ',requestedId);

    unitsDB.findOne({ _id: requestedId }, function (err, docs) {
        // the findOne function returns only an object, not an array
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs));
    });

});

// GET - return the index.html file for all other requests
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