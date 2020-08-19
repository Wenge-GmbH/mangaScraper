const logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
import serve from 'koa-static';
export default ({ app }) => {
  app.use(logger());
  app.use(cors());
  app.use(bodyParser());
  app.use(serve(`client/build`));
};
