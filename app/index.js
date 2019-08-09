/*
* app/index.js
*/
const fs = require('fs');
const config = require('../config/app.json')

module.exports = (app)=>{
    console.log('\x1b[32m',`[config.server.require]\x1b[0m \x1b[3mconfig/app.json\x1b[0m`)
    const requires = config.server.require;
    for(const item of requires){
        require(`./${item}`)(app);
        //
        console.log(`\x1b[32m[require]\x1b[0m \x1b[3mapp/${item}.js\x1b[0m`)
        
    }
    
}