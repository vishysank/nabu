var pg = require('pg')
var Promise = require('bluebird')

module.exports = {
  dbConnection: function (connectionString) {
    return new Promise(function (resolve, reject) {
      pg.connect(connectionString, function (err, client) {
        if (err) {
          reject(err)
        } else {
          resolve(client)
        }
      })
    })
  },

  dbQuery: function (pgQuery, pgQueryValues, connection) {
    return new Promise(function (resolve, reject) {
      connection.query(pgQuery, pgQueryValues, function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result.rows)
        }
      })
      pg.end()
    })
  }
}
