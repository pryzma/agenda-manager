// editor; all in one CRUD component
  /*
  component.editor({
    module : 'modulename',
    data : {
      url :'api/endpoint',
      modify : (item)=>{
        return item
      },
      callback : (data) => {

      }
    },
    use : {
      view : {
        component : 'modal'
      },
      overview : {
        component : 'table',
        default : true, // use overview as module default
        methods : {
          onRowClick : view
        }
      }
    }
  })
  */
 function editor(args){
    // module presets
    application.object[args.module].template = 'editor'
    application.object[args.module].default = editorOverview
    application.object[args.module].add = { default : editorAdd }
    application.object[args.module].view = { default : editorView }
    // set routes
    application.routes[`${args.module}/add`] = `${args.module}.add`;
    application.routes[`${args.module}/view`] = `${args.module}.view`;
    // data config
    const editorData = {
      url : args.data.url,
      modify : args.data.modify,
      callback : (data) => {
        application.object[args.module].data = data;
        args.data.callback();
      }
    }
    // view
    const editorView = (id) => {
 
      const item = application.object[args.module].data.filter((item) => item.id === id)[0];
      component[args.view.use.component](args.view);
    }
    // overview
    const editorOverview = () => {
      if(!args.overview.us.class && args.us.overview.component === 'table')
        args.use.overview.class = 'table-striped table-hover';

      component[args.use.overview.component]({
        model : args.use.overview.model,
        el : args.use.overview.el,
        data : editorData,
        class : args.use.overview.class,
        cols : args.use.overview.cols,

      })
    }
    //api call
    api(editorData)
  }