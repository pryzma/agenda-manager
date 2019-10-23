class App {
    constructor(){
        this.Config = Object;
        this.Module = Object;
        
    }
    set config(){
        axios.get({url : 'config'})
        .then((data)=>{
            this.config = data;
            init();
        })
    }
    get component(){

    }
}