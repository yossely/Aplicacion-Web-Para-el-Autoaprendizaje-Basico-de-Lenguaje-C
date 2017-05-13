var Datastore = require('nedb');

var Hjson     = require("hjson");
var fs        = require("fs");

// ----------------------------- CHECK SCRIPT ARGUMENTS ON -------------------------------

if(process.argv[2] === '--units'){
    /* Just generate units database (aprendaC.database) */
    // console.log('just units');
    generateDatabase('aprendaC.database','aprendaC.hjson');
}else if(process.argv[2] === '--tests'){
    /* Just generate tests database (tests.database) */
    // console.log('just tests');
    generateDatabase('tests.database','tests.hjson');
}else if(process.argv[2] === '--all'){
    /* Generate the two databases: units and tests (aprendaC.database and tests.database) */
    // console.log('units and tests database');
    generateDatabase('aprendaC.database','aprendaC.hjson');
    generateDatabase('tests.database','tests.hjson');
}

// ----------------------------- CHECK SCRIPT ARGUMENTS OFF ------------------------------


// ----------------------------- GENERATE DATABASE FILE ON -------------------------------
function generateDatabase(databaseFileName: string, databaseHJsonFileName: string) {
    
    // This is the HJson file where all the content is
    var hjsonText = fs.readFileSync('database/'+databaseHJsonFileName, "utf8");

    var HjsonOptions = {
        quotes: "all",
        keepWsc: false,
        bracesSameLine: true,
        emitRootBraces: true
    };

    /* Clear database file before inserting the data from the HJson file */
    fs.truncateSync('database/'+databaseFileName,0);

    var obj = Hjson.parse(hjsonText,HjsonOptions);
    // console.log("obj: ",obj);

    var new_db = new Datastore(
                    {
                        filename: 'database/'+databaseFileName,
                        autoload: true
                    }
                );

    new_db.insert(obj, function (err, newDoc) {   // Callback is optional
        if(err) {
            console.log('Error inserting in database: '+databaseFileName);
            console.log(err);
        }
        else{
            console.log('Insertion completed successfully in database: '+databaseFileName);
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            console.log(newDoc);
        }
    });
}
// ----------------------------- GENERATE DATABASE FILE OFF ------------------------------

