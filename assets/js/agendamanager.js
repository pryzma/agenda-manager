/*
* assets/js/agendamanager.js
*/
'use strict'
const agendamanager = (function(){
    const agendamanagerObj = {};
    // requires application-backbone
    agendamanagerObj.view = application.backbone.view;
    agendamanagerObj.model = application.backbone.model;
    // requires application-ejs
    agendamanagerObj.render = application.ejs 
    return agendamanagerObj;
})();
