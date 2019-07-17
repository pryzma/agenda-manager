const config = (function(){
  const fs = require('fs');
  return fs.readFile('/assets/json/config.json');
})();
module.exports = config;
