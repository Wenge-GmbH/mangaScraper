import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';

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

const localLogin = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);

    const isMatch = await user.comparePassword(password);

    if (!isMatch) return done(null, false);
    return done(null, user);
  } catch (e) {
    return done(e);
  }
  // fetchUser()
  //   .then((user) => {
  //     if (username === user.username && password === user.password) {
  //       done(null, user);
  //     } else {
  //       done(null, false);
  //     }
  //   })
  //   .catch((err) => {
  //     done(err);
  //   });
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
