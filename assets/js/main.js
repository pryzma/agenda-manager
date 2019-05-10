/*
* assets/js/main.js
*/
'use strict'
const main = (function(){
  requirejs([
    'application-client.0.10.7',
    'agendamanager'
  ],()=>{
    application.init(agendamanager);
  });
})();
