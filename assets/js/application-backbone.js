const application = (function(){
    let config,
        object = {},

    const applicationObj = {
        defaults : {
            template : 'pageLayout',
            templateEngine : 'html',
            templatePath : '{templateEngine}/templates/{template}.{templateEngine}',
            modulesPath : 'js/modules/{module}.js'
        }
    },
    require = (name,callback) => {
        const requireStart = new Date;
        $.get(`js/${name}.js`).done(() => {
          const requireEnd = new Date;
          const requireLoadtime = requireEnd - requireStart;
          debug(`application.require : js/${name}.js load complete in ${requireLoadtime} ms`)
          if(callback)callback()
        }).fail(()=>{
           throw `application.require : ${name} not available`
        });
    }
    applicationObj.require = require;
    const hash = () => location.hash.slice(1);
    const route = () => hash().split('/');
    const endpoint = () =>
        hash() ? getRoute().endpoint : config.default;
    const getRoute = (_route) => {
    
        _route = _route ? _route : hash()
        if(!_route) _route = endpoint() // get config.default if hash route not provided
    
        let _parameter,_endpoint;
        const routesProps = Object.getOwnPropertyNames(config.routes);
        for(let route of routesProps){
          if(_route===route){ // match route with config.routes properties
            _parameter = _route != route ? _route.replace(`${route}/`,'') : null;
            _endpoint = config.routes[route].split('.'); // _endpoint array for module route
            break;
          }
        }
        return {
          parameter : _parameter,
          endpoint : _endpoint
        }
      }
    return applicationObj;
})();