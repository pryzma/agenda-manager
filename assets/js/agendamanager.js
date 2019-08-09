/*
* assets/js/agendamanager.js
*/
'use strict'
const agendamanager = (function(){
    setInterval(serverStatus, 3000); // check login every 3s
    
    const agendamanagerObj = {};
    // requires application-backbone
    agendamanagerObj.view = application.backbone.view;
    agendamanagerObj.model = application.backbone.model;
    // requires application-ejs
    agendamanagerObj.render = application.ejs 
    application.agendamanager = agendamanagerObj;
    return agendamanagerObj;
})();
function serverStatus(){
    $.ajax({url: '/api/accounts'}).statusCode({ 200 : function(){
        // everything is OK
        $('#serverConnectionLost').modal('hide')
    }},{ 403 : function(){ 
        // no active user session generates 403 @/api/accounts; reload page to get /signin
        location.reload()
    }}, { 404 : function(){
        $('#serverConnectionLost').modal()
    }}).fail(function(){
        $('#serverConnectionLost').modal()
    });
    
}