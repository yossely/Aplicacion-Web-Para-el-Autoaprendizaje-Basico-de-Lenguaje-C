var Datastore = require('nedb');

var Hjson     = require("hjson");
var fs        = require("fs");

// This is the HJson file where all the content is
var hjsonText = fs.readFileSync("database/aprendaC.hjson", "utf8");

var HjsonOptions = {
    quotes: "all",
    keepWsc: false,
    bracesSameLine: true,
    emitRootBraces: true
};

// ----------------------------- GENERATE DATABASE FILE ON -------------------------------
var obj = Hjson.parse(hjsonText,HjsonOptions);
// console.log("obj: ",obj);

var new_db = new Datastore(
                {
                    filename: 'database/aprendaC.database',
                    autoload: true
                }
            );

new_db.insert(obj, function (err, newDoc) {   // Callback is optional
    if(err) {
        console.log('Error inserting in database');
        console.log(err);
    }
    else{
        console.log('Insertion completed successfully');
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        console.log(newDoc);
    }
});
// ----------------------------- GENERATE DATABASE FILE OFF ------------------------------

