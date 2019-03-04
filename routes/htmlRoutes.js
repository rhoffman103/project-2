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
          order: [
            ['createdAt', 'DESC'],
          ],
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
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [db.Tag, db.Authors]
    }).then(dbPosts => {
      if (req.user) {
        res.render("blueit", {
          zip: req.params.location,
          posts: dbPosts,
          postsByZip: true,
          loggedIn: true,
          userName: req.user.UserName
        });
      } else {
        res.render("blueit", {
          zip: req.params.location,
          posts: dbPosts,
          postsByZip: true
        });
      }
    });
  });

  // RENDER POSTS BY TAG
  app.get("/posts/tag/:tag", (req, res) => {
    let filteredPosts = [];
    db.Tag.findAll({
      where: {
        tag: req.params.tag
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [db.Post]
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
      // Works locally, but not deployed
      // loop posts with 1 attached tag, search by postId and push post to all posts with all included tags
      /*
      dbPosts.forEach(post => {
        db.Post.findOne({
          where: {
            ID: post.PostID
          },
          include: [db.Tag, db.Authors]
        }).then( dbPost => {
          filteredPosts.push(dbPost);
        });
      });
      */
    });
    /* .then(() => {
       if (req.user) {
        res.render("blueit", {
          posts: filteredPosts,
          postsByTag: true,
          tag: req.params.tag,
          loggedIn: true,
          userName: req.user.UserName
        });
      } else {
        res.render("blueit", {
          posts: filteredPosts,
          postsByTag: true,
          tag: req.params.tag
        });
      } 
    })
    */
  });

  // RENDER POSTS BY LOCATION & TAG
  app.get("/posts/location/:location/tag/:tag", (req, res) => {
    const filteredPosts = [];
    db.Post.findAll({
      where: {
        location: req.params.location
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [db.Tag, db.Authors]
    }).then(dbPosts => {
      dbPosts.forEach(post => {
        post.Tags.forEach(Tag => {
          if (Tag.tag.toLowerCase() === req.params.tag.toLowerCase()) {
            filteredPosts.push(post);
          }
        });
      });
      if (req.user) {
        res.render("blueit", {
          posts: filteredPosts,
          tagAndZip: true,
          tag: req.params.tag,
          zip: req.params.location,
          loggedIn: true,
          userName: req.user.UserName
        });
      } else {
        res.render("blueit", {
          posts: filteredPosts,
          tagAndZip: true,
          tag: req.params.tag,
          zip: req.params.location,
          tag: req.params.tag
        })
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
