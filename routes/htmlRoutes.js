var db = require("../models");

const isAuthenticated = require("../config/passport/isAuthenticated.js");

module.exports = function(app) {

    // USERNAME ROUTE. render posts by name
    app.get("/user/:name", function(req, res) {
      console.log("api/name route\n==========================================");
      db.Authors.findOne({
        where: {
          UserName: req.params.name
        }
      }).then(function(dbAuthor) {
        db.Post.findAll({
          where: {
            AuthorID: dbAuthor.ID
          },
          include: [db.Tag, db.Authors]
        }).then(function(dbPosts) {
          if (req.user) {
            res.render("blueit", {
              posts: dbPosts,
              user: dbPosts[0].Author.UserName,
              findUser: true,
              loggedIn: true,
              userName: req.user.UserName
            });
          } else {
            res.render("blueit", {
              posts: dbPosts,
              user: dbPosts[0].Author.UserName,
              findUser: true
            });
          }
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
      if (req.user) {
        res.render("blueit", {
          zip: req.params.location,
          posts: dbPosts,
          postal: true,
          loggedIn: true,
          userName: req.user.UserName
        });
      } else {
        res.render("blueit", {
          zip: req.params.location,
          posts: dbPosts,
          postal: true
        });
      }
    });
  });

  // RENDER POSTS BY TAG
  app.get("/posts/tag/:tag", (req, res) => {
    db.Tag.findAll({
      where: {
        tag: req.params.tag
      },
      include: [db.Authors]
    }).then(dbPosts => {
      if (req.user) {
      res.render("blueit", {
        posts: dbPosts,
        postsByTag: true,
        tag: req.params.tag,
        loggedIn: true,
        userName: req.user.UserName
      });
    } else {
      res.render("blueit", {
        posts: dbPosts,
        postsByTag: true,
        tag: req.params.tag
      });
    }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
