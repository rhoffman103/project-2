var db = require("../models");

module.exports = function(app) {
  // blueit home page (logged out)
  // app.get("/", (req, res) => {
  //   db.Posts.findAll({
  //     include: [db.Authors]
  //   }).then(function(dbPosts) {
  //     // console.log("POSTS \n" + JSON.stringify(dbPosts, null, 2))
  //     res.render("blueit", {
  //       posts: dbPosts,
  //       findPosts: true
  //     });
  //   });
  // });

  // blueit home page (logged in)
  app.get("/blueit", (req, res) => {
    db.Posts.findAll({
      include: [db.Authors]
    }).then(function(dbPosts) {
      // console.log("POSTS \n" + JSON.stringify(dbPosts, null, 2))
      res.render("blueit", {
        posts: dbPosts,
        findPosts: true,
        loggedIn: true
      });
    });
  });

  // USERNAME ROUTE. render posts by name
  app.get("/blueit/:name", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Authors.findOne({
      where: {
        UserName: req.params.name
      },
      include: [db.Posts]
    }).then(function(dbPosts) {
      // res.json(dbPosts);
      console.log("logging from htmlRoutes.js");
      console.log("user name " + req.params.name);
      // console.log("POSTS ==============================\n" + JSON.stringify(dbPosts.Posts, null, 2));
      res.render("blueit", {
        posts: dbPosts,
        user: req.params.name,
        findUser: true
      });
    });
  });

  // RENDER POSTS BY LOCATION
  app.get("/blueit/posts/:location", (req, res) => {
    db.Posts.findAll({
      where: {
        Location: req.params.location
      },
      include: [db.Authors]
    }).then(dbPosts => {
      // res.json(dbPosts);
      res.render("blueit", {
        posts: dbPosts,
        postal: true
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
