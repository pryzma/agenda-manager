/*
* assets/js/modules/dashboard.js
*/
'use strict'
const dashboard = (function(){

  const dashboardBadges = function(){
    const card = $('#dashboardBadges').html();
    $('#dashboardBadges').html('');
    for(let module of agendamanager.modules()){
      let addCard = card.replace('{title}',  application.object()[module].name )
      addCard = addCard.replace('{addBtnLink}',`#${module}/add` )
      addCard = addCard.replace('{addBtnTxt}',application.object()[module].name.substring(0, application.object()[module].name.length-1) )
      $('#dashboardBadges').append(addCard)
    }
  }

  const main = function() {
    agendamanager.initPage(()=> {
      dashboardBadges();
    });
    //console.log(view.element('#dashboardBadges').innerHTML);
  }

  return {
    name : 'Dashboard',
    default : main,
    template : 'dashboard'
  }

})();
