const User = require('../modals/user');
const JWT = require('jsonwebtoken');

exports.googleCallback = (accessToken, refreshToken, profile, done) => {

    User.findOne({email: profile.emails[0].value}).then(existingUser => {
        if(existingUser){
            done(null, existingUser);
          }else{
              new User(
                  {
                      googleId: profile.id,
                      firstname:profile.name.familyName,
                      lastname:profile.name.givenName,
                      email:profile.emails[0].value,
                      password:profile.id,
                      username:profile.displayName,
                      profileImage:profile.photos[0].value,
                      userType:'user',
                      verified:profile.emails[0].verified
                  }
                  ).save().then(user => done(null, user));
                }
              });
            }

exports.InfoSignedJWT = (user) => {
    let token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    return token;
}           

// exports.facebookCallback = (accessToken, refreshToken, profile, done) => {

//     User.findOne({email: profile.emails[0].value}).then(existingUser => {
//         if(existingUser){
//             done(null, existingUser);
//           }else{
//               new User(
//                   {
//                       facebookId: profile.id,
//                       firstname:profile.name.familyName,
//                       lastname:profile.name.givenName,
//                       email:profile.emails[0].value,
//                       password:profile.id,
//                       username:profile.displayName,
//                       profileImage:profile.photos[0].value,
//                       userType:'user',
//                       verified:true
//                   }
//                   ).save().then(user => done(null, user));
//                 }
//               });
//             }