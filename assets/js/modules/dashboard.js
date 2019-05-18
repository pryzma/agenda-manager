/*
* assets/js/modules/dashboard.js
*/
'use strict'
const dashboard = (function(){

  const dashboardBadges = function(){
    const badgeContainer = $('#dashboardBadges');
    const badge = badgeContainer.html(); // get template html
    badgeContainer.html(''); // clear template div
    // loop through modules
    for(let module of agendamanager.modules()){

      let dashboardBadge = badge;
      // replace values for each badge
      dashboardBadge = dashboardBadge.replace(
        '{title}',
        application.object()[module].name
      );
      dashboardBadge = dashboardBadge.replace('{id}', module );
      dashboardBadge = dashboardBadge.replace(
        '{addBtnLink}',
        `#${module}/add` // add button link
      );
      dashboardBadge = dashboardBadge.replace(
        '{addBtnTxt}',
        // strip last character of string (s)
        application.object()[module].name.substring(
          0, application.object()[module].name.length-1
        )
      );
      // append modified badge
      badgeContainer.append(dashboardBadge);
      $(`#badge_${module} .card-title`).attr(
        // set color of badge title
        'style',`color:${application.object()[module].color};`
      );
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
