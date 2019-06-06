/*
* assets/js/modules/dashboard.js
*/
'use strict'
const dashboard = (function(){

  const main = function() {

      dashboardBadges();

    //console.log(view.element('#dashboardBadges').innerHTML);
  }

  const dashboardBadges = function(){
    const badgeContainer = $('#dashboardBadges');
    const badge = badgeContainer.html(); // get template html
    badgeContainer.html(''); // clear template div
    // loop through modules
    for(let module of application.modules()){
      if(module != 'dashboard'){
        let moduleObj = application.object[module]
        let dashboardBadge = badge;
        // replace values for each badge
        dashboardBadge = dashboardBadge.replace(
          '{title}',
          moduleObj.name
        );
        dashboardBadge = dashboardBadge.replace('{id}', module );
        dashboardBadge = dashboardBadge.replace(
          '{addBtnLink}',
          `#${module}/add` // add button link
        );
        dashboardBadge = dashboardBadge.replace(
          '{addBtnTxt}',moduleObj.name.substring(0, moduleObj.name.length-1)
        );


        // append modified badge
        badgeContainer.append(dashboardBadge);
        $(`#badge_${module}`).attr(
          'style',
          // set top border color of active nav item
          `border-top: 3px solid ${moduleObj.color};`
        );
        $(`#badge_${module} .card-title`).attr(
          // set color of badge title
          'style',`color:${moduleObj.color};`
        );
        // get badge body provided by module
        if(moduleObj.badge){
          if(typeof moduleObj.badge === 'object' ){

          } else {
            let badgeBody = (typeof moduleObj.badge === 'function') ?
            moduleObj.badge() : moduleObj.badge;
            $(`#badge_${module} .card-text`).html(badgeBody);
          }

        }
      }
    }
  }



  application.add('dashboard',{
    name : 'Dashboard',
    default : main,
    template : 'dashboard'
  })

})();
