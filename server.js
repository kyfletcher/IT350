'use strict';
var express = require('express');
var db= require('./db');

var engine = require('ejs-locals');
var server = express();
// set the default type for views so we dont have to worry about that
server.engine('ejs',engine);
	server.set('views', __dirname + '/views'); //Location of the views
  	server.set('view engine', 'ejs');
//setup the controller for the backend
var controller = require('./controllers/mongo');
  //start the controller
controller.setup(server);
 	


server.listen(9001, function(){
	console.log('Server listening on port 9001');
});