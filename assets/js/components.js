

/*
* assets/js/components.js
*/

//import {api} from "./server";
const component = (() => {
  const methods = { 
    form : { 
      post : formPost,
      fromModel : formFromModel,
      data : formData,
      input : {
        datepicker : formInputDatepicker,
        timepicker : formInputTimepicker,
        row : formRow
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
      
      table(args);
      if(callback)callback();
    },
    repeat : repeat,
    confirm : confirm,
    type : type,
    calendar : calendar,
    editor : editor,
    nav : {
      tabs : navTabs
    },
    card : card,
    btn : btn,
    modal : modal,
    alert : alert,
    date : date,
    time : time,
    uid : uid,
    auth : auth,
    api : api
  }
  // .................................................
  // component.date
  function date(format){
    const now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; 
  
    const yyyy = now.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    format = format ? format : 'mm-dd-yyyy';
    format = format.replace('dd',dd).replace('mm',mm).replace('yyyy',yyyy);
    return format;
  }
  // component.time
  function time(){
    let now = new Date();
    let hh = now.getHours();
    hh = hh.toString().length === 1 ? `0${hh}` : hh
    let mm = now.getMinutes();
    mm = mm.toString().length === 1 ? `${mm}0` : mm
    now = `${hh}:${mm}`;

    return now;
  }
  // .................................................
  // component.uid
  function uid(){  // generate unique id
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4();
  
  }
  // .................................................
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
  // .................................................
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
      if(res.data.length > 0){
        for(let item of res.data){
          if(args.modify) item = args.modify(item);
          data.push(item);
        }
      }
      
      if(callback) 
        return callback(data);
      if(args.callback) 
        return args.callback(data);
      
      return data;
    })
  }
 
 // .................................................
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
  // .................................................
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
  // .................................................
  // component.card
  /* https://getbootstrap.com/docs/4.3/components/card/
    component.card({
      title : 'Title of Card',
      content : 'Content of Card'
    })
  */
  function card(args){
    const card = document.createElement('div'), 
    cardBody = document.createElement('div'),
    cardText = document.createElement('div'),
    cardFragment = document.createDocumentFragment();
    card.setAttribute('class','card');
    cardBody.setAttribute('class','card-body');

    if(args.title){
      const cardTitle = document.createElement('h6');
      cardTitle.setAttribute('class','card-title');
      cardTitle.innerHTML = args.title;
      card.appendChild(cardTitle);
    }
    cardText.setAttribute('class','card-text');
    cardText.innerHTML = args.content;
    cardBody.appendChild(cardText);
    
    card.appendChild(cardBody);
    return card;
  }
  // .................................................
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
  // .................................................
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
  // .................................................
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
  // nav 
  
  // .................................................
  // tabs 
  /* https://getbootstrap.com/docs/4.3/components/navs/#tabs
  component.nav.tabs([
    { label : 'Tab#1', content : 'Content for Tab#1' }
  ])
  */
  function navTabs(args) {
    const tabsElement = document.createElement('ul'),
    tabsFragment = document.createDocumentFragment();
    tabsElement.setAttribute('class','nav nav-tabs');
    tabsElement.setAttribute('id',`tabs_${uid()}`)
    tabsElement.setAttribute('role','tablist')
    const tabsContent = document.createElement('div');
    tabsContent.setAttribute('class','tab-content');
    const tabs = args;
    let tabIndex = 0;

    for(let tab of tabs){
      
      const tabId = uid(),
      tabElement = document.createElement('li'),
      tabLink = document.createElement('a'),
      tabContent = document.createElement('div'),
      tabClass = tabIndex === 0 ? 'tab-pane fade show active' : 'tab-pane fade',
      tabLinkClass = tabIndex === 0 ? 'nav-link active' : 'nav-link' ;
      // tabElement
      tabLink.setAttribute('href',`#${tabId}`);
      tabLink.setAttribute('class',tabLinkClass);
      tabLink.setAttribute('role','tab');
      tabLink.setAttribute('aria-controls',tabId)
      tabLink.setAttribute('data-toggle','tab');
      tabLink.innerHTML = tab.label;
      tabElement.setAttribute('class','nav-item');
      tabElement.appendChild(tabLink);
      tabsElement.appendChild(tabElement);
      // tabContent
      tabContent.setAttribute('class',tabClass);
      tabContent.setAttribute('aria-labelledby',`${tabId}-tab`);
      tabContent.setAttribute('id',tabId);
      tabContent.setAttribute('role','tabpanel');
      tabContent.innerHTML = tab.content;
      tabsContent.appendChild(tabContent);
      tabIndex++;
    }
    tabsFragment.appendChild(tabsElement);
    tabsFragment.appendChild(tabsContent);
    return tabsFragment;
  }
  // .................................................
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
  
  // .................................................
  // form
  // form.data
  function formData(form){
    
    const formData = new FormData(form),formObj = {};
   
    for(let [key,value] of formData.entries())
      formObj[key] = value;
    
    return formObj
  }
  // .................................................
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
  // .................................................
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
          const hr = document.createElement('hr')
          form.appendChild(header);
          form.appendChild(hr);
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
      formInputCol.appendChild(argsUse()); 
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
        if(args.fields[prop].value) formRowInput.setAttribute('value',args.fields[prop].value);
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

  // .................................................
  // custom form inputs
  function formInputDatepicker(args){
  
  }
  
  function formInputTimepicker(args){
    
  }
  // .................................................
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
  // .................................................
  // calendar
  function calendar(args){
    //const view = args.view ? args.view : 'month'
    const $documentFragment = $(document.createDocumentFragment());
    const $calendarTable = $('<table></table>')
      .attr('class','table table-calendar table-bordered table-striped'),
          $calendarTableHeader = $('<thead></thead>'),
          $calendarTableHeadersWeekDays = $('<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>'),
          $calendarTableBody = $('<tbody></tbody>')
 
    $calendarTableHeader.append($calendarTableHeadersWeekDays)
    $calendarTable.append($calendarTableHeader);
  
    let $calendarTableRow
    args = args ? args : {}
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date(),
    dd = args.d ? args.d : now.getDate(),
    mm = args.m ? args.m : now.getMonth() + 1,
    yyyy = args.y ? args.y : now.getFullYear(),
    days = new Date(yyyy, mm, 0).getDate()+1;

    let start = 1;
    
    let weekDayNumStart = new Date(`${yyyy}-${mm}-${start}`).getDay(),
    prevMonth = mm -1,
    prevMonthDays = new Date(yyyy, prevMonth, 0).getDate()+1,
    prevMonthStart = prevMonthDays - weekDayNumStart,
    weekDayNum;
    

    if(args.data){ 
      const apiObj = {
        url : args.data.url,
        callback : (data) => {
          if(data[0]){
            calendarBuild(data)
          }else{
            $(args.el).html('No Data')
          }
         
          if(args.data.callback) args.data.callback(data);
        }
      }
      if(args.data.modify) apiObj.modify = args.data.modify;
      api(apiObj); // fetch data from api
    }else{
      calendarBuild()
    }
    function calendarBuild(data){
      // previous month
      while(prevMonthStart < prevMonthDays ){
        weekDayNum = new Date(`${yyyy}-${prevMonth}-${prevMonthStart}`).getDay()
        if(weekDayNum===0)$calendarTableRow = $('<tr></tr>')
        let $calendarTableCell = $('<td></td>').attr('style','background-color:#fff;')
        $calendarTableRow.append($calendarTableCell.html(prevMonthStart).addClass('text-muted'))
        
        if(data){
          for(let item of data){
            
            if(item.date.split('T')[0] === `${yyyy}-${prevMonth}-${prevMonthStart}`){
              // add items for specified date
              let $eventItem = $('<div></div>')
                    .attr('class','event begin end')
                    .html(`<i class="far fa-calendar"></i> ${item.name}`);
              $calendarTableCell.append($eventItem);
            }
          }
        }
        if(weekDayNum===6)$calendarTableBody.append($calendarTableRow)
        prevMonthStart++
      }
      // current month
      while(start < days ){

        if(start.toString().length<2)start = `0${start}`
        weekDayNum = new Date(`${yyyy}-${mm}-${start}`).getDay()
        if(weekDayNum===0)$calendarTableRow = $('<tr></tr>')
        let $calendarTableCell = $('<td></td>')
       // dd = (component.date('dd')/1);
       
        dd === (start/1) ? $calendarTableRow.append($calendarTableCell.addClass('today').html(`<b>${start}</b>`)) : $calendarTableRow.append($calendarTableCell.html(start))
        
        if(dd > start){
          $calendarTableCell.addClass('past');
        }else{
         if(args.btn){
          const $calendarTableCellBtn = $(component.btn(args.btn));
          $calendarTableCellBtn.on('click',()=> args.btn.onClick());
          $calendarTableCell.append($calendarTableCellBtn);
         }
        }
        
        if(data){
          
          for(let item of data){
            if(item.date.split('T')[0] === `${yyyy}-${mm}-${start}`){
              // add items for specified date
              let $eventItem = $('<div></div>')
                .attr('class','event begin end')
                .attr('id',item.id)
                .html(`<i class="far fa-calendar"></i> ${item.name}`)
                .on('click',args.onClick);
              $calendarTableCell.append($eventItem);
              
            }
          }
        }
        if(weekDayNum===6) $calendarTableBody.append($calendarTableRow);
        start = (start/1)
        start++;
      }
      $calendarTable.append($calendarTableBody);
     
    }

    
    const $calendarMonths = $('<div></div>').attr('class','dropdown')
    // calendarMonths dropdown 
    // https://getbootstrap.com/docs/4.3/components/dropdowns/
    $calendarMonths.append($('<a></a>')
      .attr('id','calendarMonths')
      .attr('class','btn btn-light dropdown-toggle')
      .attr('role','button')
      .attr('data-toggle','dropdown')
      .html(months[mm-1]));
    const $calendarMonthsMenu = $('<div></div>')
      .attr('class','dropdown-menu')
      .attr('aria-labelledby','calendarMonths')
    months.map(month => {
      if(month!==months[mm-1]) $calendarMonthsMenu.append(
        $('<a></a>')
          .attr('class','dropdown-item')
          .html(month)
      );
    });
    $calendarMonths.append($calendarMonthsMenu);
    $calendarMonths.dropdown();
    $documentFragment.append($calendarMonths);
    $documentFragment.append($calendarTable);
    $(args.el).html($documentFragment);
    return $documentFragment
  }
  // .................................................
  // editor; all in one CRUD component
  /*
  component.editor({
    module : 'modulename',
    data : {
      url :'api/endpoint',
      modify : (item)=>{
        return item
      },
      callback : (data) => {

      }
    },
    use : {
      view : {
        component : 'modal'
      },
      overview : {
        component : 'table',
        default : true, // use overview as module default
        methods : {
          onRowClick : view
        }
      }
    }
  })
  */
  function editor(args){
    // module presets
    application.object[args.module].template = 'editor'
    application.object[args.module].default = editorOverview
    application.object[args.module].add = { default : editorAdd }
    application.object[args.module].view = { default : editorView }
    // set routes
    application.routes[`${args.module}/add`] = `${args.module}.add`;
    application.routes[`${args.module}/view`] = `${args.module}.view`;
    // data config
    const editorData = {
      url : args.data.url,
      modify : args.data.modify,
      callback : (data) => {
        application.object[args.module].data = data;
        args.data.callback();
      }
    }
    // view
    const editorView = (id) => {
 
      const item = application.object[args.module].data.filter((item) => item.id === id)[0];
      component[args.view.use.component](args.view);
    }
    // overview
    const editorOverview = () => {
      if(!args.overview.us.class && args.us.overview.component === 'table')
        args.use.overview.class = 'table-striped table-hover';

      component[args.use.overview.component]({
        model : args.use.overview.model,
        el : args.use.overview.el,
        data : editorData,
        class : args.use.overview.class,
        cols : args.use.overview.cols,

      })
    }
    //api call
    api(editorData)
  }
  return methods
})() // invoke
//export default component;