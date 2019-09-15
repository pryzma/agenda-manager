/*
* assets/js/modules/profiles.js
*/
'use strict'

const addProfile = function(){
    new Vue({
      el : '#addProfile',
      data() {
        return {
          firstName: '',
          lastName: '',
          email: ''
        };
    },
      methods: {
        submit : function(e) {
          e.preventDefault();
          let currentObj = this;
          console.log(e.target)
          const form = document.querySelector('form'),
          formData = new FormData(form)
          axios.post('api/accounts', formData)
          .then(function (response) {
            
            currentObj.output = response.data;
            console.log(response.data)
           })
          .catch(function (error) {
            currentObj.output = error;
            console.log(error)
          });

        }
      }
    })
    //axios.post('api/accounts',addProfileFormData).then(function(res){
     // addProfileForm.innerHTML = `Account ${res.firstName} ${res.lastName} is created; a verification e-mail has been sent to ${res.email}`
    //});
  }

  
  /*
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
  */

//}

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
