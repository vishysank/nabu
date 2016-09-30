var express = require('express')
var router = express.Router()
var validations = require('../lib/validations.js')

/* Login*/
router.get('/', function (req, res, next) {
    var authError

    if (req.session.githubOrgPermissionsStatus && req.session.githubOrgPermissionsStatus !== 204) {
      authError = "Your Github Account does not belong to the Organization - " + process.env.GITHUB_ORG + ". Access is restricted to members of this organization"
    }

    res.render('login', {
      authError: authError,
      loginButtonFlag: 'off',
      basicAuth: process.env.BASIC_AUTH,
      githubAuth: process.env.GITHUB_AUTH
    })
  // }
})

router.post('/', function (req, res, next) {
  var credentials = req.body
  var authError = validations.authValidation(credentials)

  if (authError === '') {
    req.session.userName = credentials.userName
    req.session.password = credentials.password
    var path = '/' + credentials.userName
    res.redirect(path)
  } else {
    res.render('login', {
      authError: authError,
      loginButtonFlag: 'off',
      basicAuth: process.env.BASIC_AUTH,
      githubAuth: process.env.GITHUB_AUTH
    })
  }
})

module.exports = router
