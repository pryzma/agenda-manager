/*
* assets/js/agendamanager.js
*/
'use strict';
const agendamanager = (function() {
  const config = {
    main : 'section#mainContent',
    nav : 'nav#headerNav',
    default : 'dashboard',
    template : 'pageLayout',
    debug : true,
    reloadOnError : true
  }

  const applicationObj = () => application.object(); // application & modules object
  const applicationRoute = () => application.route(); // current route
  const getModuleName = (route) => applicationObj()[route].name;// current module name
  // get template for current module
  const getTemplateName = (route) =>
    applicationObj()[route].template ?
    applicationObj()[route].template
    : config.template;

  const getModules = function(){ // returns array with modules
    const arrModules = [];
    for(let module of Object.getOwnPropertyNames(applicationObj())){
      // check if application object property is module; exclude default module
      if(applicationObj()[module].default && applicationObj()[module].name && module != config.default){
        arrModules.push( module );
      }
    }
    return arrModules;
  }
  let currentPage
  const initPage = function(route,callback) {

    if(typeof route === 'function' ) {
      callback = route; // route argument as callback
      route = applicationRoute()[0]
    }
    if(!route) route = applicationRoute()[0] // get current route if route not provided
    //if(!route===currentPage){
      if(config.debug) console.log(`initPage : ${route}`);
      updateNav( route ); // set active nav item
      setPageTitle( route ); // set page title
      loadPage( route, callback );  // load template, display page (callback to module)
      currentPage = route;
    //}

  }

  // set default nav item as active
  $( `${config.nav} li#${config.default} a` ).addClass('active');

  const updateNav = function(route) { // set active nav item
    if(config.debug) console.log(`updateNav : ${route}`);
    $(`${config.nav} a`).removeClass('active').attr('style','');
    ( route === '') ?
    $(`${config.nav} li#${config.default} a`).addClass('active')
    : $(`${config.nav} li#${applicationRoute()[0]} a`)
      .addClass('active')
      .attr(
        'style',
        // set top border color of active nav item
        `border-top: 3px solid ${applicationObj()[applicationRoute()[0]].color}`
      );

  }

  const setPageTitle = function( route ) {  // set page title with application and module name

    if(route === '') route = config.default;
    if(config.debug) console.log(`setPageTitle : ${route}`);
    let pageTitle = ( route === '') ?
    applicationObj().name
    : `${getModuleName(route)} - ${applicationObj().name}`;

    $('title').html(pageTitle);
  }

  const loadPage = function( route, callback ) { // load template html, display page (callback to module)

    if(route === '') route = config.default; // get default route if route not provided
    if(config.debug) console.log(`loadPage : ${route}`);
    //console.log(`loadPage : ${route}`)
    let template = getTemplateName(route); // get default or module template
    $(config.main).fadeOut(400,() => { // page transition out
      $(config.main).load(`html/templates/${template}.html`,function() { // load template file
        $(`#${template} h2`).html(getModuleName(route)); // set template header title
        if(callback) callback(); // callback (module)
        $(config.main).fadeIn(); // page transition in
      });
    });


  }
  // ...........................................................................

  const showModal = function(args){
    const template = args.template ? args.template : 'modal'; // get template
    args[ 'template' ] = template
    template = getTemplate(args); /*
    // load template file if element does not exist
    if( ! $(`#${template}`) ) $('#modalContainer').load(`html/templates/${template}.html`);
    // get items from arguments object & set values
    const items = Object.getOwnPropertyNames(args);
    for(let item of items){
      $(`#${template} .${item}`).html(args[item]);
    }
    */
    template.modal();
    if(args.onclose) template.on('hidden.bs.modal', args.onclose());
    if(args.callback) args.callback();
  }

  const getTemplate = function(args){

      const template = args.template ? args.template : args;
      const target = args.target ? args.target : config.main;
      if( ! $(`#${template}`) ) $(target).load(`html/templates/${template}.html`);
      const items = Object.getOwnPropertyNames(args);
      for(let item of items){
        $(`#${template} .${item}`).html(args[item]);
      }
      if(args.callback) args.callback();
      return $(`#${template}`);
  }
  /*
  //  attempt to attach initPage to each module instance;
  // (initPage is now called from each module instead)
  // init is loaded once when the application is loaded
  // callbefore method is executed before module is excuted in application.load;

  const init = function() {
    for(let module of Object.getOwnPropertyNames(applicationObj())){
      // attach initPage as callbefore for each module
      if(applicationObj()[module].name) agendamanager[ module ][ 'callbefore' ] = initPage
    }
  }
  */

  return {
    config : config,
    name :  'Agenda Manager',
    //init : init,
    initPage : initPage,
    modules : getModules,
    modal : showModal,
    template : getTemplate,
    // modules
    dashboard : dashboard,
    shows : shows,
    options : options,
    //repetitions : repetitions,
    rehearsals : rehearsals,
    blockdates : blockdates,
    profiles : profiles
  }

})();
