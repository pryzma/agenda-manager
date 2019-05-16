
/*
* assets/js/agendamanager.js
*/
'use strict'
const agendamanager = (function(){
  const config = {
    main : 'section#mainContent',
    nav : 'nav#headerNav',
    default : 'dashboard'
  }
  // callback is loaded after application & module is loaded
  const callback = function(){
    const applicationObj = application.object(); // application & modules object
    const applicationRoute = application.route(); // current route
    const getModuleName = (route) => applicationObj[route].name
    const getTemplate = (route) => applicationObj[route].template ? applicationObj[route].template : 'pageLayout'
    const loadPage = function(route){
      let template = getTemplate(route);
      $(config.main).load(`html/templates/${template}.html`,function(){
        $(`#${template} h2`).html(getModuleName(route));
      });
    }
    const initPage = function(route){
      // set current nav item as active on hashchange
      updateNav( route );

      // set page title
      setPageTitle( route );

      // load page
      loadPage( route );
    }



    const updateNav = function(route){
      $(`${config.nav} a`).removeClass('active');
      ( route === '') ?
      $(`${config.nav} li#${config.default} a`).addClass('active')
      : $(`${config.nav} li#${applicationRoute[0]} a`).addClass('active');
    }
    const setPageTitle = function( route ){
      let pageTitle = ( route === '') ?
      `${applicationObj.name}`
      : `${applicationObj.name} ${getModuleName(route)}`

      $('title').html(pageTitle)
    }
    // set default nav item as active
    $( `${config.nav} li#${config.default} a` ).addClass('active');
    
    initPage( applicationRoute[0] );
    $( window ).on('hashchange',function(event){
      initPage(applicationRoute[0])
    });

  }

  return {
    config : config,
    name : 'Agenda Manager',
    callback : callback,
    // modules
    dashboard : dashboard,
    options : options,
    shows : shows,
    blockdates : blockdates,
    profiles : profiles,
    rehearsals : rehearsals
  }

})();
