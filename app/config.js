/*
* app/config.js
*/
const _config = require('../config/app.json');
function config(package,app){
  //console.log('\x1b[36m',`[route]\x1b[0m \x1b[37mhttp://127.0.0.1:3000/config\x1b[0m\x1b[36m \x1b[0m`)
  
  _config.version = require('../package.json').version;
  _config.npm_lifecycle_event = process.env.npm_lifecycle_event;
  const models = require('../models');
 
  //app.get('/config', (_req, res) => {
    //res.setHeader('Content-Type', 'application/json');
   
    ///const name = _config.name;
    //const obj = _config.client;
    _config.models ={}
    for(let model of Object.getOwnPropertyNames(models.sequelize.models)){
      _config.models[model] = models[model].rawAttributes
    }
    //_config.models = obj.models
    //obj.version = _config.version;
    //obj.name = name;
    //obj.user = _req.session.user;
    //obj.npm_lifecycle_event = _config.npm_lifecycle_event
    //res.end(JSON.stringify(obj));
  //});
   
  return _config;
}
module.exports = config;