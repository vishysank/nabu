var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DB_NAME;
var dbCalls = require('../lib/dbCalls');

/* GET home page. */
router.get('/', function(req, res, next) {
  var pgQuery = 'SELECT * from api_details';
  dbCalls.dbConnection(connectionString)
  .then(dbCalls.selectQuery.bind(null, pgQuery))
  .then(function (apiList) {
    res.render('index', {apiList: apiList});
  });
});

/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', {});
});

/* GET edit page for specific api*/
router.get('/edit/:id', function (req, res, next) {
  var apiID = req.params.id;
  //var pgQuery = 'SELECT * from api_details a, api_auth b WHERE a.id = b.id';
  var pgQuery = 'SELECT * from api_details a, api_auth b where a.id = b.id AND a.id = $1';
  dbCalls.dbConnection(connectionString)
  .then(dbCalls.insertQuery.bind(null, pgQuery, [apiID]))
  .then(function(results){
    console.log(results[0]);
    res.render('edit', {apiDetails: results[0]});
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
  .then(dbCalls.insertQuery.bind(null, pgQueryAPIDetailInsert, apiDetailInsertValues))
  .then(function(results){
    apiAuthInsertValues[0] = (results[0].id);
    return;
  })
  .then(dbCalls.dbConnection.bind(null, connectionString))
  .then(dbCalls.insertQuery.bind(null, pgQueryAPIAuthInsert, apiAuthInsertValues))
  .then(function () {
    res.redirect("/");
  });
});



module.exports = router;
