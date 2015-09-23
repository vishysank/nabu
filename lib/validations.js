var request = require('request');
var Promise = require("bluebird");

module.exports = {
  authValidation: function(credentials) {
    if (credentials.userName !== process.env.TEAM_USERNAME || credentials.password !== process.env.TEAM_PASSWORD) {
      return('Incorrect authentication details !');
    } else {
      return('');
    }
  },
  authCheck: function (req, res, next) {
    if (!req.session.userName) {
      res.redirect('/login');
      } else {
      next();
    }
  },
  apiCheck: function (apiDetails) {
    var options = {
      url: apiDetails.apiPath,
      headers: {
        'Authorization': apiDetails.apiToken
      }
    };

    return new Promise(function(resolve,reject){
      request(options, function (err, response, body) {
        if (err) {
          console.log(err);
          resolve (err);
        } else {
          console.log(response.statusCode);
          resolve (response.statusCode);
        }
      });
    });
  }
};
