var exports = (module.exports = {});
var db = require("../models");

exports.signup = function (req, res) {
    db.Posts.findAll({
        include: [db.Authors]
    }).then(function (dbPosts) {
        // console.log("POSTS \n" + JSON.stringify(dbPosts, null, 2))
        res.render("blueit", {
            posts: dbPosts,
            findPosts: true,
            signMeUp: true
        });
    });
};

exports.signin = (req, res) => {
    // console.log("username: " + req.user.UserName)
    db.Posts.findAll({
        include: [db.Authors]
    }).then(function (dbPosts) {
        // console.log("POSTS \n" + JSON.stringify(dbPosts, null, 2))
        res.render("blueit", {
            posts: dbPosts,
            findPosts: true,
            signMeIn: true,
            // userName: req.user.UserName
        });
    });
};



exports.dashboard = function (req, res) {
    res.render("dashboard");
};
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/");
    });
};
