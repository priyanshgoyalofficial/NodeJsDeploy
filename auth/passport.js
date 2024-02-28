const passport = require("passport");
const User = require("../models/users");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");


passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      console.log(username, password);
      let user = await User.findOne({ username });
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password).then(function (result) {
        if (result == false) return done(null, false);
        return done(null, user);
      });
    } catch (err) {
      if (err) {
        return done(err);
      }
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, false);
    });
});

module.exports = passport;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));
