var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function(app) {

  // USERNAME ROUTE. render posts by name
  app.get("/api/postsby/:name", function(req, res) {
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
        include: [db.Tag]
      }).then(function(dbPosts) {
        console.log("dbPosts ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(JSON.stringify(dbPosts, null, 2));
        res.json({
          posts: dbPosts,
          userName: req.params.name
        });
      });
    });
  });

  app.get("/api/getposts", function(req, res) {
    console.log("api/getposts\n====================================================");
    db.Post.findAll({
      where: {
        AuthorID: `"${dbAuthor.ID}"`
      },
      // include: [db.Tags]
    }).then(function(dbPosts) {
    console.log(JSON.stringify(dbPosts, null, 2));
    res.json(dbPosts);
    });
  })

  //Adds user
  app.post("/api/adduser", function(req, res) {
    db.Authors.create(req.body);
  });

  //Get All Users
  app.get("/api/users", function(req, res) {
    db.Authors.findAll({
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // Get who is currently logged in
  app.get("/api/user", (req, res) => {
    if (req.user) {
      res.json({
        username: req.user.UserName,
        id: req.user.ID
      });
    } else {
      res.json({});
    }
  });

  // USERNAME ROUTE. render posts by name
  app.get("/api/authors/:name", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    console.log("user name" + req.params.name);
    db.Authors.findOne({
      where: {
        UserName: req.params.name
      },
      include: [db.Post]
    }).then(function(dbPosts) {
      // res.json(dbPosts);
      console.log(dbPosts);
      res.render("posts", {
        posts: dbPosts,
        findUser: true,
        findPosts: false
      });
    });
  });

  // Search Users By Name Route
  app.get("/api/usersearch/:key", (req, res) => {
    // console.log(req);
    db.Authors.findAll({
      where: {
        UserName: {
          [Sequelize.Op.like]: req.params.key + "%"
        }
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

    // RENDER POSTS BY LOCATION
    app.get("/blueit/posts/:key", (req, res) => {
      db.Post.findAll({
        where: {
          Location: {
            [Sequelize.Op.like]: req.params.key + "%"
          }
        }
      }).then(function(zips) {
        res.json(zips);
      });
    });

    // RENDER POSTS BY TAGS
    app.get("/posts/:tag", (req, res) => {
      db.Post.findAll({
        where: {
          Tags: {
            [Sequelize.Op.like]: req.params.tag + "%"
          }
        }
      }).then(function(dbPosts) {
        res.json(dbPosts);
      });
    });

  // Delete a User by id
  app.delete("/api/deleteuser/:id", function(req, res) {
    db.Authors.destroy({ 
      where: { 
        id: req.params.id 
      } 
    }).then(function(deletedUser) {
      res.json(deletedUser);
    });
  });
};
