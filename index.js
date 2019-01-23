const express = require('express');
const app = express();
const port = 3000;

app.get('/submissions', (req, res) => res.send('Hello World!'));
app.get('/submissions/:id', (req, res) => res.send('Hello World!'));

app.post('/submissions', (req, res) => {
    // create id;
    /*
        req.body = 
        {
            boa: true/false,
            type: 'sub/sweep/pass',
            position: 'closed guard/open guard',
            positionName: 'arm lock',
            yourBelt: 'white/blue/purple/brown/black,
            theirBelt: 'white/blue/purple/brown/black,
            date: 'utf date'
        }
    */
});

app.delete('/submissions/:id', (req, res) => {

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))