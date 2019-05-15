/*
* assets/js/agendmanager.js
*/
'use strict'
const agendamanager = (function(){
  return {
    config : {
      main : 'section#mainContent',
      nav : 'nav#headerNav',
      default : 'dashboard'
    },
    dashboard : dashboard,
    options : options,
    shows : shows,
    blockdates : blockdates,
    profiles : profiles,
    repetitions : repetitions
  }
})();
