/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){
  const main = function(){
    agendamanager.initPage()
  }
  const add = function(){
    agendamanager.initPage()
  }
  return {
    name : 'Options',
    default : main,
    add : add
  }
})();
