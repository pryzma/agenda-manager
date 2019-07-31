const agendamanager = (function(){

  // packages
  const express = require('express'),
        app = express();
  // requires modules from app directory
  require('./app')(app,[ 
      'dev', // development scripts (morgan logger)
      'session', // express session
      'sequelize', // sequelize
      'manifest', // manifest.json
      'routes', // express router
      'view', // express view
      'parser', // cookie & body parser
      'static', // express static
      'auth', // passport auth
      'error' // error handling
  ]);
 return app
})();
module.exports = agendamanager;
