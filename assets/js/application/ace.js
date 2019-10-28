// Application Client Envoirement

( function client() {
    const app = {
        config : {},
        component : appComponent,
        module : appModule,
        model : appModel,
    }
    
    const appConfig = ( () => {
        fetch('config') // fetch config from server
        .then((res)=>{
            res.json().then((data)=>{
                app.config = data
                init(); // 
            });
            
        })
    })()
    function init() {
        const config = app.config;
        if(config){
            app.models = config.models;
            app.modules = config.modules;

        }
    }
    function model(args)  {
        app.model[args.name] = args;
        appModel(args);
    }
    function view (args) {
        app.view[args.name] = args;
        appView(args);
    }
    controller = (args) => appController(args),
    router = (args) => appRouter(args)
    function err(err){
        throw err
    }
    // withType
    function withType(args,type,callback){
        // assign callback to args type
        const argsType = typeof args,
        err = `withType called with type '${type}', argsType is ${argsType} `;
            switch(args.prototype){
                case String:
                    type === 'string' ? callback() : err(err)
                    break;
                case Object:
                    callback();
                    break;
                case Function:
                    callback();
                    break;
                case Array:
                    callback();
                    break;
                
            }
    }
    // appController
    function appController(args){
        const controller = {}
        /*
        controller.set({
            config : [args]
        })
        */
        controller.set = (args,callback) => {
            withType({ args : 'string' },(args)=>{
                // typeof args === 'string'
                console.error(`controller.set('${args}') : args must be a Object or Array`)
            })
            withType({ args : 'object' },(args)=>{
                // typeof args === 'object'
                // property name of args object
                const argsProps = Object.getOwnPropertyNames(args)
                const argsKey = argsProps[0]
                // assign method to contoller
                if(typeof args[argsKey] === "function") controller[argsKey] = callback
                if(typeof args[argsKey] === "object"){
                    const argsKeyProps = Object.getOwnPropertyNames(args[argsKey])
                    /* controller.set({ config : {

                    }})*/
                    if(argsKey === 'config'){

                    }
                }
            })
            
        }
    }
    // appHistory
    function appHistory(args){

    }
    // appRouter
    /*
    client.router({
        '/route' : 'module'
    })
    */
    function appRouter(args){
        const routes = Object.getOwnPropertyNames(args)
        for(const route of routes){

        }
    }
    // appView
    function appView(args) {
        if(args.model){
            const modelProps = Object.getOwnPropertyNames(app.models[args.model]),
                  viewEls = []
            for(const viewEl in document.querySelectorAll(args.el)){
                app.view[args.name][viewEl.id] = viewEl
                viewEls.push(viewEl)
            }

        }
    }
    // appModel
    function appModel(args){
        const argsType = typeof args;

    }
    // appModule
    function appModule(args){
        //app.module[args.name] = args;
    }
    // appComponent
    function appComponent(args){
        app.component[args.name] = args;
    }
    return {
        app : app,
        component : app.component,
        module : app.module,
        config : app.config,
        model : model,
        view : view,
        controller : controller,
        history : app.history,
        router : router
    }
})()

