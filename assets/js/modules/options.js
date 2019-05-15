/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){
  const main = function(){
    console.log('options main')
  }
  const add = function(){
    console.log('options add')
  }
  return {
    name : 'Options',
    default : main,
    add : add
  }
})();
