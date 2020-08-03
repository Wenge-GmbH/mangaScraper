import passport from 'koa-passport';
import '../services/auth';

export default ({ app }) => {
  app.use(passport.initialize());
};
