var express = require('express')
var router = express.Router()
var validations = require('../lib/validations.js')

/* Login*/
router.get('/', function (req, res, next) {
  if (req.session.userName) {
    res.redirect('/')
  } else {
    res.render('login', {
      loginButtonFlag: 'off'
    })
  }
})

router.post('/', function (req, res, next) {
  var credentials = req.body
  var authError = validations.authValidation(credentials)

  if (authError === '') {
    req.session.userName = credentials.userName
    req.session.password = credentials.password
    res.redirect('/')
  } else {
    res.render('login', {
      authError: authError,
      loginButtonFlag: 'off'
    })
  }
})

module.exports = router
