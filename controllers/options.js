/*
* controllers/options.js
*/
const controller = module.exports = {}
const uuidv4 = require('uuid/v4');
const utils = require('../app/utils');
const models = require('../models').sequelize.models;
const Option = models.Option;
const Contact = models.Contact;

const auth = require('./auth')
const multer = require('multer')
controller.createOption = (req,res) => {
    //req.body.participants = req.body.participants.map(item => (Array.isArray(item) && item[1]) || null);
    const data = req.body;
    const contact = {} // contact duplicates check
    contact.id = uuidv4();
    
    data = utils.fromData(data,contact, // extract & remove properties from data to contact object
        ['organisation','street_address','postal_code','city'])    
    contact = data[1];
    const option = data[0];
    option.id = uuidv4();
    // participants is array; save to linked table (participants) or as string?
    data.participants = data.participants.join(','); // as string
    /* as linked table (model & controller required)
    for(let participant of data.participants){
        participant = { event : option.id, participant : participant }
        participant.id = uuidv4();
        Participant.create(participant); // add each participant for this event
    }
    
    */
    console.log(data)
    console.log(contact)
    
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
   Option.findAll({order:[['id','DESC']]}).then((options) => {
        res.json(options)
    });
}

controller.getOne = (req,res) => {
    
}
controller.isAuthenticated = auth.isAuthenticated;