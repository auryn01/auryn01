var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors'); // You need this for creating 404 errors

// Import routes for index and users
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Set up view engine to use Handlebars
app.set('views', path.join(__dirname, 'views')); // Views directory
app.set('view engine', 'hbs'); // Use 'hbs' as view engine

// Middleware for logging, parsing JSON, cookies, etc.
app.use(logger('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL encoded requests
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Define routes for handling requests
app.use('/', indexRouter); // All requests to '/' will be handled by indexRouter
app.use('/users', usersRouter); // All requests to '/users' will be handled by usersRouter

// Catch 404 errors and forward them to the error handler
app.use(function(req, res, next) {
  next(createError(404)); // Generate a 404 error if no route is matched
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message; // Set the error message for display
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show full error details only in development
  res.status(err.status || 500); // Set the HTTP status code (500 if not specified)
  res.render('error'); // Render the error view
});

module.exports = app; // Export the app for use in the server (bin/www)
