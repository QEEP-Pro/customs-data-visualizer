const express = require('express');
const MultiGeocoder = require('multi-geocoder');

const Data = require('./data/data.js');
const Api = require('./api/api.js');

const data = new Data({
    host     : 'localhost',
    port     : '3306',
    user     : 'admin',
    password : 'admin',
    database : 'opendata'
});

const geocoder = new MultiGeocoder({ provider: 'yandex-cache', coordorder: 'latlong' });

const api = new Api({
    data: data,
    geocoder: geocoder
});

const app = express();

const port = 3001;

const getCurrentYear = function() {
    return new Date().getFullYear();
};

app.use(function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/range', function (req, res) {
    data.getRange().then(function(result) {
        res.json({
            min: result.min,
            max: result.max
        });
    });
});

app.get('/data', function(req, res) {
    api.getYearlyData(req.query.year || getCurrentYear()).then(function(results) {
        res.json(results);
    });
});

app.listen(port, function () {
    console.log("Running on port: " + port)
});
