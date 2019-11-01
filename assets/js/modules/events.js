/*
* assets/js/modules/events.js
*/
'use strict'
const events = (function(){
  const eventAdd = ()=>{

  },
  eventDelete = (id,callback) => {
  
    fetch('api/events', {
      method : 'DELETE',
      body : JSON.stringify({id : id}),
      headers: {'content-type': 'application/json'},
    }).then(()=> {
        console.log(`Event ${id} was deleted`)
        if(callback)callback();
      })
    .catch(err=>console.error(err));
  },
  eventsData = {
    url : 'api/events',
    modify : (event) =>{
      return event
    },
    callback : (data) => {
      application.object.events.data = data
      eventsDashboardBadge();
    }
  },
  eventsOverview = ()=>{
    component.table({
      model : 'Option',
      el: '#overviewTable',
      data : eventsData,
      class : 'table-striped table-hover',
      cols : {
        name : { label : 'Name' },
        date : { label : 'Date' },
        participants : { label : 'Participants' }
      },
      methods: {
        onRowClick : (event) => {
          eventView(event.target.parentElement.id);      
        }
      }
    });
  },
  eventView =(id) => {
    const getEvent = (event)=>event.id === id,
    event = application.object.events.data.filter(getEvent)[0];

    component.modal({
      title : event.name,
      body : `This event was created ${event.date}`
    });
  },
  eventsDashboardBadge = ()=>{
    application.object.events.badge = `${application.object.events.data.length} Events added`
  }
  application.add('events',{
    name : 'Events',
    color : 'rgb(147, 196, 125)',
    default : eventsOverview,
    template : 'overview',
    add : eventAdd,
    badge : eventsDashboardBadge
  },() => {
    component.api(eventsData);
  })
})();
