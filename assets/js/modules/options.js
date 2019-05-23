/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){
  const main = function(){
    agendamanager.initPage()
  }
  const add = function(){
    agendamanager.initPage(()=>{
      $(agendamanager.config.main).html('This is add option')
    })
  }
  return {
    name : 'Options',
    color : 'rgb(224, 102, 102)',
    default : main,
    add : add
  }
})();
