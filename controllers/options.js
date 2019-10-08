/*
* controllers/options.js
*/
const controller = module.exports = {}
const uuidv4 = require('uuid/v4');
const models = require('../models').sequelize.models
const Option = models.Option;
const auth = require('./auth')
controller.createOption = () => {
    const option = req.body,
    uuid = uuidv4();
    option.id = uuid;
    option.createdBy = req.session.user.id;
    Option.create(option).then((option)=>{
        res.json(account);
    }).catch((err)=>{
        console.log(err)
    });
}

controller.getAll = (req,res) => {
   Option.findAll({order:[['id','DESC']]}).then((options) => {
        res.json(options)
    });
}
controller.isAuthenticated = auth.isAuthenticated;