const agendamanager = (function(){

  const includes = require('./includes'); // adds npm packages in includes object
  const config = require('./config'); // assets/json/config.json as config object
  const auth = require('./auth'); // authentication with passport & express-session
  //const routes = require('./routes'); // routes from config
  const express = includes.express,
        cookieParser = includes.cookie_parser,
        bodyParser = includes.body_parser,
        path = includes.path;
  
  const app = express();
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  //app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'assets')));
  // set main/index route
  const index = require('./routes/index');
  app.use('/', index);
  // set routes with config.routes properties
  for(let _route of Object.getOwnPropertyNames(config.routes)){
    try{
      let _module = require(`./routes/${_route}`);
      app.use(_route, _module);
    }catch(err){
      console.log(`Module ./routes/${_route}.js not available');
    }
  }
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

})();
module.exports = agendamanager;
