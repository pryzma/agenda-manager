//(() => {
  // Application Client v 0.10.7
  // tool, utils, view, model, controller, application, client
  'use strict'

  /*
  * tool
  */
  const tool = (function() {
    /* ---------------------------------------------------------------------------
    * make
    tool.make( [ 'div', { id : 'id', class : 'class'}, 'content ', [ 'a', { href : 'https://developer.mozilla.org/' }, 'link' ] ] )
    */
    function make( tag, callback ){
      let isArray = ( array ) => Object.prototype.toString.call( array ) === '[object Array]'
      if ( !isArray( tag ) ) return make.call( this, Array.prototype.slice.call( arguments ) )
      let name = tag[0],
          attributes = tag[1],
          element = document.createElement( name ),
          start = 1

      if ( typeof attributes === 'object' && attributes !== null && !isArray( attributes ) ) {
        for ( let attribute in attributes ) element[ attribute ] = attributes[ attribute]
        start = 2
      }
      for ( let index = start; index < tag.length; index++ ) {
        if( isArray( tag[ index ] ) ){
          element.appendChild( tool.make( tag[ index ] ) )
        } else {
          element.appendChild( document.createTextNode( tag[ index ] ) )
        }
      }
      if( callback ) callback()
      return element
    }
    /* ---------------------------------------------------------------------------
    * insert
    tool.insert( 'content' )
    */
    function insert( content, callback ){
      let output, main = UI.main;
      content.output ? output = content.output : output = config.output;
      if( !typeof output === 'object'  ) output = main.querySelector( output )
      if ( typeof content === 'object'  ) {
        if( content.html ){
          if( content.append ) {
            output.appendChild( tool.make( content.tag, { id : content.id }, content.html ) )
          }else {
              output.innerHTML = content.html
          }
        } else {
          output.innerHTML = ''
          output.appendChild( content )
        }
      } else {
        output.innerHTML = content
      }
      if( callback ) callback()
      return output
    }
    // UI.mainContent.insert( tool.make( 'div', 'content' ) )
    Object.prototype.insert = function( content, callback ) {
        if ( !typeof content === 'object'  ) content = { html : content }
        content[ 'output' ] = `#${this.id}`;
        tool.insert( content, callback )
    }
    /* ---------------------------------------------------------------------------
    * response
    tool.make( 'button', 'button' ).addEventListener( 'click', (event) => tool.response(event) )
    */
    function response( event, property, response, target, targetProperty, callback ){
      let eventTarget = event.target;
      targetProperty ? target[ targetProperty ] = eventTarget[ property ] : target = eventTarget[ property ]
      if( !application.data.response[ response ] ) application.data.response[ response ] = {}
      application.data.response[ response ][ property ] = eventTarget[ property ]
      if( callback ) callback()
      return application.data.response
    }

    /* ---------------------------------------------------------------------------
    * xhr

    */
    function xhr( args, callback ){
      let xhr = new XMLHttpRequest()
      if( !args ) args = {}
      if( !args.type ) args[ 'type' ] = 'GET'
      if( !args.status ) args[ 'status' ] = 200
      if( !callback ) callback = tool.response;
      xhr.addEventListener( 'load',  ( event ) => {
        if ( xhr.readyState === 4 && xhr.status === args.status ) {
          callback( event, args.property, args.response, args.target, args.targetProperty, args.callback )
        }
      })
      xhr.open( args.type, args.url, true )
      xhr.send( args.data )
    }
    // 'test.json'.xhr()
    String.prototype.xhr = function(args, callback) {
        if( !args ) args = {}
        args[ 'url' ] = this;
        xhr( args, callback )
    }
    /* ---------------------------------------------------------------------------
    * fetchXhr


    let args = {
      // xhr args
      type : 'GET',
      url : 'test.json',
      status : 200,
      // callback args
      response : 'application.data.response.test',
      property : 'responseText',
      target : document.querySelector( '#response' ),
      target_property : 'innerText',
      callback : () => {
        let response = JSON.parse( application.data.response.test.responseText )
        console.log( response.glossary.title )
      }
    }
    tool.xhr( args , tool.response )
    tool.fetchXhr( args ).then( tool.response )
    */
    function fetchXhr( args ) {
      if( !args ) args = {}
      if( !args.type ) args[ 'type' ] = 'GET'
      if( !args.status ) args[ 'status' ] = 200
      return new Promise( ( resolve, reject ) => {
        let xhr = new XMLHttpRequest()
        xhr.open( args.type, args.url )
        xhr.onload = ( event ) => xhr.status === args.status ? resolve( event ) : reject( Error( event ) )
        xhr.send( args.data )
      })
    }


    const formData = ( form ) => {
      let data = {},
      formData = new FormData( form )
      for( let item of formData.entries() ) data[ item[0] ] = item[1]
      return data
    }
    /*
    let form = document.getElementById('form');
    form.addEventListener( 'submit', (event) =>{
      let formData = form.formData()
    })

    */
    Object.prototype.formData = function() {
        tool.formData( this )
    }

    /* ---------------------------------------------------------------------------
    * get
    */
    // let arr = [ { id : 1 , text : 'test' }, { id : 2 , text : 'test' } ]
    // let item = tool.get( { data : arr, match : 1 })
    const get = ( args ) => {
      let data = args.data, key;
      args.key ? key = args.key : key = 'id'
      for( let item of data ){
        let match = (pointer) => isNaN( pointer ) ?  item[ key ] : item[ key ]/1
        if( match( args.match ) === args.match ) return item
      }
    }
    /* let arr = [ { id : 1 , text : 'test' }, { id : 2 , text : 'test' } ]
    let item = arr.get( 1 ) */
    Array.prototype.get = function( args ) {
        if( typeof args !== 'object' ) args = { match : args }
        args[ 'data' ] = this
        tool.get( args )
    }

    const getAll = ( args ) => {
      let data = args.data, key, arr = []
      args.key ? key = args.key : key = 'id'
      for( let item of data ){
        if( args.match.indexOf('>') ){
          if( item[ key ]/1 > args.match.slice(1)/1 ) arr.push( item )
        }else if ( args.match.indexOf('<') ) {
          if( item[ key ]/1 < args.match.slice(1)/1 ) arr.push( item )
        } else {
          let match = (pointer) => isNaN( pointer ) ?  item[ key ] : item[ key ]/1
          if( match( args.match ) === args.match ) arr.push( item )
        }
      }
      arr = new Set( arr )
      return arr
    }

    Array.prototype.getAll = function( args ) {
        if( typeof args !== 'object' ) args = { match : args }
        args[ 'data' ] = this
        tool.getAll( args )
    }


    /* ---------------------------------------------------------------------------
    *
    */
    return {
      make : make,
      insert : insert,
      response : response,
      xhr : xhr,
      fetchXhr : fetchXhr,
      formData : formData
    }
  })()
  /*
  * ------------------------------------------------------------------------------
  * utils
  */
  const utils = (function(){
    const getRandomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min,

    obj = (obj) => {
        return {
          properties : Object.getOwnPropertyNames(obj),
          values : Object.values(obj)
        }
    },

    params = (func) => {
          const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
          ARGUMENT_NAMES = /([^\s,]+)/g,
          fnStr = func.toString().replace(STRIP_COMMENTS, ''),
          result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
          if(result === null)
          result = [];
          return result;

    },
    elements = (args) => {
      const argsObj = obj(args);
      for(let item in argsObj.properties ){
        args[argsObj.properties[item]] = view.element(argsObj.values[item])
      }
      return args
    },
    format = (str) => {
      return str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/(?:\r\n|\r|\n)/g, '<br>');
    },
    isNode = (o) => {
      return (
        typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
      );
    },

    //Returns true if it is a DOM element
    isElement = (o) => {
      return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
      );
    },
    formData = ( form ) => {
      let data = {},
      formData = new FormData( form )
      for( let item of formData.entries() ) data[ item[0] ] = item[1]
      return data
    },
    occurence = (str,find) => (str.match(new RegExp(`${find}`,'g')) || []).length;
    return{
      getRandomInt : getRandomInt,
      obj : obj,
      params : params,
      elements : elements,
      format : format,
      isNode : isNode,
      isElement : isElement,
      formData : formData,
      occurence : occurence
    }
  })()
  // -----------------------------------------------------------------------------
  // view
  const view = (function(){
    const elements = [],
    get = function( id ){
      for( let element of elements ){
        if( element.id === id ){
          return element.element
        }
      }
    },

    //...........................................................................

      element = function( element ){
        if( get( element ) ) return get( element )
        if( typeof element === 'string' ) {
          if( element.includes( '.' ) ){
            element = (() => document.querySelectorAll( element ))()
          } else {
             if ( ! element.includes( '#' ) ) element = `#${element}`
             element = (() => document.querySelector( element ))()
          }
        }

        if(element){
          if( ! element.id ) element.id = `view_element_${elements.length+1}`
          elements.push( { id : element.id, element : element } )
        }

        return element

      },

    //...........................................................................

    set = function( _element, content ){
      if( typeof _element === 'string' ) _element = element( _element )

      if( typeof content === 'object' ) {
        if(utils.isElement(content))_element.appendChild( content )
      }else if(typeof content === 'string'){
        _element.innerHTML = content
      }
      return _element
    },

    //...........................................................................

    txt = function( _element, txt ){
      txt = document.createTextNode( txt )
      element( _element ).appendChild( txt )
      return _element
    },

    //...........................................................................

    attr = function( _element, attributes ){
      const properties = Object.getOwnPropertyNames(attributes)
      for( let attribute in properties ){
          _element.setAttribute(
            properties[ attribute ],
            Object.values( attributes )[ attribute ]
          )

      }
      return _element
    },

    //...........................................................................

    add = function( parent, _element, attributes, content ){

      if( typeof parent === 'string' ) parent = element( parent );
      if( typeof _element === 'string' ) _element = document.createElement( _element )
      if( typeof attributes === 'object' ) _element = attr( _element , attributes )
      if( typeof attributes === 'string' ) content = attributes
      if( typeof content === 'string' ) txt( _element, content )
      parent.appendChild( _element )
      return _element
    }


    //...........................................................................
    // element prototypes
    //view.element.txt()
    element.prototype.txt = function( txt) {
      return txt( elements[elements.length].element, txt )
    }
    //view.element.add()
    element.prototype.add = function( _element, attributes, content ) {
      return add( elements[elements.length].element, _element, attributes, content )
    }
    //view.element.attr()
    element.prototype.attr = function( attributes ) {
      return attr( elements[elements.length].element, attributes )
    }
    return {
      elements : elements,
      element : element,
      get : get,
      add : add,
      set : set,
      txt : txt,
      attr : attr
    }
  })()
  // model
  const model = (function(){
   const data = {},
         components = [],
         load = (args) => {
           model.components = args.components
           for ( let item of model.components ){
             model.apiRequest({ api : args.api, endpoint : item.endpoint})
           }
         },

    //...........................................................................

         obj = utils.obj,

    //...........................................................................

         add = (data) => {
           for (let item in obj(data).properties)
             data[obj(data).properties[item]] = obj(data).values[item];
         },

     //...........................................................................

        get = (id , coll ) => data[ coll ].find( (item) => parseInt(item.id) === parseInt(id) ),

     //...........................................................................

         apiRequest = ( args, callback ) => {

           let xhr = new XMLHttpRequest()
           if( !args.type ) args[ 'type' ] = 'GET'
           if( !args.status ) args[ 'status' ] = 200

           xhr.addEventListener( 'load',  ( event ) => {
             if ( xhr.readyState === 4 && xhr.status === args.status ) {
               data[args.component] = JSON.parse(event.target.responseText)
               if(callback) callback( event, args )
             }
           })
           // xhr.open( args.type, `http://${application.apiBasePath()}${args.component}`, true )
           // console.log(application.apiBasePath())
           xhr.open( args.type, `http://${args.api}/${args.endpoint}`, true )
           //xhr.open( args.type, `http://localhost:8081/api/${args.component}`, true )
           xhr.send( args.data )
         }

    //...........................................................................

   return {
     data : data,
     components : components,
     get : get,
     load : load,
     apiRequest : apiRequest
   }
  })()
  // -----------------------------------------------------------------------------
  // controller
  const controller = (function(){

    const actions = [],
    events = [],

    action = (args)=>actions.push(args),
    //...........................................................................

    add = function( element, action, callback ){
      if( typeof element === 'string' ) element = view.element( element )
      events.push( { event : event, element : element, action : action } )
      element.addEventListener( action, ( event ) => {

        event.preventDefault()
        //event.stopPropagation();
        callback( event )
        receptor( event )
      })
    },
    //...........................................................................

    receptor = function(event) {
      const component = event.target.id; // id of element added to controller acts as trigger to component to receptor
      for (let action of actions) {
        if (action.component === component) action.do();
      }
    },

    //...........................................................................

    component = function(element, event, action) {
      actions.push({ component: element.id, event : event, do: action });
    },

    //...........................................................................
    get = function(event){
      for( item of events ){
        if( item === event ) return item
      }
    }
    return {
      actions : actions,
      events : events,
      add : add,
      component : component
    }
  })()
  // UI
  const UI = ( function() {

    const make = tool.make
    const set = view.set
    const add = view.add

    return {

    //...........................................................................
      addComponent : (args) => {
        const create = (args) => make( [
          args.element,
          { id : args.id, class : args.class },
          args.html
        ])
        for( let component of args.components )  {
           this[args.fn] = () => {
             const element = create( args )
             if(args.callback) args.callback(element)
             return element
           }
        }
      },
      //...........................................................................
      overviewTable : (args) => {
        if( ! args.data ) console.error('UI.overview : args.data is undefined');
        const overviewTable = make( [
          'table', { id : `overview_${args.component}`, class : 'table' }
        ] ),
        overviewHeader = make( [ 'thead' ] ),
        overviewHeaderRow = make( [ 'tr' ] ),
        overviewBody = make( [ 'tbody' ] ),
        overviewTitle = make( [ 'h2', `${args.data.length} ${args.title}` ] );

        args.fields = utils.obj(args.fields);
        for( let header of args.fields.properties) set( overviewHeaderRow, make( [ 'th', header ]) );
        set( overviewTable,
          set( overviewHeader, overviewHeaderRow )
        );

        for( let entry of args.data ){
          let overviewRow = make( [ 'tr', { id : entry.id } ] );
          if( args.controller ) controller.add(overviewRow,'click',args.controller)
          for( let item of args.fields.values){
            let overviewRowField = make( [ 'td'] )
            add( overviewRow,
              set( overviewRowField, item(entry) )
            );
          }
          add( overviewBody, overviewRow )
        }

        set( args.target, '')
        set( args.target, overviewTitle )
        set( args.target,
          set( overviewTable, overviewBody )
        )
        if(args.callback) args.callback()
      },

    //...........................................................................

      createForm : (args) => {
        const createForm = make( [
          'form', { id : `create_form_ ${args.component}`}
        ] ),
        createTitle = make( [ 'h2', `Add item` ] );
        args.fields = utils.obj(args.fields);
        if( args.controller ) controller.add(createForm,'submit',args.controller)
      },
    //...........................................................................

      update : (args) =>{

      },
    //...........................................................................

      delete : (args) =>{

      }

    }
  })()
  window['UI'] = UI
  /*
  * application
  */
  const application = (function(){

    let applicationModule,applicationObj,config,main,menu,moduleNames,moduleFunctions,filePath,loadEvent;

    const obj = utils.obj
    const element = view.element
    const add = view.add

    const route = (config) => config.route ? config.route : location.hash.slice(1).split('/'),
    //...........................................................................

    load = (event) => {
      const thisApp = applicationModule
      const thisRoute = route(thisApp.config)
      const endpoint = thisRoute[0] ? thisRoute[0] : thisApp.config.default
      thisRoute[1]
        ? thisApp[endpoint]()[thisRoute[1]](thisRoute[2])
        : thisApp[endpoint]().default()
    },

    //...........................................................................

    nav = () => {
      for( let item of moduleNames){
        if( applicationModule[ item ].label ){
          let menuItem = view.add( menu, "li",{ id : item })
          const prefix = applicationModule.config.navMenuItemPrefix ? applicationModule.config.navMenuItemPrefix : '#'
          view.add( menuItem, "a", { href : `${prefix}${item}`}, applicationModule[ item ].label)
        }
      }
    },

    //...........................................................................

    init = ( application ) => {
      applicationModule = application;
      applicationObj = obj(application);
      console.log(this)
      this.config = applicationModule.config;
      model.load(config)
      main = element(config.main);
      menu = element(config.menu);
      //apiBasePath = config.apiBasePath;
      moduleNames = applicationObj.properties;
      moduleFunctions = applicationObj.values;
      if(menu) nav()
      config.loadEvent
      ? loadEvent = config.loadEvent
      : loadEvent = 'hashchange'
      controller.add( window, loadEvent, (event) => load(event) );
      controller.add( window, 'load', (event) => load(event) )

    },

    //...........................................................................

    call = ( exc, fn, args ) => {
      if(!args.target) args['target'] = applicationModule.config.main;
      args['data'] = model.data[args.component]
      args['config'] = applicationModule.config
      callbefore( exc, fn, args.target )
      if(typeof exc === 'string'){
        window[exc][fn](args)
      }else if( typeof exc === 'function' ){
        fn ? exc()[fn](args) : exc(fn)
      }
      callback( exc, fn )
    },

    //...........................................................................
    hooks = {},
    exc = ( exc ) =>  {
      exc = typeof exc === 'function' ? /function ([^(]*)/.exec( exc+'' )[1] : exc
      return exc
    },
    before = ( exc, fn, before ) => {
      exc = exc(exc)
      fn ? hooks[ `before:${exc}.${fn}` ] = before : hooks[ `before:${exc}` ] = fn
    },
    hook = ( exc, fn, hook) => {
      exc = exc(exc)
      fn ? hooks[ `${exc}.${fn}` ] = hook : hooks[ exc ] = fn
    },
    //...........................................................................
    callbefore = (exc, fn ,target ) => {
      if( typeof exc === 'function' ) exc = /function ([^(]*)/.exec( exc+'' )[1]
      if( hooks[`before:${exc}.${fn}`] ) hooks[`before:${exc}.${fn}`]()
    },
    callback = ( exc, fn ) => {
      if( typeof exc === 'function' ) exc = /function ([^(]*)/.exec( exc+'' )[1]
      if( fn && hooks[`${exc}.${fn}`] ) {
        hooks[`${exc}.${fn}`]()
      }else if( hooks[exc]){
        hooks[exc]()
      }
    }



    return {
      route : route,
      config : config,
      init : init,
      call : call,
      hooks : hooks,
      before : before,
      hook : hook,
      callbefore : callbefore,
      callback : callback
    }
  })()
  // client
  const client = (function(){

    function xhr( args ){
      if(typeof args === 'string') args = { url : args }
      const xmlhttp = new XMLHttpRequest();
      if( !args.method ) args[ 'method' ] = 'GET';
      if( !args.status ) args[ 'status' ] = 200;
      xmlhttp.open( args.method, args.url, true );
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      if(args.data) args.data = JSON.stringify(args.data)
      xmlhttp.addEventListener( 'load',  ( event ) => {
        if( xmlhttp.readyState === 4 && xmlhttp.status === args.status ) {
          if(args.callback) args.callback(event);
        }
      });
      xmlhttp.send( args.data );

    }

    function xhrp( args ) {
      if( !args ) args = {}
      if( !args.type ) args[ 'type' ] = 'GET'
      if( !args.status ) args[ 'status' ] = 200
      return new Promise( ( resolve, reject ) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open( args.type, args.url );
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = ( event ) => xmlhttp.status === args.status ? resolve( event ) : reject( Error( event ) )
        xmlhttp.send( args.data );
      });
    }
    const request = {}


    const apiRoutes = ( config ) => {
      const url = `http://${config.server}/${config.api}/`
      const args = {
        url : `${url}routes`,
        callback : setRoutes
      }
      xhr(args)

    }
    const setRequest = (item,method) => {
      // request.[route].[method](args)
      /*
      request.products.getAll({ callback : (event) => {
        	console.log( event.target.responseText )
        }
      })
      */
      request[item.route][method] = (args)=> {
        if(method==='post') args = { url : `${url}${item.route}`, data : args.data,method: 'POST',status : 201, callback : args.callback}
        if(method==='get') args = { url : `${url}${item.route}}/${args.id}`, callback : args.callback}
        if(method==='getAll') args = { url : `${url}${item.route}}`, callback : args.callback}
        if(method==='put') args = {data : args.data,url : `${url}${item.route}/${args.id}`,method: 'PUT',status : 201}
        if(method==='delete') args = {url : `${url}${item.route}/${args.id}`,method: 'DELETE',status : 201}
        xhr(args)
      }
    }
    const setRoutes = (event) => {
      const routes = JSON.parse(event.target.responseText)
      for( let item of routes ){
        for( let method of item.methods) setRequest(item,method)
        let module = item.route
        if( config.application[ module ]) {
          // provided application has module which matches with route from api


        }
      }
    }
    return {
      api : apiRoutes,
      request : request
    }


  })()

//});
