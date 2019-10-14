/*
* assets/js/modules/options.js
*/
'use strict'
const options = (function(){
  const main = function(){

  }
  // options/add
  const add = {
    name : 'Add Option',
    default : function(){
      helper.form.fromModel({
        model : 'Option',
        fields : {
          name : { label : 'Name' }
        },
        insert : 'html'
      });
    }
  },
  optionsDashboardBadge = (options) => {
    application.object.options.badge = `${options.length} Options added`
  },
  fetchOptionsData = () => {
    axios.get('api/options').then( 
      (res) => {
        
        const options = []
        
        for(const option of res.data){ // modify fetched data
          
          
        }
        optionsDashboardBadge(options)
        application.object.options.data = options
      }
    )
  }
  application.add('options',{
    name : 'Options',
    color : 'rgb(224, 102, 102)',
    default : main,
    add : add
  },() => {
    //fetchOptionsData();
  })
})();
