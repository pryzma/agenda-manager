// component.confirm
  /*
    component.confirm({
      el : $('<button>Confirm me</button>),
      msg : 'Are you sure?',
      closeModal : true, // confirm closes modal
      confirm : ()=>{
        console.log('Is confirmed');
      }
    });
  */
 function confirm(args){
   
    const $amModal = $('$amModal'),
          $confirmElement = args.el;
  
    const confirmEvent = () => {
      args.confirm.confirm();
      if(args.confirm.hideOnConfirm)$amModal.modal('hide');
    }
    const cancelEvent = () => $confirmElement.popover('hide');
    
    args.confirm.trigger = 'focus';
    args.confirm.content = args.confirm.msg;
    args.confirm.html = true;
    $confirmElement.popover(args.confirm).on('shown.bs.popover', () => { // popover is shown

      
      if(!args.confirm.class) args.confirm.class = 'primary'
      const $confirmBtn = $('<button></button>')
          .attr('class',`btn btn-sm btn-${args.confirm.class} confirm`)
          .html('Confirm')
          .on('click',confirmEvent); 
      $('.popover-body').append($confirmBtn)
      const $cancelBtn = $('<button></button>')
          .attr('class','btn btn-sm cancel')
          .html('Cancel')
          .on('click',cancelEvent);
      $('.popover-body').append($cancelBtn)
    
    }).on('hidden.bs.popover', () => { // popover is hidden
        //button_.removeEventListener('click',confirm);
    });
    

}