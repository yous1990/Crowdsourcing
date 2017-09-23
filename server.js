var express = require('express');
var mongoose = require('mongoose');
var open = require("open");
var cityController = require('./controllers/city');

var incidentsRouter = require('./routes/incidents').router;
var citiesRouter = require('./routes/cities').router;
var localesRouter = require('./routes/locales').router;

var bodyParser = require('body-parser');

var app = require('express')();
var server = require('http').Server(app);

require('./routes/incidents').initSocket(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/incidents', incidentsRouter);
app.use('/cities', citiesRouter);
app.use('/locales', localesRouter);

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Successfully connected to database\n");
});

app.use('/', express.static(__dirname));
//app.use('/', express.static(__dirname + '/webapp'));
open("http://localhost:3000/webapp/#/");

server.listen(3000);