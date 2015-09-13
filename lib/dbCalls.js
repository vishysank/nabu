var pg = require('pg');
var Promise = require("bluebird");

module.exports = {
  dbConnection: function (connectionString) {
    return new Promise (function (resolve, reject){
      pg.connect(connectionString, function(err,client) {
        if (err) {
          reject(err);
        } else {
          resolve (client);
        }
      });
    });
  },

  selectQuery: function (pgQuery, connection) {
    return new Promise (function (resolve, reject) {
      var query = connection.query(pgQuery);
      query.on('row', function(row, result) {
        result.addRow(row);
      });
      query.on('end', function(result) {
        resolve (result.rows);
      });
      query.on('error', function (error){
        reject (error);
      });
      pg.end();
    });
  },

  dbConnectionEnd: function () {
    pg.end();
  },

  insertQuery: function (pgQuery, pgQueryValues, connection) {
    console.log(pgQueryValues);
    return new Promise (function (resolve, reject) {
      connection.query(pgQuery, pgQueryValues, function(err, result) {
        if (err) {
          reject(err);
        } else {
          //resolve(result.rows[0]);
          resolve(result.rows);
        }
      });
    pg.end();
    });
  }
};
