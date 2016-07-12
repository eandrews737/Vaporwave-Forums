var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
var mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'homestead',
  password : 'secret',
  database : 'test',
  port     : 33060
});

// Reads in newly added people
app.post('/person', function (req, res) {
  console.log(req.body);

  // Captured Values
  var sentCrap = [req.body.name, req.body.comment];

  connection.query('INSERT INTO `test2` (`name`, `comment`) VALUES (?, ?)', sentCrap, function(err, people, fields) {
    console.log(err);
    // show home page
    res.redirect('/');
  });
});

// Gets the information from the database
app.get('/', function (req, res) {
  var peopleList = [];

  connection.query('SELECT * from test2', function(err, people, fields) {

    res.render('index', {
      title: 'Macintoshplus',
      people: people,
      formatDate: function() {
        if (!this.date || this.date === '0000-00-00 00:00:00') {
          return 'N/A';
        }
        return date;
      },
      formatId: function() {
        // formats the Id count
        var prefix = "0000";
        return prefix.substring(0, prefix.length-String(this.id).length) + this.id;
      }
    });
  });
});


app.listen(8080);
