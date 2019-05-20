/*
* assets/js/modules/rehearsals.js
*/
'use strict'
const repetitions = (function(){
  const main = function() {
    agendamanager.initPage()
  }
  return {
    name : 'Repetitions',
    color : 'rgb(142, 124, 195)',
    default : main
  }
})();
