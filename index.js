const express = require('express');
const mongo = require('./db/submission');
const isValidSubmission = require('./utils/validation/valid-submission');
const app = express();
const port = 3000;

let startUpTries = 2;
const startUp = () => {
    mongo.connect((err, db) => {
        if (err) {
            startUpTries = startUpTries - 1;
            return startUpTries > 0 ? startUp() : process.exit();
        }

        app.use(express.json());

        app.get('/submissions', (req, res) => mongo.get(db, {}, (err, results) => {
            if (err) {
                res.status(404);
                return res.send([]);
            }

            res.status(200);
            return res.send(results);
        }));


        app.get('/submissions/:id', (req, res) => res.sendStatus('Hello World!'));
        
        app.post('/submissions', (req, res) => {
            const submission = req.body;
            console.log('loc1 ', submission);
            if (!submission || !isValidSubmission(submission)) {
                return res.sendStatus(404);
            }

            return mongo.insert(db, submission, (err, result) => {
                if (err || !result) {
                    console.error('Error while inserting submission: ', err);
                    return res.sendStatus(404);
                }
                
                console.log(result);
                return res.sendStatus(200);
            });
        });
        
        app.delete('/submissions/:id', (req, res) => {
        
        });
        
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    });
};

startUp();





// create id;
/*
    req.body = 
    {
        _id: '123', // on the object already
        user: 'jschapir',
        boa: true/false,
        type: 'sub/sweep/pass',
        position: 'closed guard/open guard',
        positionName: 'arm lock',
        yourBelt: 'white/blue/purple/brown/black,
        theirBelt: 'white/blue/purple/brown/black,
        date: new Date()
    }
*/