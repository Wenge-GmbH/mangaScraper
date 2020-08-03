const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

const fetchUser = (() => {
  const user = { id: 123456789, username: 'test', password: 'test' };
  return async () => {
    return user;
  };
})();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const localLogin = new LocalStrategy((username, password, done) => {
  fetchUser()
    .then((user) => {
      if (username === user.username && password === user.password) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  console.log('payload received', jwt_payload);

  try {
    const user = await fetchUser();
    if (user.id !== jwt_payload.id) throw new Error('id not found');
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);
