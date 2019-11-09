// table
  /*
  component.table({
    el : '#tableContainerId',
    model : 'modelName',
    data : {
      url : 'api/endpoint',
      modify : (item) => {
        // modify fetched data
      }
    },
    cols : {
      propNameOne : {
        label : 'Label of propNameOne'
      },
      propNameTwo : {
        label : 'Label of propNameTwo'
      },
    },
    options : { // adds row options
      view : (item) => {

      },
      edit : (item) => {

      },
      delete : (item) => {

      }
    }
  })
  */
 function table(args){
    let table = document.createElement('table');
    args.class = args.class ? args.class : '';
    table.setAttribute('class',`table ${args.class}`);
    const thead = document.createElement('thead'),
          models = application.config.models,
          model = models[args.model],
          props = Object.getOwnPropertyNames(model);
    let tr = document.createElement('tr'),th;
    for(let col in args.cols){
      //if(args.cols[prop]){
        
        th = document.createElement('th');
        th.innerHTML = args.cols[col].label;
        tr.appendChild(th);
     // }
      if(args.options){
        th = document.createElement('td');
        th.setAttribute('style','width:100px;');
        tr.appendChild(th);
      }
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    
    if(args.data.url){
      const apiObj = {
        url : args.data.url,
        callback : (data) => {
          if(data[0]){
            table = tableBody(table,Object.getOwnPropertyNames(data[0]),data,args);
            tableInsert(args,table);
          }else{
            $(args.el).html('No Data')
          }
         
          if(args.data.callback) args.data.callback(data);
        }
      }
      if(args.data.modify) apiObj.modify = args.data.modify;
      api(apiObj);
    }else{
      table = tableBody(table,props,args.data);
      tableInsert(args,table);
    }
    
    // table body
    function tableBody(table,props,data,args){
      const tbody = document.createElement('tbody');
      let tr,td;
      for(let item of data){
        tr = document.createElement('tr');
        if(item.id) tr.setAttribute('id',item.id);
        if(args.methods.onRowClick) {
          tr.addEventListener('click', (event)=>{
            args.methods.onRowClick(event);
          });
        }
        for(let col in args.cols){
          td = document.createElement('td');
          td.innerHTML = item[col];
          tr.appendChild(td);
        }
        if(args.options){
          td = document.createElement('td');
          const button_group = document.createElement('div');
          button_group.setAttribute('class','btn-group')
          for(let option of Object.getOwnPropertyNames(args.options)){
            const button = document.createElement('button');
            const icon = document.createElement('i')
            button.setAttribute('class','btn')
            if(option === 'view'){
              icon.setAttribute('class','fas fa-eye')
            }else if(option === 'edit'){
              icon.setAttribute('class','fas fa-edit')
            }else if(option === 'delete'){
              icon.setAttribute('class','fas fa-trash')
            }
            button.addEventListener('click',(event)=>{
              event.preventDefault();
              args.options[option](item);
            })
            button_group.appendChild(button);
          }
          td.appendChild(button_group);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      
      return table;
    }
  
    // table insert
    function tableInsert(args,table){
      
      if(!args.insert) args.insert = 'html';
      if(!args.el) args.el = application.config.main;
      
      $(args.el)[args.insert](table);
      return table;
    }
  }
  