// component.auth
  /*
  component.auth({
    data : {
      url : 'api/endpoint',
      model : {
        'Manager' : {
          hasAccess : ['*'],
          isAllowed : ['c','u','d'],
          isPermitted : ['*']
        }
      }
    }
  })
  */
 const authModels = new Array
 function auth(args){
  
     // authData
     type(args.data,Object,()=>{
       let authData 
       api(args.data,(data)=>{
         authData = data;
       });
     })
     // authModel
     type(args.data.model,Object,()=>{
       const model = args.data.model,
       modelName = authModels[Object.getOwnPropertyNames(model)[0]];
       type(args.data.model[modelName],Object,()=>{
         authModels[modelName] = args.data.model; // add objectto authModels
       })
       type(args.data.model[modelName],Array,()=>{
         for(authModel in args.data.model[modelName])
           authModels[modelName][authModel] = args.data.model[modelName][authModel]
       })
       
     });
   
 }