"use strict";
const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Load enviroment variables
require('dotenv').config();

// Security headers
app.use(helmet());

// Body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static folder
app.use(express.static(__dirname + '/client'));

// Set the view engine
app.set('views', __dirname + '/client');
app.set('view engine', 'handlebars');
app.engine('html', require('ejs').renderFile);

// These are the routes
const index = require('./routes/index');
app.use('/', index);

const port = 3007;
app.listen(port, function() {
  console.log('['+new Date+'] Hi, listening on port ' + port);
})
