var express = require('express');
var app = express();
var list = require('./list');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res){
    res.send('<h1>Hello Node.js</h1>');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


