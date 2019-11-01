/*
* assets/js/modules/dashboard.js
*/
'use strict'

const dashboard = (function(){

  const main = function() {
  
      dashboardBadges();

  }
  
  const dashboardBadges = function(){
    const modulesObjArr = [];
    for(let module of application.config.menu){
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
  const ws = (() => {
    return {
      name : `WebSocket Client`,
      default : () => { 

        const wsConnection = application.wsConnection;
        
        $('#amModalSave').html('Send Message').on('click',(event)=>{
          const message = $('#message').val();
          wsConnection.send(message);
          $('#message').val('');
        })
        //$('#amModalBody').html();
       
        helper.modal({
          title : `WebSocket Client`,
          body: '<div id="messages"></div><textarea id="message" class="form-control"></textarea>'
        });
        $('#messages').before(`<div class="text-muted">Connected as <span class="Inconsolata">${wsConnection.client}</span></div>`)
       
        wsConnection.onmessage = function(event) {
          const data = JSON.parse(event.data)
          let res = ''
          for(let item of data){
            res += `<div><div>${item.utf8Data}</div> <small class="text-muted">from <span class="Inconsolata">${item.from}</span> on ${item.date}</small></div>`
          }
          $('#amModalBody #messages').html(res)
        
        }
      }
    }
  })()
  
  application.add('dashboard',{
    name : 'Dashboard',
    default : main,
    ws : ws,
    template : 'dashboard',
    templateEngine : 'ejs'
  })

})();
