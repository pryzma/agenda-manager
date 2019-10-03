/*
* app/dev.js
*/
const models = require('../models')
module.exports = ()=>{
    
  //console.log(models)
  // sequelize models sync
  models.sequelize.sync().then(function() {

    console.log('\x1b[1m\x1b[32m',`${models.sequelize.config.database} models.sequelize.sync() OK\x1b[0m`)
    
  }).catch(function(err) {
    console.error(err, "Something went wrong with the Database Update!")
  });
}