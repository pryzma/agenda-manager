/*
* assets/js/modules/accounts.js
*/
const accountsOverview = () => helper.table({
    model : 'accounts',
    el : 'accountsOverview',
    insert : 'html',
    data : {
        url : 'api/accounts',
        modify : (item) => {
            let activated = item.isActivated == 0 ? 'No' : 'Yes';
            return {
                id : item.id,
                name : `${item.firstName} ${item.lastName}`,
                activated : activated,
                date : moment(item.createdAt).fromNow()
            }
        },
        callback : (data) => application.object.accounts.data = data
    },   
    cols : {
        name : { label : 'Name' },
        date : { label : 'Created' },
        activated : { label : 'Activated' }

    },
    onRowClick : (event) => {
        accountView(event.target.parentElement.id);
    }
});
const accountView = (id) => {
    for(const account of application.object.accounts.data){
        if(id === account.id){
          return helper.modal({
            title : account.name,
            body : `This account was created ${account.date}`
          })
        }
    }
}
const accounts = {
    name : 'Accounts',
    color : '',
    default : accountsOverview,
    template : 'accounts',
    templateEngine : 'ejs',
    
}
application.add('accounts',accounts)