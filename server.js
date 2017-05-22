/*
* server.js
* =========================
* Configure our application
* Connect to our database
* Create our Mongoose models
* Define routes for our RESTful API
* Define routes for our frontend Angular application
* Set the app to listen on a port so we can view it in our browser
*/

/* Setup our Dependencies */

// Express
var express = require('express');

// Create our Express App
var app = express();

// Mongoose to work with MongoDB
var mongoose = require('mongoose');

// Morgan log requests to the console (express4)
var morgan = require('morgan');

// Body Parser pull information from HTML POST (express4)
var bodyParser = require('body-parser');

// Method Override simulate DELETE and PUT (express4)
var methodOverride = require('method-override');

/* Configuration of App */

// Connect to MongoDB in the DB of TodoApp and if success then log it to the console
mongoose.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (!err) {
        console.log('Connected to MongoDB!');
    }
});

// set the static files location to go straight into the public folder
app.use(express.static(__dirname + '/public'));

// Log every request to the console
app.use(morgan('dev'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));

// Parse application/json
app.use(bodyParser.json());

// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(methodOverride());

/*
* ToDo Model
*/
var Todo = mongoose.model('Todo', {
    text: String
});

// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");
