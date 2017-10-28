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

app.get('/range', function (req, res) {
    data.getRange().then(function(result) {
        res.json({
            min: result.min,
            max: result.max
        });
    });
});

app.get('/import', function(req, res) {
    api.getImports(req.query.year || getCurrentYear()).then(function(results) {
        res.json(results);
    });
});

app.get('/export', function(req, res) {
    api.getExports(req.query.year || getCurrentYear()).then(function(results) {
        res.json(results);
    });
});

app.listen(port, function () {
    console.log("Running on port: " + port)
});
