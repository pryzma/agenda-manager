 // component.btn
  /* https://getbootstrap.com/docs/4.3/components/buttons/
  component.btn({
    class : 'primary',
    txt : 'Button Text',
    event : ['click',()=>{
      // do something on click
    }],
    confirm : {
      msg : 'Are you sure?',
      confirm : () => {
        console.log("Is confirmed")
      }
    }
  })
  */
 function btn(args){
    const btn = document.createElement('button');
    if(!args.class) args.class = 'primary'
    btn.setAttribute('class',`btn btn-${args.class}`);
    if(!args.id) args.id = uid();
    btn.setAttribute('id',args.id);
    btn.innerHTML = args.html ? args.html : args.txt;
    if(args.event){
      btn.addEventListener(args.event[0],(event)=>args.event[1](event));
    }
    if(args.tooltip){
      btn.setAttribute('data-toggle','tooltip')
      btn.setAttribute('data-placement','top')
      btn.setAttribute('title',args.tooltip)
      $(btn).tooltip({trigger : 'hover focus'})
    }
    // confirm
    if(typeof args.confirm === 'object'){ 
      
      // confirm(args.confirm)
      const $amModal = $('#amModal')
      const confirm = () => {
        args.confirm.confirm();
        if(args.confirm.hideOnConfirm)$amModal.modal('hide');
      }
      const cancel = () => $(btn).popover('hide');
      
      args.confirm.trigger = 'focus';
      args.confirm.content = args.confirm.msg;
      args.confirm.html = true;
      $(btn).popover(args.confirm).on('shown.bs.popover', () => { // popover is shown

        
        if(!args.confirm.class) args.confirm.class = 'primary'
        const $confirmBtn = $('<button></button>')
            .attr('class',`btn btn-sm btn-${args.confirm.class} confirm`)
            .html('Confirm')
            .on('click',confirm); // confirm method of confirm object in arguments
        $('.popover-body').append($confirmBtn)
        const $cancelBtn = $('<button></button>')
            .attr('class','btn btn-sm cancel')
            .html('Cancel')
            .on('click',cancel);
        $('.popover-body').append($cancelBtn)
      
      }).on('hidden.bs.popover', () => { // popover is hidden
          //button_.removeEventListener('click',confirm);
      });
      
    }
    return btn;
  }  