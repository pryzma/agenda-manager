const fs = require('fs');

module.exports = (app,requires)=>{
    const _requires = []
    fs.readdirSync(__dirname).filter((file) => (file.indexOf(".") !== 0) && (file !== "index.js") ).forEach((file) => {
    
        //require(`./${file}`)(app);
        //console.log('\x1b[32m\x1b[1m',`require\x1b[0m \x1b[3mapp/${file}\x1b[0m`)

      });
      //console.log(requires)
    for(const item of requires){
        require(`./${item}`)(app);
        //
        console.log('\x1b[32m\x1b[1m',`require\x1b[0m \x1b[3mapp/${item}.js\x1b[0m`)
        
    }

}