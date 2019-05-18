/*
* assets/js/modules/shows.js
*/
'use strict'
const shows = (function(){
  return {
    name : 'Shows',
    color : 'rgb(147, 196, 125)',
    default : () => agendamanager.initPage(()=>{
      const showOccurence = DOM.create(['div',{id:'showOccurence'}]);
      const showOccurenceInput = DOM.create(['input',{id:'showOccurenceInput',class:'form-control'}]);
      const showOccurenceOutput = DOM.create(['div',{id:'showOccurenceOutput',style:'text-align: right;position: absolute;  width: 85%;margin-top: 8px;  color: #c1c1c1;margin-left: 100px;'}]);
      view.add(showOccurence, showOccurenceOutput)
      view.add(showOccurence, showOccurenceInput);
      controller.add(showOccurenceInput,'input',(event)=>{
        const matchOccurence = event.target.value;
        if(matchOccurence!='') {
          view.set(showOccurenceOutput, `'${matchOccurence}' has <b>${utils.occurence($('#pageLayout table').html(), matchOccurence)}</b> matches`)
        }else{
          view.set(showOccurenceOutput, ``)
        }

      });
      view.add('#mainContent',showOccurence)
    }),
    add : () => {
      $('#amModalTitle').html('Add Show')
      $('#amModal').modal()
      $('#amModal').on('hidden.bs.modal', function (e) {
         location.hash = '#dashboard'
      })
    }
  }
})();
