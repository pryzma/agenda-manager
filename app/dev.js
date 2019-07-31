const logger = require('morgan'),
dev = (app)=>{
    // log requests
  app.use(logger('dev'));
}
module.exports = dev;