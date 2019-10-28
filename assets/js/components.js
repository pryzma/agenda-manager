

/*
* assets/js/components.js
*/

//import {api} from "./server";r
const component = (() => {
    
 
  // component.date
  function date(format){
    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; //January is 0!
  
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    //today =  `${yyyy}-${mm}-${dd}`;
    format = format ? format : 'mm-dd-yyyy';
    format = format.replace('dd',dd).replace('mm',mm).replace('yyyy',yyyy);
    return format;
  }

  function time(){
    let today = new Date();
    let hh = today.getHours();
    hh = hh.toString().length === 1 ? `0${hh}` : hh
    let mm = today.getMinutes();
    mm = mm.toString().length === 1 ? `${mm}0` : mm
      
    
    
    today = `${hh}:${mm}`;

    return today;
  }

  function uid(){  // generate unique id
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4();
  
  }
  // component.api
  /*
  component.api({
    url : 'api/endpoint',
    method : 'get',
    modify : (item) => {
      // do something with returned data item
    },
    callback : (data) => {
      // do something with returned data
    }
  })
   */
  function api(args,callback){
    if(!args.method) args.method = 'get';
    axios[args.method](args.url,args.data)
    .then((res) => {
      const data = [];
      for(let item of res.data){
        if(args.modify) item = args.modify(item);
        data.push(item);
      }
      if(callback) 
        return callback(data);
      if(args.callback) 
        return args.callback(data);
      
      return data;
    })
  }
 
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
      { html : 'Button text', onClick : () => {
        // do something on button click
      }}
    ]
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
      for(let dataItem in item ){
        output =+ args.template.replace(dataItem,`{${item[dataItem]}}`)
      }
      
    }
    return output;
  }

  function modal(args){
    const $amModal = $('#amModal').modal();
    $('#amModalTitle').html(args.title);
    args.tabs ? $('#amModalBody').html(navTabs(args.tabs)) : $('#amModalBody').html(args.body);  
    
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
        
        
        const button_ = document.createElement('button');
        button_.setAttribute( 'class', `btn btn-${button.class}`)
        button_.innerHTML = button.html;
        button.id ? button_.setAttribute('id',button.id) : button_.setAttribute('id',component.uid())
        
        if(typeof button.onClick === 'function' ){
          button_.addEventListener('click', (event)=>{
            button.onClick(event);
            if(button.hideOnClick){
              $amModal.modal('hide');
            }
          })
          
        }
        const confirmDeleteAccount = (args) => {
          button.confirm.confirm(args)
          if(button.hideOnClick || button.confirm.hideOnConfirm){
            $amModal.modal('hide');
          }
        }
        if(typeof button.confirm === 'object'){
          $(button_).popover({
            content : button.confirm.msg,
            trigger : 'focus'
          }).on('shown.bs.popover', () => {

            //if(button.confirm.confirm === 'function'){
              
              button_.addEventListener('click',confirmDeleteAccount,true)
            //}
          }).on('hidden.bs.popover', () => {
            button_.removeEventListener('click',confirmDeleteAccount,true)
          });
          
        }
        if(typeof button.popover === 'object'){
          $(button_).popover(button.popover)
        }
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

  // tabs 
  /*
  component.tabs([
    { label : 'Tab#1', content : 'Content for Tab#1' }
  ])
  */
  function navTabs(args) {
    const tabs = document.createElement('ul'),
    tabsFragment = document.createDocumentFragment();
    tabs.setAttribute('class','nav nav-tabs');
    tabs.setAttribute('id',`tabs_${uid()}`)
    tabs.setAttribute('role','tablist')
    const tabsContent = document.createElement('div');
    tabsContent.setAttribute('class','tab-content')
    for(let item in Object.getOwnPropertyNames(args)){
      const tab = document.createElemen('li'),
      tabLink = document.createElement('a'),
      tabContent = document.createElement('div')
      tabId = uid();
      tabLink.setAttribute('href',`#${tabId}`)
      tab.innerHTML = item.label;
      tabs.appendChild(tab)
      tabsContent.appendChild(tabContent)
    }
    tabsFragment.appendChild(tabs);
    tabsFragment.appendChild(tabsContent);
    return tabsFragment
  }
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
          
          table = tableBody(table,Object.getOwnPropertyNames(data[0]),data,args);
          
          tableInsert(args,table);
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
  
  
  // form
  // form.data
  function formData(form){
    
    const formData = new FormData(form),formObj = {};
   
    for(let [key,value] of formData.entries())
      formObj[key] = value;
    
    return formObj
  }
  // component.form.post
  /*
  component.form.post({
    url : 'api/endpoint',
    el : 'myFormId'
  },(data) => {
    // do something after axios.post has finished
  })
  */
  function formPost(args,callback){
    const form = document.getElementById(args.el);
    let formObj;
    form.addEventListener( 'submit', ( event ) => {
      formObj = formData(form);
      event.preventDefault();
      axios.post(args.url,formObj)
      .then((formObj) => {
        callback(formObj)
      }).catch(function(error){
        $(args.el).html(`A error has occured : ${error}`);
      });
    });
  }
  /*
  component.form.fromModel({
    model : 'modelName',
    fields : {
      propNameOne : {
        label : 'Label Of PropNameOne',
      }
    }
    fields : [
      {field : 'propNameOne', label : 'Label Of PropNameOne'},
      {fields : [ 
        {field : 'propNameOne', label : 'Label Of PropNameOne'},
      ]}
    ]
    onSubmit : (event) => {
      // do something on submit
    }
  })
  */
  // create form with model
  function formFromModel(args){
    const models = application.config.models,
          form = document.createElement('form'),
          formBtnSave = document.createElement('button');
          formBtnSave.setAttribute('class','btn btn-primary btn-lg');
          formBtnSave.innerHTML = args.btnSaveTxt;
          form.setAttribute('encType','multipart/form-data')
          let model,props;
          if(typeof args.model==='string'){
            props = Object.getOwnPropertyNames(models[args.model])
          }else if(args.model.constructor === Array ){
            props = []
            for(let item of args.model){
              for(let prop of Object.getOwnPropertyNames(models[item]))
                props.push(prop)
            }
          }
    let index =0;
    for(let prop in args.fields){
      if(props.includes(prop)){ // given property matches property in model(s)
        // append row to form
        form.appendChild(formRow(prop,args));
      }else{
        
        if(prop.split('_')[0] === 'header'){
          const header = document.createElement(prop.split('_')[1])
          header.innerHTML = args.fields[prop]
          form.appendChild(header)
        }else if(prop === 'field'){
          
        }else if(prop === 'fields'){
          
        }
      }
      index++;
    }
    if(!args.insert) args.insert = 'append'
    if(!args.el) args.el = application.config.main
    $(args.el)[args.insert](form);
    // submit event
    form.appendChild(formBtnSave);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = formData(form);
      if(args.url){
        if(!args.method) args.method = 'post'
        if(args.method){
          if(args.before){
            //axios.interceptors.request.use((data) => {
              args.before(data)
            //});
          }
  
          axios[args.method](args.url,data)
          .then((data) => {
            if(args.onSubmit)args.onSubmit(data)
          })
        }
      }else {
        if(args.onSubmit) args.onSubmit(data);
      } 
    });
    return form
    
  }
  
  // form group row
  function formRow(prop,args){
    const usePropArgs = typeof prop === 'object'
    if(usePropArgs) args = prop;
    // row
    const formRow = document.createElement('div');
    formRow.setAttribute('class','form-group row');
    // label
    const formRowLabel  = document.createElement('label');
    formRowLabel.setAttribute('for',prop);
    formRowLabel.setAttribute('class','col-sm-2 col-form-label')
    formRowLabel.innerHTML = usePropArgs ? args.label : args.fields[prop].label;
    formRow.appendChild(formRowLabel);
    const formInputCol = document.createElement('div');
    formInputCol.setAttribute('class','col-sm-10');
    let argsUse
    try{
      argsUse = args.fields[prop].use;
    }catch(e){
      if(args.use) argsUse = args.use;
    }
    if( argsUse ){
      formInputCol.appendChild(argsUse()) 
    }else{
      // input
      const formRowInput = document.createElement('input');
      try{
        if(args.fields[prop].type) formRowInput.setAttribute('type',args.fields[prop].type);
      }catch(e){
        if(args.type)formRowInput.setAttribute('type',args.type);
      }
     
    
      formRowInput.setAttribute('class','form-control');
      usePropArgs ? formRowInput.setAttribute('id',args.id) : formRowInput.setAttribute('id',prop);
      usePropArgs ? formRowInput.setAttribute('id',args.name) : formRowInput.setAttribute('name',prop);
      if(usePropArgs){
        if(args.value) formRowInput.setAttribute('type',args.value);
      }else{
        if(args.fields[prop].value) formRowInput.setAttribute('value',args.fields[prop].value)
      }
     
      formInputCol.appendChild(formRowInput)
      if(usePropArgs){
        if(args.type === 'date') $(`#${args.id}`).datepicker();
      }else{
        if(args.fields[prop].type === 'date') $(`#${prop}`).datepicker();
      }
       
    }
    
    formRow.appendChild(formInputCol);

    return formRow;
  }


  // custom form inputs
  function formInputDatepicker(args){
  
  }
  
  function formInputTimepicker(args){
    
  }
  
  // alert 
  function alert(args){
    const alert = $('<div></div>')
      .addClass(`alert alert-${args.class}`)
      .html(args.message);
    args.fadeOut = args.fadeOut ? args.fadeOut : 3000;
    $(application.object.config.main).prepend(alert);
    setTimeout(()=>{
      
      alert.fadeOut(()=>{
        alert.remove()
      });
     
    },args.fadeOut);
  }
  return { 
    form : { 
      post : formPost,
      fromModel : formFromModel,
      data : formData,
      input : {
        datepicker : (args) => formInputDatepicker(args),
        timepicker : (args) => formInputTimepicker(args),
        row : (args) => formRow(args)
      } 
    },
    table : (before,args,callback) => {
      if(typeof before === 'object'){
        if(typeof args === 'function'){
          callback = args;
        }
        args = before;
      }
      if(typeof before === 'function')before();
      //new Vue(args);
      table(args);
      if(callback)callback();
    },
    nav : {
      tabs : navTabs
    },
    modal : modal,
    alert : alert,
    date : date,
    time : time,
    uid : uid
  }
})() // invoke
//export default component;