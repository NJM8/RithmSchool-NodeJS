const express = require("express");
const router = express.Router();
const db = require("../models");
const authMiddleware = require("../middleware/auth")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
},
  function verifyCallback(req, username, password, done) {
    db.User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, function(err,isMatch){
        if(isMatch){
            return done(null, user);
        } else {
            return done(null, false);
        }
      })
    });
  }
));

passport.use( new SpotifyStrategy({
  clientID: process.env.SPOTIFY_APP_ID,
  clientSecret: process.env.SPOTIFY_APP_SECRET, 
  callbackURL: process.env.CALLBACK_URL || "http://localhost:8000/users/auth/spotify/callback",
  passReqToCallback: true,
  },
  function(req, accessToken, refreshToken, expires_in, profile, done){
    db.User.findByIdAndUpdate(req.user.id, { $set: { spotify_id: profile.id }}, function(err, user){
      return done(err, user);
    });
  }
));

passport.authenticate('local', { 
  failureFlash: 'Invalid username or password.',
  successFlash: 'Logged In!' 
});

passport.authenticate('spotify', { 
  failureFlash: 'Unable to connect to spotify',
  successFlash: 'Connected to Spotify!' 
});

// this code is ONLY run if the verify callback returns the done callback with no errors and a truthy value as the second parameter. This code only runs once per session and runs a callback function which we can assume will not have any errors (null as the first parameter) and the data we want to put in the session (only the user.id). The successCallback is run next!
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// once a user has been authenticated and serialized, we now find that user in the database on every request. This allows passport to have some useful methods on the request object like req.user (the current user logged in) and req.isAuthenticated() (returns true if the user is logged in or false if not)
passport.deserializeUser(function(id, done) {
  db.User.findById(id).then(function(user) {
    done(null, user);
  });
});

router.get('/', authMiddleware.loginRequired, function(req,res, next){
    res.render('index')
});

router.get('/login', function(req,res, next){
    res.render('login')
});

router.get('/signup', function(req,res, next){
    res.render('new')
});

router.post('/login',
  passport.authenticate('local', { successRedirect: `/users/:user_id`,
    failureRedirect: '/users/login'}));


router.post('/signup', function(req,res, next){
    db.User.create(req.body).then(function(user){
         req.logIn(user, function(err) {
            req.flash('message', 'Signed up and logged in')
            return res.redirect(`/users/${user.id}`);
         });
     }, function(err){
         return next(err);
     });
});

router.get('/logout', function(req,res, next){
    req.logout()
    req.flash('message', 'logged out!')
    res.redirect('/users/login')
})

router
  .route('/auth/spotify')
  .get(passport.authenticate('spotify'),(req, res, next) => {
  });

router
  .route('/auth/spotify/callback')
  .get(passport.authenticate('spotify', { failureRedirect: '/users/:user_id' }), 
    (req, res, next) => {
      res.redirect('/users/:user_id');
    })

router.get('/:user_id', function(req, res, next){
  return res.render('showUser', { user: req.user });
})

module.exports = router;






