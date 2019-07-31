const fs = require('fs');

module.exports = (app)=>{
    const requires = require('../config/app.json').server.require;
    for(const item of requires){
        require(`./${item}`)(app);
        //
        console.log('\x1b[32m\x1b[1m',`require\x1b[0m \x1b[3mapp/${item}.js\x1b[0m`)
        
    }

}