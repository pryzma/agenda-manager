/*
* assets/js/modules/accounts.js
*/
'use strict'
//import component from '../components'
//import {api} from '../server'
const addAccount = function(){
 component.form.post({
    el : 'addAccountForm',
    url : 'api/accounts'
  },(res) => {
    fetchAccountsData()
    //$('#addAccountForm').html(`Account <b>${res.data.firstName} ${res.data.lastName}</b> is created and a verification e-mail to activate this account  has been sent to <b>${res.data.email}</b>`)
    window.location.hash = '#accounts';
    setTimeout(()=>{
      component.alert({
        class : 'success',
        message : `Account <b>${res.data.firstName} ${res.data.lastName}</b> is created and a verification e-mail to activate this account  has been sent to <b>${res.data.email}</b>`
      });
    },1000)
  
  })
      
},
accountsDashboardBadge = () => {
  application.object.accounts.badge = `${application.object.accounts.data.length} Accounts added`
},
/*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function accountsDashboardBadge(fetchOptions){
  await fetchOptions;
  return `${result.length} Accounts added`;
}
*/
// accountView
accountView =(id) => {
  
  const getAccount = (account)=>account.id === id,
  account = application.object.accounts.data.filter(getAccount)[0];
  
  component.modal({
    title : account.name,
    body : `This account was created ${account.date}`,
    buttons : [{ 
      html : 'Delete Account', 
      class : 'danger',
      confirm : {
        msg : `Are you sure you want to delete this account?`,
        placement : 'bottom',
        confirm : () => accountDelete(id,()=>{
          accountsOverview();
          component.alert({
            class : 'info',
            message : 'Account has been deleted'
          })
        }),
        hideOnConfirm : true
      }
     
    }]
  })
},
accountDelete = (id,callback) => {
  
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
accountsData = {
  url : 'api/accounts',
  modify : (account) =>{
    let activated = account.isActivated == 0 ? 'No' : 'Yes'
    return {
      id : account.id,
      name : account.firstName+' '+account.lastName,
      date : moment(account.createdAt).fromNow(),
      activated : activated
    }
  },
  callback : (data) => {
    application.object.accounts.data = data
    accountsDashboardBadge();
  }
},
accountsOverview = () => {
  
  component.table({
    model : 'account',
    el: '#accountsOverview',
    class : 'table-striped table-hover',
    data: accountsData,
    cols : {
      name : { label : 'Name' },
      date : { label : 'Created' },
      activated : { label : 'Activated' }
    },
    methods: {
      onRowClick : (event) => {
        accountView(event.target.parentElement.id);         
      }
    }
  })
}

const fetchAccountsData = () => {
  // TODO : component.api
  /*
  return component.api(accountsData)
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
      
      // save data to accounts property of accounts module object
      application.object.accounts.data = accounts
      accountsDashboardBadge()
    }
  )
}

const accounts = (()=>{
  
  application.add('accounts',{
    name : 'Accounts',
    color : 'rgb(118, 165, 175)',
    default : accountsOverview,
    templateEngine : 'ejs',
    template : 'accounts',
    add : { 
      default : addAccount,
      name : 'Create Account',
      template : 'addAccount'
    }
  },() => {
    fetchAccountsData();
  });
  
})();
