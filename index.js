var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'homestead',
  password : 'secret',
  database : 'test',
  port     : 33060
});


function renderHtml(args) {
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
  </body>
  </html>`;
}


http.createServer(function (req, res) {

  res.writeHeader(200, {"Content-Type": "text/html"});  
  var peopleList = [];

  connection.query('SELECT * from test2', function(err, people, fields) {
    people.map(function(person) {
      peopleList.push(`<tr><td>${person.name}</td><td>${person.dob}</td></tr>`);
    })

    res.write(renderHtml({
      title: 'Persons of Extra-Interest',
      people: peopleList
    }));
    res.end();
  });

}).listen(8080);
