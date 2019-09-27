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
    $.ajax({url: '/status'}).statusCode({ 403 : function(){ 
        // no activesession generates 403 @ /status route; reload page to get /signin
        location.reload()
    }}).fail(function(){
        $('#serverConnectionLost').modal()
    });
    
}