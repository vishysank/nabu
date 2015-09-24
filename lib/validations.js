var request = require('request')
var Promise = require('bluebird')

module.exports = {
  authValidation: function (credentials) {
    if (credentials.userName !== process.env.TEAM_USERNAME || credentials.password !== process.env.TEAM_PASSWORD) {
      return ('Incorrect authentication details !')
    } else {
      return ('')
    }
  },

  authCheck: function (req, res, next) {
    if (!req.session.userName) {
      res.redirect('/login')
    } else {
      next()
    }
  },

  apiCheck: function (apiDetails) {
    var options = {
      url: apiDetails.apiPath,
      headers: {
        'Authorization': apiDetails.apiToken
      }
    }

    return new Promise(function (resolve, reject) {
      /* The parameter wrongUserInput refers to if the request call returns an error because the incorrect url and headers were provided. This value is now resolved, so that it can be rendered on the input page so that the user knows that the wrong credentials were inputted */
      request(options, function (wrongUserInput, response, body) {
        if (wrongUserInput) {
          resolve(wrongUserInput)
        } else {
          resolve(response.statusCode)
        }
      })
    })
  }
}
