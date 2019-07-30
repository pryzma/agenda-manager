const _config = require('./assets/json/config.json');
function config(package,app){
  app.get('/config', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(_config));
  });
   _config.version = package.version;
  return _config;
}
module.exports = config;