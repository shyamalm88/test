var express = require("express"),
    bodyParser = require("body-parser"),
    route = require('./routes/route');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json')
    next();
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies; 
app.use('/webService', route);

<<<<<<< HEAD
app.listen(8081, function(){
	console.log('server is ready')
=======
app.listen(3333, function() {
    console.log('server is ready')
>>>>>>> d3e870174df2bb916185a48585e9dc91ebfe5361
});
