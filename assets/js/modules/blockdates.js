/*
* assets/js/modules/blockdates.js
*/
'use strict'
const blockdates = (function(){
  const blockdatesData = {
    url : 'api/blockdates',
    modify : (blockdate) =>{
      return blockdate
    },
    callback : (data) => {
      application.object.blockdates.data = data
      blockdatesDashboardBadge();
    }
  },
  blockdateAdd = ()=>{

  },
  blockdatesOverview = ()=>{
    /*
    component.table({
      model : 'Blockdate',
      el: '#overviewTable',
      data : blockdatesData,
      class : 'table-striped table-hover',
      cols : {
        name : { label : 'Name' },
        date : { label : 'Date' },
        participants : { label : 'Participants' }
      },
      methods: {
        onRowClick : (event) => {
          blockdateView(event.target.parentElement.id);      
        }
      }
    }); */
    $('#overviewTable').html(component.calendar())
  },
  blockdateView =(id) => {
    const getBlockdate = (blockdate)=>blockdate.id === id,
    blockdate = application.object.blockdates.data.filter(getBlockdate)[0];

    component.modal({
      title : blockdate.name,
      body : `This blockdate was created ${blockdate.date}`
    });
  },
  blockdatesDashboardBadge = ()=>{
    application.object.blockdates.badge = `${application.object.blockdates.data.length} Block Dates added`
  },
  blockdateDelete = (id,callback) => {
  
    fetch('api/blockdates', {
      method : 'DELETE',
      body : JSON.stringify({id : id}),
      headers: {'content-type': 'application/json'},
    }).then(()=> {
        console.log(`Block date ${id} was deleted`)
        if(callback)callback();
      })
    .catch(err=>console.error(err));
  }
  
  application.add('blockdates',{
    name : 'Block Dates',
    color : 'rgb(246, 178, 107)',
    default : blockdatesOverview,
    template : 'overview',
    add : blockdateAdd,
    badge : blockdatesDashboardBadge
  },() => {
    component.api(blockdatesData);
  })
})();

