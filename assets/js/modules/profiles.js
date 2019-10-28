/*
* assets/js/modules/profiles.js
*/
'use strict'
//import component from '../components'
//import {api} from '../server'
const addProfile = function(){
 component.form.post({
    el : 'addProfileForm',
    url : 'api/accounts'
  },(res) => {
    fetchProfilesData()
    $('#addProfileForm').html(`Account <b>${res.data.firstName} ${res.data.lastName}</b> is created and a verification e-mail to activate this account  has been sent to <b>${res.data.email}</b>`)
  })
      
},
profilesDashboardBadge = () => {
  application.object.profiles.badge = `${application.object.profiles.data.length} Profiles added`
},
/*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function profilesDashboardBadge(fetchOptions){
  await fetchOptions;
  return `${result.length} Profiles added`;
}
*/
// profileView
profileView =(id) => {
  
  const getProfile = (profile)=>profile.id === id,
  profile = application.object.profiles.data.filter(getProfile)[0];
  
  component.modal({
    title : profile.name,
    body : `This account was created ${profile.date}`,
    buttons : [{ 
      html : 'Delete Account', 
      class : 'danger',
      confirm : {
        msg : `Are you sure you want to delete this account?`,
        placement : 'bottom',
        confirm : () => profileDelete(id,()=>profilesOverview()),
        hideOnConfirm : true
      }
     
    }]
  })
},
profileDelete = (id,callback) => {
  
  fetch('api/accounts', {
    method : 'DELETE',
    body : JSON.stringify({id : id}),
    headers: {'content-type': 'application/json'},
  }).then((event)=> {
      console.log(`Account ${id} was deleted`)
      if(callback)callback();
    })
  .catch(err=>console.error(err));
},
profilesData = {
  url : 'api/accounts',
  modify : (profile) =>{
    let activated = profile.isActivated == 0 ? 'No' : 'Yes'
    return {
      id : profile.id,
      name : profile.firstName+' '+profile.lastName,
      date : moment(profile.createdAt).fromNow(),
      activated : activated
    }
  },
  callback : (data) => {
    application.object.profiles.data = data
    profilesDashboardBadge();
  }
},
profilesOverview = () => {
  component.table({
    model : 'account',
    el: '#profilesOverview',
    class : 'table-striped table-hover',
    data: profilesData,
    cols : {
      name : { label : 'Name' },
      date : { label : 'Created' },
      activated : { label : 'Activated' }
    },
    methods: {
      onRowClick : (event) => {
        profileView(event.target.parentElement.id);         
      }
    }
  })
}

const fetchProfilesData = () => {
  // TODO : component.api
  /*
  return component.api(profilesData)
  */
  return axios.get('api/accounts').then( // fetch accounts data
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
      
      // save data to accounts property of profiles module object
      application.object.profiles.data = accounts
      profilesDashboardBadge()
    }
  )
}

const profiles = (()=>{
  
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
    fetchProfilesData();
  });
  
})();
