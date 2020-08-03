import passport from 'koa-passport';
import jsonwebtoken from 'jsonwebtoken';

// prefix: "/"
export default ({ router }) => {
  router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    async (ctx) => {
      const { user } = ctx.req;
      console.log(user);
      console.log(ctx.isAuthenticated());

      const token = await jsonwebtoken.sign({ id: user.id }, process.env.secret);
      ctx.body = { token };
    }
  );
  router.get(
    '/auth',
    passport.authenticate('jwt', { session: false }),
    async (ctx) => {
      console.log(ctx.req.user);
      console.log(ctx.isAuthenticated());
      ctx.body = ctx.req.user;
    }
  );
};
