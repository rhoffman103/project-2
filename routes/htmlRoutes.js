var db = require("../models");

module.exports = function(http) {
  // Load index page
  http.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  http.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

   // blueit home page
   http.get("/blueit", (req, res) => {
    // // Load blueit page
    db.Posts.findAll({
      include: [db.Authors],
      order: [['updatedAt', 'DESC']]
    }).then(function(dbPosts) {
      // console.log("POSTS \n" + JSON.stringify(dbPosts, null, 2))
      res.render("blueit", {
        posts: dbPosts
      });
    });
  });

  // Render 404 page for any unmatched routes
  http.get("*", function(req, res) {
    res.render("404");
  });
};
