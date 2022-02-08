const passport = require('passport');
const User = require('../modals/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const {googleCallback} = require('./callbacks');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}auth/google/callback`
  },
  googleCallback
  )
 );

//  passport.use(new FacebookStrategy({
//   clientID: process.env.FACBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL:`${process.env.URL}auth/facebook/callback/`,
//   profileFields: ["id", "displayName", "name", "gender", "picture.type(large)", "email"]
//  },
//  facebookCallback
//  ))

