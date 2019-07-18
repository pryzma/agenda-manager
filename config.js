const config = (function(){
  const fs = require('fs');
  fs.readFile('/assets/json/config.json',(err,data)=>{
    //something useful
    console.log(data)
    return data;
  });
})();
module.exports = config;
