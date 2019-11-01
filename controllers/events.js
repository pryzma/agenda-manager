/*
* controllers/events.js
*/
const controller = module.exports = {}
const models = require('../models').sequelize.models
const Option = models.Option;
const auth = require('./auth')

controller.createEvent = (req,res) => {
    const event = req.body,
    uuid = uuidv4();
    event.id = uuid;
    event.isConfirmed = 1;
    Option.create(event).then((event)=>{
        res.json(event);
    }).catch((err)=>{
        console.log(err)
    })
}

controller.getAll = (req,res) => {
    Option.findAll({where:{isConfirmed : 1}}).then((events) => {
        res.json(events)
    });
}


controller.getOne = (req,res) => {
    
}

controller.updateEvent = (req,res) => {

}

controller.isAuthenticated = auth.isAuthenticated;