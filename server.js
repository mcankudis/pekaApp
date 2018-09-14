"use strict";
const request = require('request');
const express = require('express');
var exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Load enviroment variables
// require('dotenv').config();

// Security headers
app.use(helmet());

// Body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Set static folder
app.use(express.static(__dirname + '/client'));

// Set the view engine
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout:'index'}));
app.set('view engine', 'handlebars');

// These are the routes
const index = require('./routes/index');
app.use('/', index);

const port = 3007;
app.listen(port, function() {
  console.log('['+new Date+'] Hi, listening on port ' + port);
})
