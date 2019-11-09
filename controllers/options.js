/*
* controllers/options.js
*/
const controller = module.exports = {}
const uuidv4 = require('uuid/v4');
const utils = require('../app/utils');
const models = require('../models').sequelize.models;
const Option = models.Option;
const Contact = models.Contact;
const contactController = require('./contacts')
const auth = require('./auth')
const multer = require('multer')
controller.createOption = (req,res) => {
    //req.body.participants = req.body.participants.map(item => (Array.isArray(item) && item[1]) || null);
    let data = req.body;
    let contact = {} // contact duplicates check
    contact.id = uuidv4();
    
    data = utils.fromData(data,contact, // extract & remove properties from data to contact object
        ['organisation','street_address','postal_code','city'])    
    contact = data[1];
    const option = data[0];
    option.id = uuidv4();
    option.isConfirmed = 0;
    // participants is array; save to linked table (participants) or as string?
    option.participants = option.participants.join(','); // as string
    /* as linked table (model & controller required)
    for(let participant of data.participants){
        participant = { event : option.id, participant : participant }
        participant.id = uuidv4();
        Participant.create(participant); // add each participant for this event
    }
    
    */
   
    
    Contact.create(contact).then((contact)=>{
        
        option.contact = contact.id;
       
        option.createdBy = req.session.user.id;
        Option.create(option).then((option)=>{
            res.json(option);
        }).catch((err)=>{
            console.log(err)
        });
    });
    /* */
    
    
}

controller.getAll = (req,res) => {
   Option.findAll({where:{isConfirmed:0}}).then((options) => {
        res.json(options)
    });
}

controller.getOne = (req,res) => {
    Option.findOne(req).then(option => {
        return option.get({ plain: true })
       
    })
}
controller.deleteOption = (req,res) => {
    Option.destroy({
        where: req.body
    }).then(()=>{
        controller.getAll(req,res);
    });
}
controller.isAuthenticated = auth.isAuthenticated;