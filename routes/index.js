var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DB_NAME;

/* GET home page. */
router.get('/', function(req, res, next) {
  var apiList;
  pg.connect(connectionString, function(err,client, done){
    if (err) {
      console.log(err);
      //res.render('index', {});
    } else {
      var query = client.query('SELECT * from api_details');
      query.on('row', function(result) {
        apiList = result;
        console.log(apiList);
      });
    }
  done();
  });
  pg.end();

  res.render('index', {apiList: apiList});
});

/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', {});
});

/*Post form from new page*/
router.post('/', function(req, res, next){
  var newAPIDetails = req.body;
  pg.connect(connectionString, function(err,client, done){
    if (err) {
      console.log(err);
    } else {
      var text = 'INSERT into api_details (api_name, api_desc, api_owner, insert_datetime) values ($1, $2, $3, $4)';
      client.query(text, [newAPIDetails.apiName, newAPIDetails.apiDesc, newAPIDetails.apiOwner, new Date()], function(err) {
        if (err) {
          console.log(err);
          //res.redirect('/');
        } else {
          res.redirect('/');
        }
      });
    }
  done();
  });
});

module.exports = router;
