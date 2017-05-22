/*
* server.js
* =========================
* Import all of our dependencies
* Connect to our database
* Configure our application
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

/*
* API Routes
*/

/* Get all Todos */
app.get('api/todos', function (req, res) {

    // Use Mongoose Model to find the Todos
    Todo.find(function (err, todos) {

        // If there is an error send it, if not then send the data we get
        if (err) {
            res.send(err);
        }

        res.json(todos);

    });

});

/* Create a new Todo and send back all of the todos that we now have */
app.post('api/todos', function (req, res) {

    // Create a todo from the AJAX call from Angular
    Todo.create({

        text: req.body.text,
        done: false

    }, function (err, todo) {
        // If there is an error send it, if not then send the data we get
        if (err) {
            res.send(err);
        }

        // Get and return all of the todos after we create one
        Todo.find(function (err, todos) {

            // If there is an error send it, if not then send the data we get
            if (err) {
                res.send(err);
            }

            res.json(todos);

        });
    });

});

/* Delete a todo based on the id we get in the req params (url) then send back all of the todos left */
app.delete('api/todos/:todoId', function (req, res) {

    // Remove the Todo based on the req params :todoId we get in the url
    Todo.remove({
        _id: req.params.todoId
    }, function (err, todo) {

        // If there is an error send it, if not then get all the todos left
        if (err) {
            res.send(err);
        }

        Todo.find(function (err, todos) {

            // If there is an error send it, if not then send the data we get
            if (err) {
                res.send(err);
            }

            res.json(todos);

        });

    });

});

// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");
