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

app.get('/list',function (req, res){
    res.json(list.findAll());
});

app.get('/list/:id', function(req, res){
    var id = req.params.id;
    res.json(list.findById(id));
});

app.post('/newlist', function(req, res){
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


app.get('/index', function(req, res){
    res.send('<h1>This is index page</h1>');
});


