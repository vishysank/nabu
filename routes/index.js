var express = require('express');
var pg = require('pg');
var router = express.Router();
var dbCalls = require('../lib/dbCalls');
var validations = require('../lib/validations.js');
var sql = require('../lib/pgQuery.js');
var connectionString = process.env.DB_NAME;

router.use(validations.authCheck);

/* GET home page. */
router.get('/', function(req, res, next) {

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, sql.select.apiList, ""))
  .then(function (apiList) {
    res.render('index', {
      apiList: apiList
    });
  })
  .catch(function(e){
    console.log(e);
  });

});

/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', {});
});

/*GET api documentation page. */
router.get('/view/:id', function (req, res, next) {
  var id = req.params.id;

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, sql.select.apiAuth, [id]))
  .then(function(results){
    res.render('view', {
      apiDetails: results[0]
    });
  })
  .catch(function(e){
    console.log(e);
  });

});

/* GET edit page for specific api*/
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, sql.select.apiDetailsAndAuth, [id]))
  .then(function(results){
    res.render('edit', {apiDetails: results[0]});
  })
  .catch(function(e){
    console.log(e);
  });

});

/*POST to update API details*/
router.post('/edit/:id', function(req, res, next){
  var editAPIDetails = req.body;
  var id = req.params.id;
  var apiDetailUpdateValues = [id, editAPIDetails.apiName, editAPIDetails.apiDesc, editAPIDetails.apiOwner];
  var apiAuthUpdateValues = [id, editAPIDetails.apiPath, editAPIDetails.apiToken];

  validations.apiCheck(editAPIDetails)
  .then(function (apiCheck) {
    if (apiCheck === 200) {
      dbCalls.dbConnection(connectionString)
      .then(dbCalls.dbQuery.bind(null, sql.update.apiDetails, apiDetailUpdateValues))
      .then(dbCalls.dbConnection.bind(null, connectionString))
      .then(dbCalls.dbQuery.bind(null, sql.update.apiAuth, apiAuthUpdateValues))
      .then(function () {
        res.redirect("/");
      })
      .catch(function(e){
        console.log(e);
      });
    } else {
      dbCalls.dbConnection(connectionString)
      .then(dbCalls.dbQuery.bind(null, sql.select.apiDetailsAndAuth, [id]))
      .then(function(results){
        res.render('edit', {
          apiDetails: results[0],
          apiError: "uhhhhh...something's wrong : "+apiCheck
        });
      })
      .catch(function(e){
        console.log(e);
      });
    }
  });

});

/*Post for adding a new API page*/
router.post('/', function(req, res, next){
  var newAPIDetails = req.body;
  var apiDetailInsertValues = [newAPIDetails.apiName,newAPIDetails.apiDesc, newAPIDetails.apiOwner,new Date()];
  var apiAuthInsertValues = ["",newAPIDetails.apiPath, newAPIDetails.apiToken];

  validations.apiCheck(newAPIDetails)
  .then(function (apiCheck) {
    if (apiCheck === 200) {
      dbCalls.dbConnection(connectionString)
      .then(dbCalls.dbQuery.bind(null, sql.insert.apiDetails, apiDetailInsertValues))
      .then(function(results){
        apiAuthInsertValues[0] = (results[0].id);
        return;
      })
      .then(dbCalls.dbConnection.bind(null, connectionString))
      .then(dbCalls.dbQuery.bind(null, sql.insert.apiAuth, apiAuthInsertValues))
      .then(function () {
        res.redirect("/");
      })
      .catch(function(e){
        console.log(e);
      });
    } else {
      res.render('new', {
        apiError: "uhhhhh...something's wrong : "+apiCheck,
        apiDetails: newAPIDetails
      });
    }
  })
  .catch(function(e){
    console.log(e);
  });
});

router.get('/logout', function(req, res, next) {
  req.session.userName = null;
  req.session.password = null;

  res.redirect('/login');
});

module.exports = router;
