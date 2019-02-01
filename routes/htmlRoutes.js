var db = require("../models");

const isAuthenticated = require("../config/passport/isAuthenticated.js");

module.exports = function(app) {

  // blueit home page (logged in)
  app.get("/blueit", isAuthenticated, (req, res) => {
    db.Post.findAll({
      include: [db.Tag, db.Authors]
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
    app.get("/user/:name", /*isAuthenticated,*/ function(req, res) {
      console.log("api/name route\n==========================================");
      db.Authors.findOne({
        where: {
          UserName: req.params.name
        },
      }).then(function(dbAuthor) {
        db.Post.findAll({
          where: {
            AuthorID: dbAuthor.ID
          },
          include: [db.Tag, db.Authors]
        }).then(function(dbPosts) {
          // console.log("dbPosts ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          // console.log(JSON.stringify(dbPosts, null, 2));
          res.render("blueit", {
            posts: dbPosts,
            user: req.params.name,
            findUser: true
          });
        });
      });
    });

  // RENDER POSTS BY LOCATION
  app.get("/posts/location/:location", (req, res) => {
    db.Post.findAll({
      where: {
        Location: req.params.location
      },
      include: [db.Tag, db.Authors]
    }).then(dbPosts => {
      // res.json(dbPosts);
      res.render("blueit", {
        zip: req.params.location,
        posts: dbPosts,
        postal: true
      });
    });
  });

  // RENDER POSTS BY TAG Logged Out
  app.get("/posts/tag/:tag", (req, res) => {
    db.Tag.findAll({
      where: {
        tag: req.params.tag
      },
      include: [db.Authors]
    }).then(dbPosts => {
      // res.json(dbPosts);
      res.render("blueit", {
        posts: dbPosts,
        postsByTag: true,
        tag: req.params.tag
      });
    });
  });

    // RENDER POSTS BY TAG Logged In
    app.get("/posts/tag/:tag", isAuthenticated, (req, res) => {
      db.Tag.findAll({
        where: {
          tag: req.params.tag
        },
        include: [db.Authors]
      }).then(dbPosts => {
        res.render("blueit", {
          posts: dbPosts,
          loggedIn: true
        })
      });
    });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
