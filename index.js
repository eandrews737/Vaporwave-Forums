var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

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
    <!-- Mobile Specific Metas
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- FONT
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">

    <!-- CSS
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/skeleton.css">

    <!-- Favicon
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link rel="icon" type="image/png" href="images/favicon.png">

    <title>${args.title}</title>
    <style>

      /* custom styles here */
      body{
        margin-top: 2em;
        background-color: #F5A9BC;
      }

      body, h1, h2 { text-align: center }

      input, textarea { text-align: left; resize: none;}

      img {
        width: 100%;
      }

      .following {
        text-transform: uppercase;
        position: fixed;
        top: 0;
        color: #A9F5A9;
        letter-spacing: .4em;
        font-size: 1em;
        background-color: #f5a9bc;
      }

      .headings {
        border-top: 2px solid #A9F5A9; 
        font-size: 2em; 
        border-bottom: 2px solid #A9F5A9; 
      }

      .headings, .row .twelve {
        border-bottom: 3px solid #A9F5A9;
        padding-bottom: 1em;
      }

    </style>
  </head>
  <body>
    <audio id="vaporwavemusic" controls autoplay>
      <source src="music/macintoshplus.mp3" type="audio/mpeg"/>
    </audio>

    <div class="container">

      <p class="following">
        AESTHETICS
      </p>

      <h1>
      95 Windows
      </h1>

      <div class="row">
        <div class="eight columns offset-by-two">
          <img src="images/vaporhorde.gif" alt="1991" align="center" />
        </div>
      </div>

      <div class="row headings">
        <div class="three columns"><strong>ID</strong></div>
        <div class="three columns"><strong>Name</strong></div>
        <div class="six columns"><strong>Time</strong></div>
      </div>

      ${args.people.join('')}

      <form action="/home" method="post">

        <h2>Add New Person</h2>
        <div class="row">
          <div class="seven columns">
            <label for="name">Your Name</label>
            <input class="u-full-width" align="center" type="text" placeholder="name" name="name">
            <label for="comment">Comment</label>
            <textarea class="u-full-width" align="center" type="text" placeholder="post here" name="comment"></textarea>
            <input class="button-primary u-pull-center" type="submit" value="Submit">
          </div>
          <div class="five columns">
            <img class="shitty-windows-gif" src="images/windowswindows95.gif" alt="helpme" />
          </div>
        </div>
      </form>

    </div>
  </body>
  </html>
  `;
};

// Reads in newly added people
app.post('/home', function (req, res) {
  console.log(req.body);

  // Captured Values
  var sentCrap = [req.body.name, req.body.comment];

  connection.query('INSERT INTO `test2` (`name`, `comment`) VALUES (?, ?)', sentCrap, function(err, people, fields) {
    console.log(err);
    // Refreshed the page
    res.redirect(req.get('referer'));
    // I see
  });

});

// formats the Id count
function formatId(id){

  var prefix = "0000";
  return prefix.substring(0, prefix.length-String(id).length) + id;
}

// Sets any blank dates to N/A
function formatDate(date){

  if (!date || date === '0000-00-00 00:00:00') {
    return 'N/A';
  }

  return date;
}

  // Sets any name thats blank to anonymous
function anonymous(name){

  if(!name){
    return "anonymous";
  }

  return name;
}

// Gets the information from the database
app.get('/home', function (req, res) {
  var peopleList = [];

  connection.query('SELECT * from test2', function(err, people, fields) {
    people.map(function(person) {
      peopleList.push(`
        <div class="row">
          <div class="three columns">${formatId(person.id)}</div>
          <div class="three columns">${anonymous(person.name)}</div>
          <div class="six columns">${formatDate(person.time)}</div>
        </div>
        <div class="row">
          <div class="twelve columns">${person.comment}</div>
        </div>
      `);
    })

    res.send(renderMainPage({
      title: 'Macintoshplus',
      people: peopleList
    }));
  });
})



app.listen(8080);
