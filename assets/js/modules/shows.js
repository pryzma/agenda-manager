/*
* assets/js/modules/shows.js
*/
'use strict'
const shows = (function(){
  return {
    name : 'Shows',
    color : 'rgb(147, 196, 125)',
    default : () => agendamanager.initPage(),
    add : () => {
      $('#amModalTitle').html('Add Show')
      $('#amModal').modal()
      $('#amModal').on('hidden.bs.modal', function (e) {
         location.hash = '#dashboard'
      })
    }
  }
})();
