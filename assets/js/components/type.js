// type; basic type filter 
  /*
  const obj = {some : 'object'}
  component.type(obj,Object,()=>{
    // do something with obj
  })
  */
 function err(args){
    throw args
  }
  function type(args,type,callback){
    // assign callback to args type
    const argsTypeOf = typeof args,
          argsPrototype = args.prototype;
    if( argsPrototype != type ) err(`component.type called with type '${type}' but argsType is ${argsPrototype} `);
        
    switch(args.prototype){
            case String:
                callback(args)
                break;
            case Array:
                callback(args);
                break;
            case Object:
                callback(args);
                break;
            case Function:
                callback(args);
                break;
            
            
        }
  }