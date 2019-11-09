/*
* controllers/rehearsals.js
*/
const controller = module.exports = {}
const models = require('../models').sequelize.models
const Rehearsal = models.Rehearsal;
const auth = require('./auth')

controller.createRehearsal = (req,res) => {
    const rehearsal = req.body,
    uuid = uuidv4();
    rehearsal.id = uuid;
    Rehearsal.create(rehearsal).then((rehearsal)=>{
        res.json(rehearsal);
    }).catch((err)=>{
        console.log(err)
    })
}

controller.getAll = (req,res) => {
    Rehearsal.findAll().then((rehearsals) => {
        res.json(rehearsals)
    });
}


controller.getOne = (req,res) => {
    
}

controller.updateEvent = (req,res) => {

}

controller.isAuthenticated = auth.isAuthenticated;