/*
* assets/js/agendamanager.js
*/
'use strict'
const agendamanager = (function(){
    
    
    const Accounts = Backbone.Collection.extend({
        url: '/api/accounts'
      });
    // setup requireCallback
    application.requireCallback = () => {
        //console.log('is fired when required from config.json')
    }

    return {
        view : view,
        accounts : Accounts
    }
})()
