const auth = (function(){
  const includes = require('./includes');
  const connection = require('dbconn')

  const express = includes.express,
        flash = includes.connect_flash,
        crypto = includes.crypto,
        passport = includes.passport,
        localStrategy = includes.passport_local.Strategy,
        session = includes.express_session;

  const BetterMemoryStore = require(`${__dirname}/memory`),
        store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
  const app = express();
  app.use(session({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    store:  store,
    resave: true,
    saveUninitialized: true
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  //passport Strategy -- the express session middleware before calling passport.session()
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  } , function (req, username, password, done){
      console.log(username+' = '+ password);
      if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
      var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
      connection.query("select * from tbl_users where username = ?", [username], function(err, rows){
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
    res.render('index',{'message' :req.flash('message')});
  });
  
  app.post("/signin", passport.authenticate('local', {
      successRedirect: '/users',
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

})();
module.exports = auth;
