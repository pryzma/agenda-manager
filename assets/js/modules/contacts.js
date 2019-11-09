const contacts = (()=>{
    const contactsData = {
        url : 'api/contacts',
        callback : (data) => {
            application.object.account.data = data;
        }
    },
    contactView = ()=>{

    },
    contactOverview = ()=>{

    }
    application.add('contacts',{
        name : 'Contacts',
        default : contactOverview
    },()=>{
        api.component(contactsData);
    })
})()