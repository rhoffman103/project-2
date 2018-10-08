var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function(app) {

    // POST route for saving a new post
    app.post("/api/posts", function(req, res) {
        db.Posts.create(req.body);
    });

};