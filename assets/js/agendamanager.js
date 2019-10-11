/*
* assets/js/agendamanager.js
*/
'use strict'
const agendamanager = (function(){
    //setInterval(serverStatus, 3000); // check status every 3s
    
    if ('WebSocket' in window){
        const wsConnection = new WebSocket('ws://127.0.0.1:8080/');
        // websocket connection is open
        wsConnection.onopen = function(){
            //wsConnection.send("Hello server!");
            //if(!wsConnection.readyState) location.reload();
        }
        // websocket connection is closed
        wsConnection.onclose = function(){
            $('#serverConnectionLost').modal()
            // check every 3s if server is alive again
            setInterval(serverStatus, 3000); 
         } // TODO : 403 status
         wsConnection.onmessage = function(event) {
             const data = JSON.parse(event.data)
             
             if(!data.status) helper.modal({title:data.title,body:data.body})
         }
         application.wsConnection = wsConnection
    }
    const agendamanagerObj = {};
    // requires application-backbone
    //agendamanagerObj.view = application.backbone.view;
    //agendamanagerObj.model = application.backbone.model;
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