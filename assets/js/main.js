/*
* assets/js/main.js
*/
'use strict'
const main = (function(){
  requirejs([
    'application',
    'modules/dashboard',
    'modules/options',
    'modules/shows',
    'modules/blockdates',
    'modules/profiles',
    'modules/rehearsals',
    'agendamanager'
  ],()=>{
    application.init(agendamanager);
  });
})();
