module.exports = (app)=>{
   const routes = require('../config/app.json').server.routes;
   for(const route in routes){
       app.use(route,require(`../routes/${routes[route]}`));
       console.log('\x1b[36m\x1b[1m',`route\x1b[0m \x1b[37m${route}\x1b[0m\x1b[36m : \x1b[3mroutes/${routes[route]}.js\x1b[0m`)
   }
}