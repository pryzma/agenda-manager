/*
* assets/js/modules/profiles.js
*/
'use strict'
const profilesObj = (() => application.object.profiles )()
const addProfile = function(){
  helper.form.post({
    el : 'addProfileForm',
    url : 'api/accounts'
  },(res) => {
    $('#addProfileForm').html(`Account ${res.data.firstName} ${res.data.lastName} is created; a verification e-mail has been sent to ${res.data.email}`)
  })
      
},
profilesDashboardBadge = (profiles) => {
  application.object.profiles.badge = `${profiles.length} Profiles added`
},
profileView =(id) => {
  for(const account of  application.object.profiles.accounts){
    if(id === account.id){
      $('#amModalTitle').html(account.name)
      $('#amModalBody').html(`This account was created ${account.date}`)
        
      $('#amModal').modal()
    }
  }
},
  profilesOverview = () => {
    fetchAccountsData()
    new Vue({
      el: '#profilesOverview',
      data: {
        profiles: application.object.profiles.accounts
      },
      methods: {
        profileView : (event) => {
          profileView(event.target.parentElement.id);
          
          
        }
      }
    });
  }

const fetchAccountsData = () => {
  axios.get('api/accounts').then( // fetch accounts data
    (res) => {
      
      const accounts = []
      let activated
      for(const account of res.data){ // modify fetched data
        activated = account.isActivated == 0 ? 'No' : 'Yes'
        accounts.push({
          id : account.id,
          date : moment(account.createdAt).fromNow(),
          name : `${account.firstName} ${account.lastName}`,
          activated : activated
        })
      }
      profilesDashboardBadge(accounts)
      // save data to accounts property of profiles module object
      application.object.profiles.accounts = accounts
    }
  )
}

const profiles = (function(){
  
  application.add('profiles',{
    name : 'Profiles',
    color : 'rgb(118, 165, 175)',
    default : profilesOverview,
    templateEngine : 'ejs',
    template : 'profiles',
    add : { 
      default : addProfile,
      name : 'Create Profile',
      template : 'addProfile'
    }
  },() => {
    fetchAccountsData();
  });
  
})();
