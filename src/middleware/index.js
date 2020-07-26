const logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

export default ({ app }) => {
  app.use(logger());
  app.use(cors());
  app.use(bodyParser());
};
