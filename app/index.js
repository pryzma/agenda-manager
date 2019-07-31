module.exports = (app,requires)=>{
    console.log(requires)
    for(const item of requires){
        require(`./${item}`)(app);
    }
}