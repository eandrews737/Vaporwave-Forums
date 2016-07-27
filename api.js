var mysql = require('mysql');
var express = require('express');
var api = express();
var bodyParser = require('body-parser');
var cors = require('express-cors');

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }));

api.set('json spaces', 2);
 
api.use(cors({
    allowedOrigins: [
        'localhost:5432'
    ]
}))

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'homestead',
  password : 'secret',
  database : 'test',
  port     : 33060
});

// Reads in newly added comments
api.post('/comment', function (req, res) {
  console.log(req.body);

  // Captured Values
  var sentCrap = [req.body.name, req.body.comment, req.body.media];

  connection.query('INSERT INTO `test2` (`name`, `comment`, `media`) VALUES (?, ?, ?)', sentCrap, function(err, comments, fields) {
    console.log(err);
    // show home page
    res.redirect('/comments');
  });
});

// Gets the information from the database
api.get('/comments', function (req, res) {

  var page = Number(req.query.page || 1);
  console.log(req.query);

  connection.query('SELECT * FROM test2 LIMIT 5 OFFSET ' + ((page-1) * 5), function(err, comments, fields) {

    res.json({
      page: page,
      nextPage: page+1,
      comments: comments
    });
  });
});

api.listen(8080);
