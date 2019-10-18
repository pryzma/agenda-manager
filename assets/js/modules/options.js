/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){

  const add = { // options/add
    name : 'Add Option',
    template : 'addOption',
    default : function(){
      helper.form.fromModel({
        before : (data) => {
          const participantsEls = document.forms[0].elements['participants'],
                participantsArr = [];

          for(let participantEl of participantsEls){
          
            participantsArr.push(participantEl.value)
          }
         
          data.participants = participantsArr;
        },
        model : ['Option','Contact'],
        url : 'api/options',
        btnSaveTxt : 'Add Option',
        fields : {
          name : { label : 'Description' },
          //header_h5_1 : 'Date & Time',
          date : { label : 'Date', type : 'date', value : helper.date() },
          participants : { label : 'Participants', use : participantsCheckBoxes },
          time : { label : 'Time', type : 'time' },
          timePresence : { label : 'Time of Presence', type : 'time' },
          timeSoundcheck : { label : 'Time of Soundcheck', type : 'time' },
          header_h5_2 : 'Contact Details',
          organisation : { label : 'Venue' },
          /*
          [
            { is : 'name', label : 'Description' }, // label + input
            { fields : [ // two inputs + labels in one row
              { is : 'date', label : 'Date' },
              { is : 'time', label : 'Time' }
            ]}
          ]
          */
          
        },
        onSubmit : (data) => {
          $('form').html(`Option for ${data.name} has been added`)
        },
        insert : 'append'
      });
    }
  },
  optionsDashboardBadge = (options) => {
    application.object.options.badge = `${options.length} Options added`
  },
  optionView =(id) => {
    for(const option of  application.object.options.data){
      if(id === option.id){
        helper.modal({
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
  participantsCheckBoxes = () => {
    const participants = document.createElement('div');
    let index = 0;
    for(let account of application.object.profiles.accounts){
      const formCheck = document.createElement('div');
      formCheck.setAttribute('class','form-check');
      const formCheckInput = document.createElement('input');
      formCheckInput.setAttribute('type','checkbox');
      formCheckInput.setAttribute('value',account.id);
      formCheckInput.setAttribute('id',`participants_${account.id}`);
      //formCheckInput.setAttribute('name',`participants[${index}]`);
      formCheckInput.setAttribute('name',`participants`);
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
