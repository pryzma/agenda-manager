/*
* assets/js/modules/profiles.js
*/
'use strict'
const profiles = (function(){
  const main = function(){
    // Main function, place functions related to the profiles page here
    console.log('This is main');
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
    })
  }
  const add = function(){
    console.log(' This is add')
    return{
      name : 'Create Profile'
    }
  }
  application.add('profiles',{
    name : 'Profiles',
    color : 'rgb(118, 165, 175)',
    default : main,
    add : add
  })
})();
