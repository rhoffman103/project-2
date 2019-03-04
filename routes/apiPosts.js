var db = require("../models");

module.exports = function(app) {

  // NEED TO GET POSTID FOR SUBMITTING TAGS 

  // POST route for saving a new post & tags
  app.post("/api/addpost", function(req, res) {
    const newPost = {
      Location: req.body.Location,
      Body: req.body.Body,
      Public: req.body.Public,
      AuthorID: req.body.AuthorID,
      UserName: req.body.UserName
    };

    // console.log("new post =======================")
    // console.log(newPost)
    
    db.Post.create(newPost).then(postInfo => {
      const tags = req.body.Tags.split(',');
      tags.forEach( (tag, i) => {
        db.Tag.create({
          AuthorID: postInfo.dataValues.AuthorID,
          PostID: postInfo.dataValues.ID,
          tag: tag
        })
      })
    });
  });

  // POST route for saving Tags that belong to a post
  app.post("/api/addtags", function(req, res) {
    db.Tag.create({tag: req.body.tag});
  });

  // Get Users Last Post
  app.get("/api/lastpost/:authorID", function(req, res) {
    var authorID = req.params.authorID
    db.Post.findAll({
      limit: 1,
      where: {
        AuthorID: authorID
      },
      order: [[ 'createdAt', 'DESC' ]]
    }).then(function(post){
      res.json(post)
    }); 
  })

  //Get Post by rating, descending
  app.get("/api/postbyrating", function(req, res) {
    console.log("Searching for posts by descending rating");
    db.Post.findAll({
      order: [["rating", "DESC"]]
    }).then(data => {
      res.send(data);
    });
  });
  
  // RENDER POSTS BY LOCATION
  app.get("/api/posts/:location", (req, res) => {
    db.Post.findAll({
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

};