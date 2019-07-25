/*
* assets/js/modules/profiles.js
*/
'use strict'
const addProfile = function(){
  
  if(agendamanager.accounts){ //accounts collection
    application.controller('click','btn#addProfile',function(event){

    });
  }
}
const profiles = (function(){
  const main = function(){
    console.log('This is main');
    /*
    
    $('#submitEmail').click(function () {

      let email = $('#email').val();
      console.log(email)
      fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })
        .then((res) => res.json());
    }) */
  }
  const add = {
    default : function(){
      console.log(' This is add');
      const email = $('#email').val();
      application.controller('click','#submitEmail',function(event){
        agendamanager.accounts
          .create({ email: email })
          .then((res) => res.json());
      });
    },
    name : 'Add Profile'
  }
  application.add('profiles',{
    name : 'Profiles',
    color : 'rgb(118, 165, 175)',
    default : main,
    add : add
  })
})();
