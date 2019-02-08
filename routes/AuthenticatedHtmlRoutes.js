const isAuthenticated = require("../config/passport/isAuthenticated.js");
const htmlQueries = require("../controllers/htmlController");
const db = require("../models");

module.exports = function(app) {

    // blueit home page (logged in)
    app.get("/blueit", isAuthenticated, (req, res) => {
        htmlQueries.findAllPosts()
        .then(function(dbPosts) {
            res.render("blueit", {
                posts: dbPosts,
                findPosts: true,
                loggedIn: true,
                userName: req.user.UserName
            });
        });
    });

    // USERNAME ROUTE. render posts by name (logged in)
    // app.get("/user/:name", function(req, res) {
    //     console.log("api/name route\n==========================================");
    //     db.Authors.findOne({
    //         where: {
    //             UserName: req.params.name
    //         },
    //     }).then(function(dbAuthor) {
    //         console.log(dbAuthor);
    //         db.Post.findAll({
    //             where: {
    //                 AuthorID: dbAuthor.ID
    //             },
    //             include: [db.Tag, db.Authors]
    //         }).then(function(dbPosts) {
    //             // let currentUser = "";
    //             // if (req.user) {
    //             //     currentUser = req.user.UserName
    //             // } else {
    //             //     currentUser = false;
    //             // }
    //             res.render("blueit", {
    //                 posts: dbPosts,
    //                 user: req.params.name,
    //                 findUser: true,
    //                 // userName: currentUser
    //             });
    //         });
    //     });
    // });

};