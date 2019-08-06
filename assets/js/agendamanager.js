/*
* assets/js/agendamanager.js
*/
'use strict'
const agendamanager = (function(){
    setInterval(checkLogin, 3000); // check login every 3s
    
    const agendamanagerObj = {};
    // requires application-backbone
    agendamanagerObj.view = application.backbone.view;
    agendamanagerObj.model = application.backbone.model;
    // requires application-ejs
    agendamanagerObj.render = application.ejs 
    return agendamanagerObj;
})();
function checkLogin(){
    $.ajax({url: '/api/accounts'}).statusCode({ 403 : function(){ 
        // no active user session generates 403 @/api/accounts; reload page to get /signin
        location.reload()
    }});
    
}