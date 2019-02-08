require("dotenv").config();
const express = require("express"),
  passport = require('passport'),
  session = require('express-session'),
  bodyParser = require("body-parser"),
  exphbs = require("express-handlebars"),
  env = require('dotenv').load(),
  db = require("./models"),
  app = express(),
  PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Global variables
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Routes
require('./routes/auth')(app, passport);
require('./config/passport/passport.js')(passport, db.Authors); //Load Passport Strategies
require("./routes/apiRoutes")(app);
require("./routes/apiPosts")(app);
require("./routes/AuthenticatedHtmlRoutes")(app);
require("./routes/htmlRoutes")(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}



// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
