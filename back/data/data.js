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

Data.prototype.getImport = function(year) {
    return this.getYearlyData(year, 'ИМ');
};

Data.prototype.getExport = function(year) {
    return this.getYearlyData(year, 'ЭК');
};

Data.prototype.getYearlyData = function(year, direction) {
    var sql = "SELECT REGION, sum(STOIM) FROM TCBT WHERE NAPR = ? AND PERIOD = ? GROUP BY region";

    return this.query(sql, [direction, year]).then(function(results) {
        return results.map(function(row) {
            return {
                region: row['REGION'],
                total: row['sum(STOIM)']
            }
        });
    });
};

module.exports = Data;