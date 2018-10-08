var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function(app) {

  // Add new post
  app.post("/api/testadd", function(req, res) {
    console.log(req.body);
    db.Posts.create(req.body);
  });

  //Get All Users
  app.get("/api/users", function(req, res) {
    db.Authors.findAll({
      include: [db.Posts]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  })

  //Get Posts by Author
  app.get("/api/testget/author/:authorID", function(req, res) {
    const authorID = req.params.authorID;
      console.log(`Searching for posts where AuthorID = ${authorID}`);
        db.Posts.findAll({where: {
          AuthorID: authorID
        }}).then(data => {
          res.send(data);
        });
  });
  
  //Get Post by rating, descending
  app.get("/api/testget/rating", function(req, res) {
    console.log("Searching for posts by descending rating");
    db.Posts.findAll({
      order: [['rating', 'DESC']]
    }).then(data => {
      res.send(data);
    });
  });
  
  //Get Post by location
  app.get("/api/testget/location/:location", function(req, res) {
    const location = req.params.location;
    console.log("Searching for posts by location");
    db.Posts.findAll({where: {
      Location: location
    }}).then(data => {
      res.send(data);
    });
  })

  //Adds user
  app.post("/api/testuser", function(req, res) {
    db.Authors.create(req.body);
  });

  //  Search Engine Route
  app.get("/api/usersearch/:key", (req, res) => {
    console.log(req);
    db.Authors.findAll({
      where: {
        UserName: {
          [Sequelize.Op.like]: req.params.key  + "%"
        }
      },
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
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
      include: [db.Posts]
    }).then(function(dbPosts) {
      // res.json(dbPosts);
      console.log(dbPosts);
      res.render("posts", {
        posts: dbPosts,
        findUser: true,
        findPosts: false
      })
    });
  });

  // RENDER POSTS BY LOCATION
  app.get("/api/posts/:location", (req, res) => {
    db.Posts.findAll({
      where: {
        Location: req.params.location
      },
      include: [db.Authors]
    }).then(dbPosts => {
      res.json(dbPosts);
      // res.render("posts", {
      //   posts: dbPosts
      // });
    });
  });


  app.delete("/api/authors/:id", function(req, res) {
    db.Authors.destroy({
      where: {
        ID: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
