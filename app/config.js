/*
* app/config.js
*/
const _config = require('../config/app.json');
function config(package,app){
  console.log('\x1b[36m',`[route]\x1b[0m \x1b[37mhttp://127.0.0.1:3000/config\x1b[0m\x1b[36m \x1b[0m`)
  _config.version = package.version;
  app.get('/config', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const name = _config.name;
    const obj = _config.client;
    obj.version = _config.version;
    obj.name = name;
    res.end(JSON.stringify(obj));
  });
   
  return _config;
}
module.exports = config;