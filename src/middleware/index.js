const logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
import serve from 'koa-static';
import compress from 'koa-compress';

export default ({ app }) => {
  app.use(logger());
  app.use(cors());
  app.use(bodyParser());
  app.use(
    compress({
      filter: function (content_type) {
        return /text/i.test(content_type);
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH,
    })
  );
  app.use(serve(`public`));
};
