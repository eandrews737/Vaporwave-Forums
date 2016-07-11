var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'homestead',
  password : 'secret',
  database : 'test',
  port     : 33060
});

var renderMainPage = function(args) { 

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${args.title}</title>
  </head>
  <body>

    <h1>${args.title}</h1>
    <table>
      <tr><th>ID</th><th>Name</th><th>D.O.B.</th>
      ${args.people.join('')}
    </table>
    <form action="/home" method="post">
      <br/><input name="id" />
      <input name="name" />
      <input name="dob" />
      <input value="submit" type="submit" />
    </form>
  </body>
  </html>
  `;
};

// Reads in newly added people
app.post('/home', function (req, res) {
  console.log(req.body);

  // Captured Values
  var sentCrap = req.body;

  connection.query('INSERT INTO test2 SET ?', sentCrap,function(err, people, fields) {
  
    // I see
  });

  // Refreshed the page
  res.redirect(req.get('referer'));

});

app.get('/home', function (req, res) {
  var peopleList = [];

  connection.query('SELECT * from test2', function(err, people, fields) {
    people.map(function(person) {
      peopleList.push(`<tr><td>${person.id}</td><td>${person.name}</td><td>${person.dob}</td></tr>`);
    })

    res.send(renderMainPage({
      title: 'Persons of Extra-Interest',
      people: peopleList
    }));
  });
})



app.listen(8080);
