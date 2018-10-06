var db = require("../models");

module.exports = function(app) {
   // blueit home page
  app.get("/", (req, res) => {
    db.Posts.findAll({
      include: [db.Authors]
    }).then(function(dbPosts) {
      console.log("POSTS \n" + JSON.stringify(dbPosts, null, 2))
      res.render("blueit", {
        posts: dbPosts
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
