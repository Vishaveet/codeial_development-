const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users')

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.password !== password) {
                    console.log("Invalid Username/Password");
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(err => {
                console.log("Error in finding User ---> Passport");
                return done(err);
            });

    }));

// Serialize User to decide which key to be kept in Cookie
passport.serializeUser(function (user, done) {
    done(null, user.id)
})

// Desrialize User from the key in cookies
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch((err) => {
            console.log("Error Finding User!!");
            return done(err);
        });

});

// Check if the user is Authenticate

passport.checkAuthentication = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signe in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user; 
    }
    next();
}

module.exports = passport
