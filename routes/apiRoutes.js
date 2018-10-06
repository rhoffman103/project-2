var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function(app) {
   // blueit home page
  app.get("/", (req, res) => {
    // Load blueit page
    res.render("blueit");
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  // Initial get
  app.post("/", function(req, res) {
    res.json(
      {config:
        {
          language: "en",
            google: {
              version: "3",
              key: "AIzaSyD5oLXzPS0A9N-z3VYZc0rnGu5yVuyK9Xg"
          }
        },
        options: {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumWait: 10000,     // max wait time for desired accuracy
          maximumAge: 0,          // disable cache
          desiredAccuracy: 30,    // meters
          fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
          addressLookup: true,   // requires Google API key if true
          timezone: false,        // requires Google API key if true
        }
      }
    );
  });

  app.post("/api/post/get", function(req, res) {
    db.Posts.findAll({
      where: {
        // Location: zipCode,
        // tags: {[Sequelize.Op.regexp]: '(tags)'}
      },
      include: [db.Authors],
      order: [['updatedAt', 'DESC']]
    }).then(function(dbPosts) {
      console.log("POSTS \n" + JSON.stringify(dbPosts, null, 2))
      res.render("blueit", {
        posts: dbPosts
      });
    });
  });

  // Add new post
  app.post("/api/post/add", function(req, res) {
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
  app.post("/api/user/add", function(req, res) {
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
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
      console.log(dbAuthor);
      // res.render("index", {
      //   user: dbAuthor
      // })
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
