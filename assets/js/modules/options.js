/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){
  const main = function(){

  }
  const add = {
    name : 'Add Option',
    default : function(){
      console.log('this is add')
      
    }
  }
  application.add('options',{
    name : 'Options',
    color : 'rgb(224, 102, 102)',
    default : main,
    add : add
  })
})();
