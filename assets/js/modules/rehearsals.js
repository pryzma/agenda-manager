/*
* assets/js/modules/rehearsals.js
*/
'use strict'
const rehearsals = (function(){
  const main = function() {
    agendamanager.initPage()
  }
  return {
    name : 'Rehearsals',
    color : 'rgb(142, 124, 195)',
    default : main
  }
})();
