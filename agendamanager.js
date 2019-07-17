const agendamanager = (function(){

  const includes = require('./includes'); // adds npm packages in includes object
  const config = require('./config'); // assets/json/config.json as config object
  //const routes = require('./routes'); // routes from config
  const cookieParser = includes.cookie_parser;
  const express = includes.express;
  const app = express();
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  //app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'assets')));
  // set routes
  for(let _route of Object.getOwnPropertyNames(config.routes)){
    let _module = require(`./routes/${_route}`);
    app.use(_route, _module);
  }

})();
module.exports = agendamanager;
