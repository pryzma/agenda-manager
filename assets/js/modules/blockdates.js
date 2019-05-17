/*
* assets/js/modules/blockdates.js
*/
'use strict';
const blockdates = (function() {
  const main = function() {
    agendamanager.initPage(()=>{
      const showOccurence = DOM.create(['div',{id:'showOccurence'}]);
      const showOccurenceInput = DOM.create(['input',{id:'showOccurenceInput'}]);
      const showOccurenceOutput = DOM.create(['div',{id:'showOccurenceOutput'}]);
      view.add(showOccurence, showOccurenceOutput)
      view.add(showOccurence, showOccurenceInput);
      controller.add(showOccurenceInput,'input',(event)=>{
        const matchOccurence = event.target.value;
        view.set(showOccurenceOutput, `'${matchOccurence}' has <b>${utils.occurence($('#pageLayout p').html(), matchOccurence)}</b> matches`)
      });
      view.add('#mainContent',showOccurence)
    });
  }
  return {
    name: 'Block Dates',
    color : 'rgb(246, 178, 107)',
    default : main
  }
})();
