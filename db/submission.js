/*
    If you have installed mongodb through homebrew then you can simply start mongodb through

    brew services start mongodb
    Then access the shell by

    mongo
    You can shut down your db by

    brew services stop mongodb
    You can restart your db by

    brew services restart mongodb
    For more options

    brew info mongodb

*/
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'submission-tracker';
const collectionName = 'submissions';
const totalsCollectionName = 'totals';
const client = new MongoClient(url);

const totalHelpers = require('../utils/helpers/totals');
/*
    private methods
*/
const updateTotals = function(db, payload, callback) {
    const totalsCollection = db.collection(totalsCollectionName);
    return totalsCollection.find({user: payload.user}).limit(1).toArray((err, totals) => {
        if (err) {
            return callback(err, totals);
        }
        // initialize new totals
        if (totals.length < 1) {
            return totalsCollection.insert(totalHelpers.newTotals(payload), (newTotalsErr, newTotalsResult) => {
                return callback(newTotalsErr, newTotalsResult);
            });
        }
    
        const updatedTotals = totalHelpers.getUpdatedTotals(payload, totals[0]);
    
        return totalsCollection.updateOne({ user: payload.user }, { "$set": updatedTotals }, (err, result) => {
            callback(err, result);
        });
    });
};

const insertDocuments = function(db, payload, callback) {
    const collection = db.collection(collectionName);
    if (!(payload instanceof Array)) {
        payload = [payload];
    }

    if (!collection) {
        return callback(new Error('Could not location collection ', collectionName), null);
    }

    collection.insertMany(payload, function(insertErr, insertResult) {
      console.log("Inserted document successfully");
      updateTotals(db, payload[0], (updateErr, updateResult) => {
          callback(insertErr + updateErr, [insertResult, updateResult]);
      })
    });
};


const findDocuments = function(db, payload, callback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    if (!collection) {
        return callback(new Error('Could not location collection ', collectionName), null);
    }
    // Find some documents
    // if payload = {} get all 

    collection.find(payload || {}).toArray(function(err, docs) {
      callback(err, docs);
    });
}

const validRequest = function(db, payload) {
    let result = {
        valid: true,
        reason: null
    };

    if (!db) {
        result.valid = false;
        result.reason = new Error("No DB instance to act upon");
    }

    if (!payload) {
        result.valid = false;
        result.reason = new Error("Must provide a valid payload");
    }

    return result;
}

/*
    public methods
*/
// Use connect method to connect to the server
function connect(cb) {
    client.connect(function(err) {
        if (err) {
            return cb(err, null);
        }
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
      
        return cb(null, db);
      });
}

function insert(db, payload, cb) {
    const validReq = validRequest(db, payload);
    if (!validReq.valid) {
        return cb(null, validReq.reason)
    }

    return insertDocuments(db, payload, (err, result) => cb(err, result));
}

function del(db, payload, cb) {

}

function get(db, payload, cb) {
    return findDocuments(db, payload, cb);
}

module.exports = {
    connect: connect,
    insert: insert,
    del: del,
    getAllSubmissions: get
};