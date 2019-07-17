const router = function(route,_render){
  const includes = require('./includes');
  const express = includes.express;
  const express_router = express.Router();
  const _route = route === 'index' ? '/' : route
  router.get(route, isAuthenticated, function(req, res, next) {
    res.render(route, _render(req, res, next));
  });
  function isAuthenticated(req, res, next) {
    if (req.session.user)
      return next();
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
    res.redirect('/signin');
  }

}
module.exports = router;
