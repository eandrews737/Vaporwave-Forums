
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'homestead',
  password : 'secret',
  database : 'test',
  port     : 33060
});

connection.connect();

// connection.query('INSERT INTO table1 VALUES (1, `doggy dog world`)'){

//     if (!err)
//       console.log('added!');
//     else
//       console.log('');
// }

connection.query('SELECT * from test2', function(err, people, fields) {

    people.map(function(person) {
      console.log(person.name);
      console.log(person.dob);
    })
});

connection.end();
