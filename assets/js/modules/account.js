const account = (()=>{
    const accountData = {
        url : 'api/account',
        callback : (data) => {
            application.object.account.data = data;
        }
    },
    accountView = ()=>{

    }
    application.add('account',{
        name : 'Account',
        default : accountView,
        template : 'account'
     },()=>{
        component.api(accountData)
     });
})()