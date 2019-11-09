// form.data
function formData(form){
    
    const formData = new FormData(form),formObj = {};
   
    for(let [key,value] of formData.entries())
      formObj[key] = value;
    
    return formObj
  }