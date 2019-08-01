/*
* assets/js/modules/profiles.js
*/
'use strict'
const addProfile = function(){
  if(agendamanager.accounts){ //accounts collection
    application.controller('submit','#addProfile form',function(event){
      const addProfileForm = new FormData(event.target)
      console.log(addProfileForm)
      fetch('/api/profiles',{
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addProfileForm)
      });
    });
  }
}
const profiles = (function(){
  const main = function(){
   
  }
  const add = { 
    default : addProfile,
    name : 'Create Profile',
    template : 'addProfile'
  }
  application.add('profiles',{
    name : 'Profiles',
    color : 'rgb(118, 165, 175)',
    default : main,
    add : add
  })
})();
