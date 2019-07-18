const auth = (function(){
  const connection = require('./dbconn')
  const express = require('express'),
        flash = require('connect-flash'),
        bcrypt = require('bcryptjs'),
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        session = require('express-session');

  const Store = session.Store,
        BetterMemoryStore = require('session-memory-store')(session),
        store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });

  const app = express();
  app.use(session({
    name: 'JSESSION',
    store : store,
    secret: 'MYSECRETISVERYSECRET',
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
      if( !username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
      const salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
      connection.query("select * from tbl_users where username = ?", [username], function(err, rows){
          console.log(err);
        if (err) return done(req.flash('message',err));

        if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password!')); }
        salt = salt+''+password;
        const encPassword = crypto.createHash('sha1').update(salt).digest('hex');
        const dbPassword  = rows[0].password;
        // Match password
        bcrypt.compare(password,dbPassword,(err,isMatch)=>{
          if(err) throw err;
          const user = rows[0];
          if(isMatch){
            return done(null, user);
          }else{
            return done(null, false, req.flash('message','Invalid username or password!'));
          }
        });

      });
    }
  ));



  app.get('/signin', function(req, res){
    res.render('index',{'message' :req.flash('message')});
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

})();
module.exports = auth;
