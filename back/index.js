const express = require('express');

const app = express();

const port = 3000;

const testRange = {
    start: 1999,
    end: 2017
};

const testData = [
    {
        city: {
            lat: 84.948179,
            lon: 56.48466
        },
        radius: 200,
        amount: 1000000
    }
];

app.get('/range', function (req, res) {
    res.json(testRange);
});

app.get('/import', function(req, res) {
    res.json(testData);
});

app.get('/export', function(req, res) {
    res.json(testData);
});

app.listen(port, function () {
    console.log("Running on port: " + port)
});
