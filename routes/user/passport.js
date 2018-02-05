var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'nodeauthsecret';
  passport.use(new JwtStrategy(opts, function(decoded, done) {
    done(null, decoded);
  }));
};
