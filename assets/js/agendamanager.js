
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
  // set current nav item as active
  const navDefault = document.querySelector(`${config.nav}`)
  console.log(`li#${config.default} a`)
  console.log(navDefault)

  //$( document.querySelector(`li#${config.default} a`) ).addClass('active');
  $( window ).on('hashchange',function(event){
    $(`${config.nav} a`).removeClass('active');
    ( application.route()[0] === '') ?
    $(`${config.nav} li#${config.default} a`).addClass('active')
    : $(`${config.nav} li#${application.route()[0]} a`).addClass('active');


  });

  return {
    config : config,
    name : 'Agenda Manager',
    dashboard : dashboard,
    options : options,
    shows : shows,
    blockdates : blockdates,
    profiles : profiles,
    repetitions : repetitions
  }

})();
