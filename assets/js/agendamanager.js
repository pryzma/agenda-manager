/*
* assets/js/agendamanager.js
*/
'use strict';
const agendamanager = (function() {
  const config = {
    main : 'section#mainContent',
    nav : 'nav#headerNav',
    default : 'dashboard',
    template : 'pageLayout'
  }

  const applicationObj = () => application.object(); // application & modules object
  const applicationRoute = () => application.route(); // current route
  const getModuleName = (route) => applicationObj()[route].name // current module name
  // get template for current module
  const getTemplate = (route) =>
    applicationObj()[route].template ?
    applicationObj()[route].template
    : config.template
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

  const initPage = function(route,callback) {
    if(typeof route === 'function' ) {
      callback = route; // route argument as callback
      route = applicationRoute()[0]
    }
    if(!route) route = applicationRoute()[0] // get current route if route not provided

    updateNav( route ); // set active nav item
    setPageTitle( route ); // set page title
    loadPage( route, callback );  // load template, display page (callback to module)
  }

  // set default nav item as active
  $( `${config.nav} li#${config.default} a` ).addClass('active');

  const updateNav = function(route) { // set active nav item

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
    let pageTitle = ( route === '') ?
    applicationObj().name
    : `${getModuleName(route)} - ${applicationObj().name}`;

    $('title').html(pageTitle);
  }

  const loadPage = function( route, callback ) { // load template html, display page (callback to module)

    if(route === '') route = config.default; // get default route if route not provided
    //console.log(`loadPage : ${route}`)
    let template = getTemplate(route); // get default or module template
    $(config.main).fadeOut(400,() => { // page transition out
      $(config.main).load(`html/templates/${template}.html`,function() { // load template file
        $(`#${template} h2`).html(getModuleName(route)); // set template header title
        if(callback) callback(); // callback (module)
        $(config.main).fadeIn(); // page transition in
      });
    });


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
    // modules
    dashboard : dashboard,
    shows : shows,
    options : options,
    repetitions : repetitions,
    blockdates : blockdates,
    profiles : profiles
  }

})();
