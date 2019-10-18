// Application Client Envoirement

( function ace() {
    const app = {}
    function component (args) {
        app.component[args.name] = args;
        appComponent(args);
    }
    function module (args) {
        app.module[args.name] = args;
        appModule(args);
    }
    ( function config() {
        axios.get({url : 'config'})
        .then((data)=>{
            app.config = data;
            init();
        })
    })(),
    init = () => {
        if(app.config){
            app.models = app.config.models;

        }
    }
    model = (args) => {
        app.model[args.name] = args;
        appModel(args);
    },
    view = (args) => {
        app.view[args.name] = args;
        appView(args);
    },
    controller = (args) => {

    },
    router = (args) => {

    }
    // appView
    function appView(args) {
        if(args.model){
            const modelProps = Object.getOwnPropertyNames(app.models[args.model]),
                  viewEls = []
            for(const viewEl in document.querySelectorAll()){
                app.view[args.name][viewEl.id] = viewEl
                viewEls.push(viewEl)
            }

        }
    }
    // appModule
    function appModule(args){

    }
    // appComponent
    function appComponent(args){

    }
    return {
        app : app,
        component : component,
        module : module,
        config : config,
        model : model,
        view : view,
        controller : controller,
        router : router
    }
})()

