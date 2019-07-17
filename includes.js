
const includes = (function(){
  const lib = {}
  const fs = require('fs');
  const _package = fs.readFile('package.json',(err,data)=>{
    const packages = JSON.parse(data);
    for(let item of Object.getOwnPropertyNames(packages.dependencies)){
      lib[item.replace('-','_')] = require(item);
    }
    return lib;
  });
  return _package;
})();
module.exports = includes;
