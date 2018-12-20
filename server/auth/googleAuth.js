const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const jwt = require('jsonwebtoken');

const googleId = process.env.GOOGLE_OAUTH_ID;
const googleSecret = process.env.GOOGLE_OAUTH_SECRET;

passport.use(new GoogleStrategy({
    clientID: googleId,
    clientSecret: googleSecret,
    callbackURL: ""
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = (req, res, next) => {

}
