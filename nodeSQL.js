
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : '127.0.0.1',
	port     : '33060',
	user     : 'homestead',
	password : 'secret',
	database : 'sitepoint'
});


connection.connect(function(err){

	if(err){
	  console.log('No connection');
	  return;
	  }

	console.log('Connected!');
});


var newPerson = { id: 4, name: 'Arnold', dob: '0422' };


connection.query('INSERT INTO test2 SET ?', newPerson, function(err,res){

	if(err) throw err;

	console.log('ID:', res.insertId);

	});

// Updates me in the database
connection.query(
	'UPDATE test2 SET name = ? Where ID = ?',
	["Not Eric", 1],
	function (err, result) {

		if (err) throw err;

	    console.log('Changed ' + result.changedRows + ' rows');
	}
);

var max = 12;

// Creates 5 people named arnold born on the same day
for (i = 7; i < max; i++){

	// Set up a new person for the database
	var newPerson = { id: i, name: 'Arnold', dob: '0422' };


	// This creates a new person to add
	connection.query('INSERT INTO test2 SET ?', newPerson, function(err,res){

		if(err) throw err;

		console.log('ID:', res.insertId);

		});

}


connection.end(function(err) {});