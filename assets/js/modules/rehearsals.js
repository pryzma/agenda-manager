/*
* assets/js/modules/rehearsals.js
*/
'use strict'
const rehearsals = (function(){
  const rehearsalsData = {
    url : 'api/rehearsals',
    modify : (rehearsal) =>{
      return rehearsal
    },
    callback : (data) => {
      application.object.rehearsals.data = data
      rehearsalsDashboardBadge();
    }
  },
  rehearsalAdd = ()=>{
    
  },
  rehearsalsOverview = ()=>{
    component.table({
      model : 'Rehearsal',
      el: '#overviewTable',
      data : rehearsalsData,
      class : 'table-striped table-hover',
      cols : {
        name : { label : 'Name' },
        date : { label : 'Date' },
        participants : { label : 'Participants' }
      },
      methods: {
        onRowClick : (event) => {
          rehearsalView(event.target.parentElement.id);      
        }
      }
    });
  },
  rehearsalView =(id) => {
    const getRehearsal = (rehearsal)=>rehearsal.id === id,
    rehearsal = application.object.rehearsals.data.filter(getRehearsal)[0];

    component.modal({
      title : rehearsal.name,
      body : `This rehearsal was created ${rehearsal.date}`
    });
  },
  rehearsalsDashboardBadge = ()=>{
    application.object.rehearsals.badge = `${application.object.rehearsals.data.length} Rehearsals added`
  },
  rehearsalDelete = (id,callback) => {
  
    fetch('api/rehearsals', {
      method : 'DELETE',
      body : JSON.stringify({id : id}),
      headers: {'content-type': 'application/json'},
    }).then(()=> {
        console.log(`Rehearsal ${id} was deleted`)
        if(callback)callback();
      })
    .catch(err=>console.error(err));
  }
  
  application.add('rehearsals',{
    name : 'Rehearsals',
    color : 'rgb(147, 196, 125)',
    default : rehearsalsOverview,
    template : 'overview',
    add : rehearsalAdd,
    badge : rehearsalsDashboardBadge
  },() => {
    component.api(rehearsalsData);
  })
})();

