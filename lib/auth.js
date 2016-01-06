var request = require('request')

// Simple route middleware for passport-js github to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.session.githubOrgPermissionsStatus == 204) { return next() }
  if (req.session.userName) { return next() }
  res.redirect('/login')
}

function orgCheck (req, res, next) {
  const userProfile = req._passport.session.user

  if (userProfile && userProfile.username) {
    request.get({
      url: 'https://api.github.com/orgs/'+ process.env.GITHUB_ORG + '/members/'+ userProfile.username,
      qs: {
        access_token: process.env.GITHUB_API_ACCESS_TOKEN
      },
      headers: {'user-agent': 'node.js'}
    }, function (err, response, body) {
      req.session.githubOrgPermissionsStatus = response.statusCode
      return (next())
    })
  }
}

module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  orgCheck: orgCheck
}
