
const helper = (() => {
    return { form : 
        { post : (args,callback) => formPost(args,callback) }
    }
    
})()
// 
function formPost(args,callback){
    const form = document.getElementById(args.el);
    form.addEventListener( 'submit', ( event ) => {
      event.preventDefault();
      const formData = new FormData(form),
      formObj = {};

      for(let [key,value] of formData.entries()){
        formObj[key] = value
      }
      
      axios.post(args.url,formObj)
      .then((formObj) => {
          callback(formObj)
        }).catch(function(error){
        $(args.el).html(`A error has occured : ${error}`);
      });

    });
}