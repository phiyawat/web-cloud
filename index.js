var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var list = require('./list');

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

app.get('/index', function(req, res){
    res.send('<h1>This is index page</h1>');
});



