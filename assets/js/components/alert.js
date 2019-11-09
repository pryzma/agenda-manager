// alert 
function alert(args){
    const alert = $('<div></div>')
      .addClass(`alert alert-${args.class}`)
      .html(args.message);
    args.fadeOut = args.fadeOut ? args.fadeOut : 3000;
    $(application.object.config.main).prepend(alert);
    if(args.fadeOut){
      setTimeout(()=>{
      
        alert.fadeOut(()=>{
          alert.remove()
        });
       
      },args.fadeOut);
    }
  }