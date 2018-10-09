var db = require("../models");

module.exports = function(app) {

    // POST route for saving a new post
    app.post("/api/addpost", function(req, res) {
        db.Posts.create(req.body);
    });

};