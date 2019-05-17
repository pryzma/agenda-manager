/*
* assets/js/modules/dashboard.js
*/
'use strict'
const dashboard = (function(){

  const dashboardBadges = function(){
    const card = $('#dashboardBadges').html(); // get card from template
    $('#dashboardBadges').html(''); // clear template div
    for(let module of agendamanager.modules()){ // append card for each module
      let addCard = card.replace('{title}',  application.object()[module].name )
      addCard = addCard.replace('{id}',module )
      addCard = addCard.replace('{addBtnLink}',`#${module}/add` )
      addCard = addCard.replace('{addBtnTxt}',application.object()[module].name.substring(0, application.object()[module].name.length-1) )

      $('#dashboardBadges').append(addCard)
      $(`#card_${module} .card-title`).attr('style',`color:${application.object()[module].color};`)
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
