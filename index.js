const express = require('express');
const bodyParser = require('body-parser');
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

        app.use(bodyParser.urlencoded({ extended: false }));

        app.get('/submissions', (req, res) => res.send('Hello World!'));
        app.get('/submissions/:id', (req, res) => res.send('Hello World!'));
        
        app.post('/submissions', (req, res) => {
            const submission = req.body;

            if (!submission || !isValidSubmission(submission)) {
                return res.send(404);
            }

            return mongo.insert(db, submission, (err, result) => {
                if (err || !result) {
                    return res.send(404);
                }

                return res.send(200);
            });
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
        });
        
        app.delete('/submissions/:id', (req, res) => {
        
        });
        
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    });
};

startUp();