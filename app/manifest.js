/*
* app/manifest.js
*/
const package = require('../package.json'),
manifest = (app)=>{
    const config = require('./config')(package,app)
    app.get('/manifest.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          manifest_version : '0.0.1',
          version : config.version,
          name : config.name
        }));
      });
}
module.exports = manifest;