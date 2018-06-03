const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((db) => {

    console.log('Connected correctly to server');

    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes")
        .then((result) => {

            console.log("After Insert:\n");
            console.log(result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("found documents   length = " + docs.length + "\n documents = " + docs[0].name + ", " + docs[0].description);

            return dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" },
                "dishes");
        })
        .then((result) => {
            console.log("updated document = \n" + result.result);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("found updated documents   length = " + docs.length + "\n documents = " + docs[0].name + ", " + docs[0].description);
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("droppedcollection result: \n" + result);
            db.close();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));