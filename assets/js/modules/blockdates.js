/*
* assets/js/modules/blockdates.js
*/
'use strict';
const blockdates = (function() {
  const main = function() {
    agendamanager.initPage(()=>{
      console.log(utils.occurence($('#pageLayout p').html(),'TV'))
    });
  }
  return {
    name: 'Block Dates',
    default : main
  }
})();

