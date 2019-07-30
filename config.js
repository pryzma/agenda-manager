module.exports = function(package,app){
  const config = require('./assets/json/config.json');
    app.get('/config', (_req, res) => {
      
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(config));
    });
    config.version = package.version;
    return config;
  }