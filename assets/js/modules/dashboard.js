/*
* assets/js/modules/dashboard.js
*/
'use strict'
const dashboard = (function(){
  const main = function() {
    agendamanager.initPage(()=> {
      console.log(view.element('#dashboardBadges').innerHTML);
    });
    //console.log(view.element('#dashboardBadges').innerHTML);
  }

  return {
    name : 'Dashboard',
    default : main,
    template : 'dashboard'
  }

})();
