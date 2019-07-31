const agendamanager = (function(){

  // packages
  const express = require('express'),
        app = express(),
        path = require('path');


  // sequelize
  require('./app/sequelize')(require('./app/models'));
  // manifest
  require('./app/manifest')(app);
  // routes
  require('./app/routes')(app);
  // view
  require('./app/view')(app,path);
  // parser
  require('./app/parser')(app);
  // static
  require('./app/static')(app,express,path);
  // auth
  require('./app/auth')(app)
  // error
  require('./app/error')(app)
 
 return app
})();
module.exports = agendamanager;
