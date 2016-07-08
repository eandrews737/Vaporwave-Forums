
var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'homestead',
  password : 'secret',
  database : 'test',
  port     : 33060
});

http.createServer(function (req, res) {

  res.writeHeader(200, {"Content-Type": "text/html"});  

  connection.query('SELECT * from test2', function(err, people, fields) {
      var i = 0;
      people.map(function(person) {
        res.write('<br/>' + person.name + ' ' + person.dob);

        if (++i === people.length) {
          res.end();
        }
      })
  });

}).listen(8080);
