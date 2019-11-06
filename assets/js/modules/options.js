/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){
  const optionsData = { // component.api data arguments
    url : 'api/options',
    modify : (option) => {
      if(application.object.accounts){
        //option.participants = application.object.accounts.get(option.participants).name
      }
      
      return option
    },
    callback : (data) => {
      application.object.options.data = data;
      optionsDashboardBadge();
    }
  },
  add = { // options/add
    name : 'Add Option',
    template : 'addOption',
    default : () => addOption()
  },
  addOption = () => {
    component.form.fromModel({
      before : (data) => { // before data is posted
        // create array from checked participants values
        const participants = [];
        $('.participants:checked').each(function() {
            participants.push($(this).val());
        });
        data.participants = participants;
      },
      model : ['Option','Contact'],
      url : 'api/options',
      btnSaveTxt : 'Add Option',
      fields : { // fields
        name : { label : 'Description' },
        header_h5_1 : 'Option Details',
        date : { label : 'Date', type : 'date', value : component.date('mm-dd-yyyy') },
        dateDeadline : { label : 'Deadline', type : 'date', value : component.date('mm-dd-yyyy') },
        participants : { label : 'Participants', use : participantsCheckBoxes },
        time : { label : 'Arrival', type : 'time', value : '12:00' },
        timePresence : { label : 'Show', type : 'time', value : '12:00' },
        timeSoundcheck : { label : 'Soundcheck', type : 'time', value : '12:00' },
        timeSets : { label : 'Sets', use : optionTimeFrameSets },
        header_h5_2 : 'Location Details',
        organisation : { label : 'Venue' },
        street_address : { label : 'Address' },
        postal_code : { label : 'Postal Code'},
        city : { label : 'City' },
        header_h5_3 : 'Contact Details',
        first_name : { label : 'First name' },
        last_name : { label : 'Last name' },
        email : { label : 'E-mail' }
      },
      onSubmit : (res) => {
        component.api(optionsData);
        window.location.hash = '#options';
        // TODO : Better solution than seTimeout (wait for options overview when showing component.alert)??
        setTimeout(()=>{
          component.alert({
            class : 'success',
            message : `<i class="fas fa-calendar-plus"></i> Option <b>${res.data.name} </b> added`
          });
        },500);
        //$('form').html(`Option <b>${res.data.name}</b> has been added`)

      },
      insert : 'append'
    });
  },
  optionConfirm = (id,callback) =>{
    fetch('api/options', {
      method : 'PUT',
      body : JSON.stringify({id : id,isConfirmed : 1}),
      headers: {'content-type': 'application/json'},
    }).then(()=> {
        console.log(`Option ${id} was confirmed`)
        if(callback)callback();
      })
    .catch(err=>console.error(err));
  },
  optionsDashboardBadge = () => {
    const optionsDataLength = application.object.options.data.length;
    let optionsDashboardBadgeLabel
    if(optionsDataLength === 0){
      optionsDashboardBadgeLabel = 'No Options added'
    }else if(optionsDataLength === 1){
      optionsDashboardBadgeLabel = 'One Option added'
    }else{
      optionsDashboardBadgeLabel = `${optionsDataLength} Options added`
    }
    application.object.options.badge = optionsDashboardBadgeLabel;
  },
  optionView =(id) => {
    const getOption = (option)=>option.id === id,
    option = application.object.options.data.filter(getOption)[0];

    component.modal({
      title : option.name,
      body : component.nav.tabs([ // Option Modal Tabs Nav
        { 
          label : '<i class="far fa-calendar"></i> Option', 
          content : `Option for ${option.name} on ${moment(option.date).format('LL')} (${moment(option.date).fromNow()})` 
        },{ 
          label : '<i class="fas fa-users"></i> Participants', 
          content : 'Participants : '+ option.participants 
        }
      ]),
      buttons : [
        { // Confirm Option as Event Button
        txt : '<i class="fas fa-calendar-check"></i> Confirm', 
        class : 'success',
        confirm : {
          title : '<i class="fas fa-calendar-check"></i> Confirm Option as Event',
          msg : `Are you sure you want to confirm this option? <hr>`,
          placement : 'bottom',
          confirm : () => optionConfirm(id,()=>{
            optionsOverview();
            component.alert({
              class : 'success',
              message : `<i class="fas fa-calendar-check"></i> Option <b>${option.name}</b> confirmed as event`
            });
          }),
          hideOnConfirm : true
        }
      },{ // Delete Button
        txt : '<i class="fas fa-calendar-times"></i> Delete', 
        class : 'danger',
        confirm : {
          title : '<i class="fas fa-calendar-times"></i> Delete Option',
          msg : `Are you sure you want to delete this option? <b class="text-danger">You can not undo this action</b><hr>`,
          placement : 'bottom',
          confirm : () => optionDelete(id,()=>{
            optionsOverview();
            component.alert({
              class : 'primary',
              message : `<i class="fas fa-calendar-times"></i> Option <b>${option.name}</b> deleted`
            });
          }),
          hideOnConfirm : true
        }
      }]
    });
  },
  optionDelete = (id,callback) => {
  
    fetch('api/options', {
      method : 'DELETE',
      body : JSON.stringify({id : id}),
      headers: {'content-type': 'application/json'},
    }).then(()=> {
        console.log(`Option ${id} was deleted`)
        if(callback)callback();
      })
    .catch(err=>console.error(err));
  },
  optionsOverview = () => {
   /* component.table({
      model : 'Option',
      el: '#optionsOverview',
      data : optionsData,
      class : 'table-striped table-hover',
      cols : {
        name : { label : 'Name' },
        date : { label : 'Date' },
        participants : { label : 'Participants' }
      },
      methods: {
        onRowClick : (event) => {
          optionView(event.target.parentElement.id);         
        }
      }
    }); */
    // TODO : table/calendar view switch, year/month/week views, period select, prev/next period navs
    component.calendar({
      data : optionsData,
      el : '#optionsOverview',
      btn : {
        txt : '<b>+</b><i class="fas fa-calendar-plus"></i>',
        class : 'light btn-sm hover float-right',
        tooltip : 'Add Option',
        onClick : ()=>{
          location.hash = '#options/add'
        }
      },
      onClick : (event) =>{
        optionView(event.target.id);
      }
    })
    
  },
  optionTimeFrameSets = () => {
    let SetNum = 1; // Set number
    const addSetBtn = document.createElement('button'),
    addSetFragment = document.createDocumentFragment(),
    addSet = document.createElement('div');
    addSet.setAttribute('class','row');
    addSetBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Set';
    addSetBtn.setAttribute('class','btn btn-light');
    addSetBtn.addEventListener('click' , (event)=> {
      event.preventDefault();
      addSet.appendChild(component.form.input.row({ label : `Start Set #${SetNum}`,type : 'time'}));
      addSet.appendChild(component.form.input.row({ label : `End Set #${SetNum}`,type : 'time'}));
      SetNum++;
    });
    addSetFragment.appendChild(addSetBtn);
    addSetFragment.appendChild(addSet);
    return addSetFragment;
  },
  participantsCheckBoxes = () => {
    // parent container 
    const participants = document.createElement('div');
    participants.setAttribute('class','card');
    for(let account of application.object.accounts.data){
      // checkbox & label container 
      const formCheck = document.createElement('div');
      formCheck.setAttribute('class','form-check');
      // checkbox
      const formCheckInput = document.createElement('input');
      formCheckInput.setAttribute('type','checkbox');
      formCheckInput.setAttribute('value',account.id);
      formCheckInput.setAttribute('id',`participants_${account.id}`);
      formCheckInput.setAttribute('name',`participants`);
      formCheckInput.setAttribute('class','participants');

      
      // append checkbox to container
      formCheck.appendChild(formCheckInput);
      // label
      const formCheckLabel = document.createElement('label');
      formCheckLabel.setAttribute('for',`participants_${account.id}`);
      formCheckLabel.innerHTML = `<i class="fas fa-user"></i> &nbsp;${account.name}`;
      // append label to container
      formCheck.appendChild(formCheckLabel);
      // append container to parent container
      participants.appendChild(formCheck);
    }
    return participants;
  }
  application.add('options',{
    name : 'Options',
    color : 'rgb(224, 102, 102)',
    default : optionsOverview,
    template : 'options',
    templateEngine : 'ejs',
    add : add
  },() => component.api(optionsData))
})();
