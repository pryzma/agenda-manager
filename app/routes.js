module.exports = (app)=>{
    const index = require('../routes/index'),
    accounts = require('../routes/accounts');
    app.use('/', index);
    app.use('/api/accounts', accounts);
}