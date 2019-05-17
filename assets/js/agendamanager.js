/*
* assets/js/agendamanager.js
*/
'use strict';
const agendamanager = (function() {
  const config = {
    main : 'section#mainContent',
    nav : 'nav#headerNav',
    default : 'dashboard'
  }

  const applicationObj = () => application.object(); // application & modules object
  const applicationRoute = () => application.route(); // current route
  const getModuleName = (route) => applicationObj()[route].name // current module name
  // get template for current module
  const getTemplate = (route) => applicationObj()[route].template ? applicationObj()[route].template : 'pageLayout'

  const initPage = function(route,callback) {
    if(typeof route === 'function' ) {
      callback = route;
      route = applicationRoute()[0]
    }
    if(!route) route = applicationRoute()[0]

    // set current nav item as active
    updateNav( route );
    // set page title
    setPageTitle( route );
    // load page
    loadPage( route, callback );

  }

  // set default nav item as active
  $( `${config.nav} li#${config.default} a` ).addClass('active');
  // set selected nav item as active
  const updateNav = function(route) {

    $(`${config.nav} a`).removeClass('active');
    ( route === '') ?
    $(`${config.nav} li#${config.default} a`).addClass('active')
    : $(`${config.nav} li#${applicationRoute()[0]} a`).addClass('active');

  }
  // set page title with application and module name
  const setPageTitle = function( route ) {
    
    if(route === '') route = config.default;
    let pageTitle = ( route === '') ?
    applicationObj().name
    : `${getModuleName(route)} - ${applicationObj().name}`;

    $('title').html(pageTitle);
  }
  // load template html file
  const loadPage = function( route, callback ) {

    if(route === '') route = config.default;
    console.log(`loadPage : ${route}`)
    let template = getTemplate(route);
    $(config.main).load(`html/templates/${template}.html`,function() {
      $(`#${template} h2`).html(getModuleName(route));
      if(callback) callback();
    });

  }

  // init is loaded once when the application is loaded
  const init = function() {
    for(let module of Object.getOwnPropertyNames(applicationObj())){
      // attach initPage as callbefore for each module
      //if(applicationObj()[module].name) agendamanager[ module ][ 'callbefore' ] = initPage
    }
  }


  return {
    config : config,
    name : 'Agenda Manager',
    init : init,
    initPage : initPage,
    // modules
    dashboard : dashboard,
    shows : shows,
    options : options,
    rehearsals : rehearsals,
    blockdates : blockdates,
    profiles : profiles
  }

})();
