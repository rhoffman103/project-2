var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);
  app.get("/", authController.signin);
  app.post("/signup", passport.authenticate("local-signup", {
      // successRedirect: '/dashboard',
      successRedirect: "/blueit",
      failureRedirect: "/signup"
    })
  );

  app.post("/signin", passport.authenticate("local-signin", {
      failureRedirect: "/signin"
    }),
    function(req, res) {
      console.log(req.user.UserName);
      res.redirect("/blueit");
    }
  );

  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });
};
