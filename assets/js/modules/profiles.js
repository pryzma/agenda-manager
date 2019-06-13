/*
* assets/js/modules/profiles.js
*/
'use strict'
const profiles = (function(){
  const main = function(){
    console.log('This is main')
  }
  const add = function(){
    console.log(' This is add')
    return{
      name : 'Create Profile'
    }
  }
  application.add('profiles',{
    name : 'Profiles',
    color : 'rgb(118, 165, 175)',
    default : main,
    add : add
  })
})();
