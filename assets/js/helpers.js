/*
* assets/js/helpers.js
*/
const helper = (() => {
    return { 
      form : 
        { post : (args,callback) => formPost(args,callback),
          fromModel : (args) => formFromModel(args),
          input : {
            datepicker : (args) => formInputDatepicker(args)
            
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
        new Vue(args);
        if(callback)callback();
      },
      modal : (args) => modal(args)
    }
    
})() // invoke
// helper.api
/*
helper.api({
  url : 'api/endpoint',
  method : 'get',
  modify : (item) => {
    // // do something with returned data item
  },
  callback : (data) => {
    // do something with returned data
  }
})
*/
function api(args){
  if(!args.method) args.method = 'get'
  axios[args.method](args.url)
  .then((res) => {
    const data = []
    for(let item of res.data){
      if(args.modify) item = args.modify(item)
      data.push(item)
    }
    if(args.callback) 
      return args.callback(data)
    return data;
  })
}
// helper.modal
/*
helper.modal({
  title : 'Title of modal',
  body : 'Body of modal',
  close : () => {
  },
  save : () => {
    // function to fire on save
  }
})
*/
function modal(args){
  $('#amModalTitle').html(args.title);
  $('#amModalBody').html(args.body);  
  const amModal = $('#amModal').modal();
  if(typeof args.save === 'function'){
    $('#amModalSave').on('click',()=>{
      args.save()
    });
    
  }
  if(typeof args.close === 'function'){
    amModal.on('hidden.bs.modal', function (e) {
      // do something...
      args.close();
    })
  }
}
// table
/*
helper.table({
  model : 'modelName',
  data : {
    url : 'api/endpoint',
    modify : (item) => {

    }
  },
  cols : {
    propNameOne : {
      label : 'Label of propNameOne'
    },
    propNameTwo : {
      label : 'Label of propNameTwo'
    },
  }
})
*/
function table(args){
  let table = document.createElement('table')
  const thead = document.createElement('thead'),
        models = application.config.models,
        model = models[args.model],
        props = Object.getOwnPropertyNames(model);
  let tr,th;
  for(let prop of props){
    if(args.cols[prop]){
      tr = document.createElement('tr');
      th = document.createElement('th');
      th.innerHTML = args.cols[prop].label;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  
  if(args.data.url){
    const apiObj = {
      url : args.url,
      callback : (data) => {
        table = tableBody(table,props,data);
        tableInsert(args,table)
      }
    }
    if(args.data.modify) apiObj.modify = args.data.modify;
    api(apiObj);
  }else{
    table = tableBody(table,props,args.data)
    tableInsert(args,table)
  }


  
 
}
// table insert
function tableInsert(args,table){
  if(!args.insert) args.insert = 'append';
  if(!args.el) args.el = application.config.main;
  $(args.el)[args.insert](table);
}
// table body
function tableBody(table,props,data){
  const tbody = document.createElement('tbody');
  let tr,td;
  for(let item of data){
    tr = document.createElement('tr');
    for(let prop of props){
      td = document.createElement('td');
      td.innerHTML = item[prop];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  
  return table
}

// form
function formData(form){
  
  const formData = new FormData(form),
        formObj = {};
  console.log(formData)
  for(let [key,value] of formData.entries()){
    formObj[key] = value
  }
  return formObj
}
// helper.form.post
/*
helper.form.post({
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
helper.form.fromModel({
  model : 'modelName',
  fields : {
    propNameOne : {
      label : 'Label Of PropNameOne',
    }
  }
  onSubmit : (event) => {
    // do something on submit
  }
})
*/
// create form with model
function formFromModel(args){
  const models = application.config.models,
        model = models[args.model],
        props = Object.getOwnPropertyNames(model),
        form = document.createElement('form'),
        formBtnSave = document.createElement('button');
        
  for(let prop of props){
    if(args.fields[prop]){
      const propFormRow =  formRow(prop,args);
      // append row to form
      form.appendChild(propFormRow);
    }
  }
  if(!args.insert) args.insert = 'append'
  if(!args.el) args.el = application.config.main
  $(args.el)[args.insert](form);
  // submit event
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(args.url){
      if(args.method){
        // call axios if url & method provided
        axios[args.method](args.url,formData(form))
        .then(() => {
          if(args.onSubmit)args.onSubmit()
        })
      }
    }else {
      if(args.onSubmit) args.onSubmit();
    } 
  });

}
// form group row
function formRow(prop,args){
  // row
  const formRow = document.createElement('div');
  formRow.setAttribute('class','form-group');
  // label
  const formRowLabel  = document.createElement('label');
  formRowLabel.setAttribute('for',prop);
  formRowLabel.innerHTML = args.fields[prop].label;
  formRow.appendChild(formRowLabel);
  // input
  const formRowInput = document.createElement('input');
  formRowInput.setAttribute('class','form-control');
  formRowInput.setAttribute('id',prop);
  formRow.appendChild(formRowInput);

  return formRow;
}
// custom form inputs
function formInputDatepicker(args){

}

function formInputTimepicker(args){
  
}