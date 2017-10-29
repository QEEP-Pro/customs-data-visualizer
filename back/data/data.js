const Promise = require('bluebird');
const mysql = Promise.promisifyAll(require('mysql'));
const capitalize = require("capitalize");

const Data = function(config) {
    this.config = config;
};

Data.prototype.query = function(sql, parameters) {
    const connection = Promise.promisifyAll(mysql.createConnection(this.config));

    connection.connect();

    return connection.queryAsync(sql, parameters).finally(function() {
        connection.end();
    });
};

Data.prototype.getRange = function() {
    return this.query("SELECT min(PERIOD), max(PERIOD) FROM TCBT").then(function(results) {
        var row = results[0];

        return {
            min: row['min(PERIOD)'],
            max: row['max(PERIOD)']
        };
    });
};

Data.prototype.getYearlyData = function(year, regional) {
    var sql = "SELECT REGION, sum(STOIM), NAPR FROM TCBT WHERE PERIOD = ? ";

    if (regional) {
        console.log(regional);
        sql += 'AND REGION NOT LIKE \'45%\' AND REGION NOT LIKE \'46%\' AND REGION NOT LIKE \'40%\'';
    }

    sql += 'GROUP BY REGION, NAPR';

    return this.query(sql, [year]).then(function(results) {
        return results.map(function(row) {
            return {
                region: row['REGION'],
                total: row['sum(STOIM)'],
                export: row['NAPR'] == 'ЭК'
            }
        });
    });
};

Data.prototype.getRegionalData = function(region) {
    var sql =
        "SELECT sum(STOIM), sum(KOL), max(EDIZM), NAPR, TNVED, PERIOD, max(SIMPLE_NAM), max(NAME) FROM TCBT " +
        "JOIN THBED ON TNVED = KOD JOIN CTPAHA ON CTPAHA.KOD = STRANA " +
        "WHERE REGION LIKE ? GROUP BY TNVED, NAPR, PERIOD, STRANA";

    return this.query(sql, [region + '%']).then(function(results) {
        return results.map(function(row) {
            return {
                total: row['sum(STOIM)'],
                tnved: row['TNVED'],
                name: capitalize(row['max(SIMPLE_NAM)'].toLowerCase()),
                year: row['PERIOD'],
                export: row['NAPR'] == 'ЭК',
                quantity: row['sum(KOL)'],
                unit: row['max(EDIZM)'],
                country: capitalize(row['max(NAME)'].toLowerCase())
            }
        });
    });
};

module.exports = Data;