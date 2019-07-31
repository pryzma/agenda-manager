const agendamanager = (function(){
  // express app
  const app = require('express')();
  // requires modules from app directory as defined in config/app.json
  require('./app')(app);
  return app
})();
module.exports = agendamanager;
