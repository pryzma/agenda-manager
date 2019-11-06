// component.repeat
 /*
 component.repeat({
   data : 'api/endpoint',
   template : '{propName} is replaced'
 })
 */
function repeat(args){
    if(typeof args.data === 'string'){
      const apiObj = args;
      apiObj.url = args.data
      return api(apiObj,(data)=>{
        apiObj.data = data;
        repeat(apiObj);
      });
      
    }
    let output = '';
    for(let item of args.data){
      output =+ args.template;
      for(let dataItem in item ){
        output.replace(`{${dataItem}}`,item[dataItem])
      }
      
    }
    return output;
  }