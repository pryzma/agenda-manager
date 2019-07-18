const router = function(route,_render){

  const express = require('express');
  const router = express.Router();
  const _route = route === 'index' ? '/' : route
  router.get(route, isAuthenticated, function(req, res, next) {
    if(typeof _render(req, res, next) === 'object'){
      res.render(route, _render(req, res, next));
    }else{
      _render(req, res, next);
    }

  });
  function isAuthenticated(req, res, next) {
    if (req.session.user)
      return next();
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
    res.redirect('/signin');
  }

}
module.exports = router;
