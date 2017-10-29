const Promise = require('bluebird');
const mysql = Promise.promisifyAll(require('mysql'));

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

Data.prototype.getYearlyData = function(year) {
    var sql = "SELECT REGION, sum(STOIM), NAPR FROM TCBT WHERE PERIOD = ? GROUP BY REGION, NAPR";

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

module.exports = Data;