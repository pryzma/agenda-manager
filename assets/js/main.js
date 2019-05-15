/*
* assets/js/main.js
*/
'use strict'
const main = (function(){
  requirejs([
    'application.min',
    'modules/dashboard',
    'modules/options',
    'modules/shows',
    'modules/blockdates',
    'modules/profiles',
    'modules/repetitions',
    'agendamanager'
  ],()=>{
    application.init(agendamanager);
  });
})();
