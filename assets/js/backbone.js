const backbone = (function(){
    if(Backbone){
        
        return {
            view : function(obj){
                const module = application.module(); // get module object
                if(!obj) obj = {} // create empty object if not given
                if(module.view){
                    for(let prop in module.view){
                        // get module view object properties
                        if(!obj[prop]) obj[prop] = module.view[prop] 
                    }
                }
                const el = obj.el ? obj.el : application.config.main;
                const View = Backbone.View.extend({
                    el: el,
                    template: _.template(obj.template),
                    initialize: function(){
                        this.render();
                    },
                    render: obj.render
                });
                return View
            },
            model : function(obj){

            }
        }
    }else{
        console.warn('Backbone is not available')
    }
})()