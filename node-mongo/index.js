const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes", (result) =>{

        console.log("After Insert:\n");
        console.log(result.ops);

        dboper.findDocument(db, "dishes", (docs) =>{
            console.log("found documents   length = " + docs.length + "\n documents = \n" + docs[0].name + ", " + docs[0].description);

            dboper.updateDocument(db,  { name: "Vadonut" }, { description: "Updated Test" },
            "dishes", (result) =>{
                console.log("updated document = \n" + result.result);
                dboper.findDocument(db, "dishes", (documents) =>{
                    console.log("found updated documents   length = " + docs.length + "\n documents = \n" + docs[0].name + ", " + docs[0].description);
                    db.dropCollection("dishes", (result) =>{
                        console.log("droppedcollection result: \n" + result);
                        db.close();
                    });

                });

            });
        });
    });
});