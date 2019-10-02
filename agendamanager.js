
module.exports = (() => {
  const app = require('express')();
  require('./app')(app);
  return app
})();
