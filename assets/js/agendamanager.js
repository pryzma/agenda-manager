/*
* assets/js/demo.js
*/
'use strict'
const agendamanager = (function(){
    // setup gestures with Hammer
    const bodyElement = $('body');
    const gestureOptions = {}

    const Accounts = Backbone.Collection.extend({
        url: '/api/accounts'
      });
    // setup requireCallback
    application.requireCallback = () => {
        //console.log('is fired when required from config.json')
    }

    return {
        
        accounts : Accounts
    }
})()
