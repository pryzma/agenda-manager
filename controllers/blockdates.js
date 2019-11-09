/*
* controllers/rehearsals.js
*/
const controller = module.exports = {}
const models = require('../models').sequelize.models
const Blockdate = models.Blockdate;
const auth = require('./auth')

controller.createBlockdate = (req,res) => {
    const blockdate = req.body,
    uuid = uuidv4();
    blockdate.id = uuid;
    Blockdate.create(blockdate).then((blockdate)=>{
        res.json(blockdate);
    }).catch((err)=>{
        console.log(err)
    })
}

controller.getAll = (req,res) => {
    Blockdate.findAll().then((blockdates) => {
        res.json(blockdates)
    });
}


controller.getOne = (req,res) => {
    
}

controller.updateEvent = (req,res) => {

}

controller.isAuthenticated = auth.isAuthenticated;