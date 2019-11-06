// component.modal
  /*
  component.modal({
    title : 'Title of modal',
    body : 'Body of modal',
    close : () => {
      // do something on close
    },
    save : () => {
      // do something on save (primary button is clicked)
    },
    buttons : [
      { txt : 'Button text', onClick : () => {
        // do something on button click
      }}
    ]
  })
  */
 function modal(args){
    const $amModal = $('#amModal').modal();
    $('#amModalTitle').html(args.title)
      //.on('shown.bs.modal', () => {
        args.tabs ? $('#amModalBody').html(navTabs(args.tabs)) : $('#amModalBody').html(args.body);  
      //});
    if(typeof args.save === 'function'){
      $('#amModalSave').on('click',()=>{
        args.save();
      });
    }
    if(args.buttons){
      const button_container = document.createElement('div');
      button_container.setAttribute('id','button_container')
      const footer = document.getElementById('amModalFooter');
      for(let button of args.buttons){
        const button_ = component.btn(button);
        button_container.appendChild(button_)
        
      }
      footer.appendChild(button_container)
    }
    $amModal.on('hidden.bs.modal', function (e) {
      $('#amModalTitle').html('');
      $('#amModalBody').html('');
      $('#button_container').remove();
      if(typeof args.close === 'function') args.close();
    });
    
  }