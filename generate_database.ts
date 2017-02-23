var Datastore = require('nedb');

var jsonfile = require('jsonfile');

// ----------------------------- GENERATE DATABASE FILE ON -------------------------------
var new_db = new Datastore(
                {
                    filename: 'database/one_explanation_database.database',
                    autoload: true
                }
            );
jsonfile.readFile('database/one_explanation_database.json', function(err, content) {
    console.log('content from JSON file',content);
    new_db.insert(content, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });
});
// ----------------------------- GENERATE DATABASE FILE OFF ------------------------------
