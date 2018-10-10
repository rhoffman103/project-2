var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {
    app.get('/signup', authController.signup);
    app.get('/', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        // successRedirect: '/dashboard',
        successRedirect: '/blueit',

        failureRedirect: '/signup'
    }));
    // app.post('/signin', function (req, res, next) {
    //     passport.authenticate('local-signin', function (err, user) {
    //         if (err) {
    //             return next(err)
    //         }
    //         if (!user) {
    //             res.local("UserName", req.param('UserName'));
    //             return res.render('/signin', {
    //                 error: true
    //             });
    //         }

    //         // make passportjs setup the user object, serialize the user, ...
    //         req.login(user, {}, function (err) {
    //             if (err) {
    //                 return next(err)
    //             };
    //             return res.redirect("/blueit");
    //         });
    //     })(req, res, next);
    //     return;
    // });
    app.post('/signin', passport.authenticate('local-signin', {
        failureRedirect: '/signin'
    }), function (req, res) {
        console.log(req.user.UserName)
        res.redirect('/blueit')
});

    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    });

}

