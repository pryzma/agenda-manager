module.exports =(app,express,path)=>{
    // static directory setup
  app.use(express.static(path.join(__dirname, 'assets')));
}