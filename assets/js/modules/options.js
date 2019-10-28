/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){
  const add = { // options/add
    name : 'Add Option',
    template : 'addOption',
    default : () => addOption()
  },
  addOption = () => {
    component.form.fromModel({
      before : (data) => { // before data is posted
        // create array from checked participants values
      
       const participants = []
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
        //header_h5_1 : 'Date & Time',
        date : { label : 'Date', type : 'date', value : component.date('mm-dd-yyyy') },
        participants : { label : 'Participants', use : participantsCheckBoxes },
        time : { label : 'Arrival', type : 'time', value : '12:00' },
        timePresence : { label : 'Show', type : 'time', value : '12:00' },
        timeSoundcheck : { label : 'Show', type : 'time', value : '12:00' },
        timeSets : { label : 'Sets', use : optionTimeFrameSets },
        header_h5_2 : 'Contact Details',
        organisation : { label : 'Venue' },
        street_address : { label : 'Address' },
        postal_code : { label : 'Postal Code'},
        city : { label : 'City' }
        
      },
      onSubmit : (res) => {
        
        $('form').html(`Option for <b>${res.data.name}</b> has been added`)
      },
      insert : 'append'
    });
  },
  optionsDashboardBadge = (options) => {
    application.object.options.badge = `${options.length} Options added`
  },
  optionView =(id) => {
    for(const option of  application.object.options.data){
      if(id === option.id){
        component.modal({
          title : option.name,
          body : `This option was created ${option.date}`
        })
      }
    }
  },
  optionsOverview = () => {
  
    helper.table(fetchProfilesData,{
      el: '#optionsOverview',
      data: {
        options: application.object.options.data
      },
      methods: {
        optionView : (event) => {
          optionView(event.target.parentElement.id);         
        }
      }
    })
  },
  fetchOptionsData = () => { 
    helper.api({ url : 'api/options' },(options)=>{
      optionsDashboardBadge(options)
      application.object.options.data = options
    });
  },
  optionTimeFrameSets = () => {
    let SetNum = 1;
    const addSetBtn = document.createElement('button'),
    addSet = document.createElement('div');
    addSet.setAttribute('class','row')
    addSetBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Set'
    addSetBtn.setAttribute('class','btn btn-light')
    addSetBtn.addEventListener('click' , (event)=> {
      event.preventDefault()
      addSet.parentNode.insertBefore(component.form.input.row({ label : `Start Set #${SetNum}`,type : 'time'}),addSet.nextSibling);
      addSet.parentNode.insertBefore(component.form.input.row({ label : `End Set #${SetNum}`,type : 'time'}),addSet.nextSibling);
      
      SetNum++;
    })
    addSet.appendChild(addSetBtn);
    return addSet;
  },
  participantsCheckBoxes = () => {
    const participants = document.createElement('div');
    let index = 0;
    for(let account of application.object.profiles.data){
      const formCheck = document.createElement('div');
      formCheck.setAttribute('class','form-check');
      const formCheckInput = document.createElement('input');
      formCheckInput.setAttribute('type','checkbox');
      formCheckInput.setAttribute('value',account.id);
      formCheckInput.setAttribute('id',`participants_${account.id}`);
      //formCheckInput.setAttribute('name',`participants[${index}]`);
      formCheckInput.setAttribute('name',`participants`);
      formCheckInput.setAttribute('class','participants');
      index++;
      formCheck.appendChild(formCheckInput);
      const formCheckLabel = document.createElement('label');
      formCheckLabel.setAttribute('for',`participants_${account.id}`);
      formCheckLabel.innerHTML = ` &nbsp;${account.name}`
      formCheck.appendChild(formCheckLabel);
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
  },() => {
    fetchOptionsData();
  })
})();
