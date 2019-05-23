/*
* assets/js/main.js
*/
'use strict'
const main = (function(){
  requirejs([
    'application',
    'modules/dashboard',
    'modules/shows',
    'modules/options',
    //'modules/repetitions',
    'modules/rehearsals',
    'modules/blockdates',
    'modules/profiles',
    'agendamanager'
  ],()=> {
    //try{
      application.init(agendamanager);
    //}catch(error){
    //  if(agendamanager.config.reloadOnError) location.reload();
    //}

  });
})();
