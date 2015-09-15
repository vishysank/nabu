var express = require('express');
var pg = require('pg');
var router = express.Router();

var connectionString = process.env.DB_NAME;

var dbCalls = require('../lib/dbCalls');

/* GET home page. */
router.get('/', function(req, res, next) {
  var pgQuery = 'SELECT * from api_details';

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, pgQuery, ""))
  .then(function (apiList) {
    res.render('index', {
      apiList: apiList
    });
  })
  .catch(function(err) {
    console.log('error', err);
  });
});

/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', {});
});

/*GET api documentation page. */
router.get('/view/:id', function (req, res, next) {
  var id = req.params.id;
  var pgQuery = 'SELECT * from api_auth WHERE id = $1';

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, pgQuery, [id]))
  .then(function(results){
    res.render('view', {
      apiDetails: results[0]
    });
  })
  .catch(function(err) {
    console.log('error', err);
  });

});

/* GET edit page for specific api*/
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var pgQuery = 'SELECT * from api_details a, api_auth b where a.id = b.id AND a.id = $1';

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, pgQuery, [id]))
  .then(function(results){
    res.render('edit', {apiDetails: results[0]});
  })
  .catch(function(err) {
    console.log('error', err);
  });
});

/*POST to update API details*/
router.post('/edit/:id', function(req, res, next){
  var editAPIDetails = req.body;
  var id = req.params.id;
  var pgQueryAPIDetailUpdate = 'UPDATE api_details SET api_name = $2, api_desc = $3, api_owner = $4 WHERE id = $1';
  var pgQueryAPIAuthUpdate = 'UPDATE api_auth SET api_path = $2, api_token = $3 WHERE id = $1';
  var apiDetailUpdateValues = [id, editAPIDetails.apiName, editAPIDetails.apiDesc, editAPIDetails.apiOwner];
  var apiAuthUpdateValues = [id, editAPIDetails.apiPath, editAPIDetails.apiToken];

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, pgQueryAPIDetailUpdate, apiDetailUpdateValues))
  .then(dbCalls.dbConnection.bind(null, connectionString))
  .then(dbCalls.dbQuery.bind(null, pgQueryAPIAuthUpdate, apiAuthUpdateValues))
  .then(function () {
    res.redirect("/");
  })
  .catch(function(err) {
    console.log('error', err);
  });
});

/*Post form from new page*/
router.post('/', function(req, res, next){
  var newAPIDetails = req.body;
  var pgQueryAPIDetailInsert = 'INSERT into api_details (api_name, api_desc, api_owner, insert_datetime) values ($1, $2, $3, $4) RETURNING id';
  var pgQueryAPIAuthInsert = 'INSERT into api_auth (id, api_path, api_token) values ($1, $2, $3)';
  var apiDetailInsertValues = [newAPIDetails.apiName,newAPIDetails.apiDesc, newAPIDetails.apiOwner,new Date()];
  var apiAuthInsertValues = ["",newAPIDetails.apiPath, newAPIDetails.apiToken];

  dbCalls.dbConnection(connectionString)
  .then(dbCalls.dbQuery.bind(null, pgQueryAPIDetailInsert, apiDetailInsertValues))
  .then(function(results){
    apiAuthInsertValues[0] = (results[0].id);
    return;
  })
  .then(dbCalls.dbConnection.bind(null, connectionString))
  .then(dbCalls.dbQuery.bind(null, pgQueryAPIAuthInsert, apiAuthInsertValues))
  .then(function () {
    res.redirect("/");
  })
  .catch(function(err) {
    console.log('error', err);
  });
});



module.exports = router;
