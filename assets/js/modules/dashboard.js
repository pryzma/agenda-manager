/*
* assets/js/modules/dashboard.js
*/
'use strict'
const dashboard = (function(){

  const main = function() {
      if(agendamanager){
        agendamanager.view();
      }else{
        // reload if agendamanger object is undefined
        location.reload()
      }
      dashboardBadges();

    //console.log(view.element('#dashboardBadges').innerHTML);
  }
  

  const dashboardBadges = function(){
    const modulesObjArr = [];
    for(let module of application.modules()){
      let moduleObj = application.object[module],
      moduleBadge = typeof moduleObj.badge === 'function' ?  moduleObj.badge() : moduleObj.badge;
      if(module!='dashboard'){
        modulesObjArr.push({
          id : `badge_${module}`,
          name : moduleObj.name,
          btnLnk : `#${module}/add`,
          btnTxt : moduleObj.name.substring(0, moduleObj.name.length-1),
          badge : moduleBadge,
          cardStyle : `border-top: 3px solid ${ moduleObj.color }`,
          titleStyle : `color:${ moduleObj.color }`
        })
      }
    } 
  

    new Vue({
      el: '#dashboardBadges',
      data: {
        modules: modulesObjArr
      }
    });
    
  }



  application.add('dashboard',{
    name : 'Dashboard',
    default : main,
    template : 'dashboard',
    templateEngine : 'ejs'
  })

})();
