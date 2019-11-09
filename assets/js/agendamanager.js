/*
* assets/js/agendamanager.js
*/
//import websocket from './websocket'
'use strict'
const agendamanager = (function(){
    //setInterval(serverStatus, 3000); // check status every 3s
    
    if(websocket){
        websocket({ // websocket connection
            onclose : () => { // server has closed connection
                $('#serverConnectionLost').modal()
                // check every 3s if server is alive again
                setInterval(serverStatus, 3000); 
            }
        });
    }
    const agendamanagerObj = new Object;
    
    
    // require application-backbone
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
