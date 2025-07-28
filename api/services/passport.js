const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const config = require("../config");

const localOptions = { usernameField: "email" };
const localStrategy = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false);
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(localStrategy);
passport.use(jwtStrategy);
module.exports = passport;
module.exports = passport;
passport.use(jwtStrategy);
module.exports = passport;
module.exports = passport;
