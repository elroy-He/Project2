const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

//Require your User Model here!

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    console.log(profile);
    console.log('<--- this is my profile');
    // Has this user logged in twith oAuth before
    User.findOne({googleId: profile.id}, function(err, user){
      if (user) return cb(null, user);
      if (err) return cb(err);
      User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }, function(err, createdUser){
        if (createdUser) return cb(null, createdUser)
        if (err) return cb(err)
      })
    })
  })
)

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will
  // be availible in every Single controller function, so you always know the logged in user

  User.findById(userId, function(err, user) {
    if (err) return done(err);
    done(null, user);
  })

});



