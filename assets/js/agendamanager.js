/*
* assets/js/demo.js
*/
'use strict'
const agendamanager = (function(){
    // setup gestures with Hammer
    const hammerEnv = new Hammer(myElement, myOptions);
    hammerEnv.on('swipe', function(ev) {
        console.log('We have a swipe event!');
    });
    // setup model with Backbone
    const Model = Backbone.Model.extend();
    // setup requireCallback
    application.requireCallback = () => {
        //console.log('is fired when required from config.json')
    }

    return {
        gestures : hammerEnv,
        model : Model
       
    }
})()