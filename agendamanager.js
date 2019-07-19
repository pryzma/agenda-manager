const agendamanager = (function(){

  // packages
  const express = require('express'),
        expressLayouts = require('express-ejs-layouts'),
        session  = require('express-session'),
        Store = session.Store,
        BetterMemoryStore = require('session-memory-store')(session),
        store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true }),
        cookieParser = require('cookie-parser'),
        //bodyParser = require('body-parser'),
        flash    = require('connect-flash'),
        bcrypt = require('bcrypt'),
        passport = require('passport'),
        logger = require('morgan'),
        LocalStrategy  = require('passport-local').Strategy,
        path = require('path');
  // database
  const connection = require('./dbconn');
  // routes
  const index = require('./routes/index');
  const app = express();
  // session setup
  app.use(session({
     name: 'JSESSION',
     secret: 'MYSECRETISVERYSECRET',
     store:  store,
     resave: true,
     saveUninitialized: true
  }));
  // view engine setup
  //app.use(expressLayouts);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  // log requests
  app.use(logger('dev'));
  //app.use(express.json());
  //app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // static directory setup
  app.use(express.static(path.join(__dirname, 'assets')));
  // flash messages setup
  app.use(flash());
  // passport setup
  app.use(passport.initialize());
  app.use(passport.session());
  // routes setup
  app.use('/', index);

  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  } , function (req, username, password, done){
        console.log(username+' = '+ password);
        if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        connection.query("select * from accounts where email = ?", [username], function(err, rows){
            console.log(err);
          if (err) return done(req.flash('message',err));

          if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password!')); }
          salt = salt+''+password;
          var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
          var dbPassword  = rows[0].password;

          if(!(dbPassword == encPassword)){
              return done(null, false, req.flash('message','Invalid username or password!'));
           }
           req.session.user = rows[0];
          return done(null, rows[0]);
        });
      }
  ));

  passport.serializeUser(function(user, done){
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
      connection.query("select * from tbl_users where id = "+ id, function (err, rows){
          done(err, rows[0]);
      });
  });

  app.get('/signin', function(req, res){
    res.render('signin',{'message' :req.flash('message')});
  });

  app.post("/signin", passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
  }), function(req, res, info){
      res.render('index',{'message' :req.flash('message')});
  });

  app.get('/logout', function(req, res){
      req.session.destroy();
      req.logout();
      res.redirect('/signin');
  });



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
  return app
})();
module.exports = agendamanager;
