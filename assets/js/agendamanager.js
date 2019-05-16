
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
  const callback = function(){
    const applicationObj = application.object();
    const applicationRoute = application.route();
    // set default nav item as active
    $( `${config.nav} li#${config.default} a` ).addClass('active');
    $( window ).on('hashchange',function(event){
      // set current nav item as active on hashchange
      $(`${config.nav} a`).removeClass('active');
      ( applicationRoute[0] === '') ?
      $(`${config.nav} li#${config.default} a`).addClass('active')
      : $(`${config.nav} li#${applicationRoute[0]} a`).addClass('active');

      // set page title
      let pageTitle = ( applicationRoute[0] === '') ?
      `${applicationObj.name}`
      : `${applicationObj.name} ${applicationObj[applicationRoute[0]].name}`

      $('title').html(pageTitle)
      
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
    repetitions : repetitions
  }

})();
