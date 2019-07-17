const routes = (function(){
  const fs = require('fs');
  const config = fs.readFile('/assets/json/config.json');
  config = JSON.parse(config);
  return config.routes;
})();
module.exports = routes;
