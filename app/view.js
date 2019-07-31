const expressLayouts = require('express-ejs-layouts'),
flash    = require('connect-flash'),
view = (app,path) =>{
  
 // view engine setup
  app.use(expressLayouts);
  app.set('../views', path.join(__dirname, '..','views'));
  app.set('view engine', 'ejs');
  // flash messages setup
  app.use(flash());
  return app;
}
module.exports = view;