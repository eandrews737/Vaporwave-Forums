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
      <tr><th>Name</th><th>D.O.B.</th>
      ${args.people.join('')}
    </table>
    <form action="/person" method="post">
      <input name="name" /><br/>
      <input name="dob" /><br/>
      <input value="submit" type="submit" />
    </form>
  </body>
  </html>
  `;
};

app.post('/person', function (req, res) {
  console.log(req.body);
  // here intercept the post
  // req.body.name
  // req.body.dob
  // here insert into the people database
  // and refresh the listing
});

app.get('/people', function (req, res) {
  var peopleList = [];

  connection.query('SELECT * from test2', function(err, people, fields) {
    people.map(function(person) {
      peopleList.push(`<tr><td>${person.name}</td><td>${person.dob}</td></tr>`);
    })

    res.send(renderMainPage({
      title: 'Persons of Extra-Interest',
      people: peopleList
    }));
  });
})

app.listen(8080);
