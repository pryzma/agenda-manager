/*
* assets/js/modules/profiles.js
*/
'use strict'



const addProfile = function(){
  //const addProfileForm =  $('#addProfileForm');
  //addProfileForm.on('submit',)
 
    const addProfileForm = document.getElementById('addProfileForm')
    addProfileForm.addEventListener( 'submit', ( event ) => {
      event.preventDefault();
      const addProfileFormData = new FormData(addProfileForm),
      addProfileFormObj = {}

      for(let [key,value] of addProfileFormData.entries()){
        addProfileFormObj[key] = value
      }
      console.log(addProfileFormObj)
      axios.post('api/accounts',addProfileFormObj)
      .then(function (account) {
        $('#addProfileForm').html(`New profile for ${addProfileFormObj.firstName} ${addProfileFormObj.lastName} has been created and a activation e-mail has been sent to ${addProfileFormObj.email}. You will be notified when this account has been activated.`)
      }).catch(function(error){
        $('#addProfileForm').html(`A error has occured : ${error}`);
      });
    });  /*
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
      submit : function(event) {
        event.preventDefault();
        let currentObj = this;
        console.log(event.target)
        const form = document.getElementById('addProfileForm'),
        formData = new FormData(form)
        console.log(formData);

        //axios({ url : 'api/accounts', data : formData, method : 'post'})
        /*const firstName = $('#firstName').val(),
        lastName = $('#lastName').val(),
        email = $('#email').val()
        axios.post('api/accounts', {
          firstName : firstName,
          lastName : lastName,
          email : email
        })
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
    })*/
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
