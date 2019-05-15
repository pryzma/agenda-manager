
/*
* assets/js/agendamanager.js
*/
'use strict'
const agendamanager = (function(){
  return {
    config : {
      main : 'section#mainContent',
      nav : 'nav#headerNav',
      default : 'dashboard'
    },
    name : 'Agenda Manager',
    dashboard : dashboard,
    options : options,
    shows : shows,
    blockdates : blockdates,
    profiles : profiles,
    repetitions : repetitions
  }
})();
