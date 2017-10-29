const express = require('express');
const MultiGeocoder = require('multi-geocoder');

const Data = require('./data/data.js');
const Api = require('./api/api.js');

const data = new Data({
    socketPath: '/var/run/mysqld/mysqld.sock',
    user     : 'root',
    database : 'openhack'
});

const geocoder = new MultiGeocoder({ provider: 'yandex-cache', coordorder: 'latlong' });

const api = new Api({
    data: data,
    geocoder: geocoder
});

const app = express();

const port = 3000;

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
    var regional = req.query.regional === undefined ? true : (req.query.regional === 'true');

    api.getYearlyData(req.query.year || getCurrentYear(), regional).then(function(results) {
        res.json(results);
    });
});

app.get('/region', function(req, res) {
    api.getRegionalData(req.query.uid).then(function(results) {
        res.json(results);
    });
});

app.listen(port, function () {
    console.log("Running on port: " + port)
});
