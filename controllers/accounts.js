/*
* controllers/accounts.js
*/
const controller = module.exports = {}
const uuidv4 = require('uuid/v4'),
      sgMail = require('@sendgrid/mail');
      
const models = require('../models').sequelize.models;
const Account = models.account;
const Contact = models.Contact;

const auth = require('./auth')
controller.createAccount = (req,res) => {
    
    const account = req.body
    const contact = {}
    contact.id = uuidv4();
    account.contact = contact.id;
    contact.first_name = account.firstName
    contact.last_name = account.lastName
    Contact.create(contact);
    account.id = uuidv4();
    account.password = '';
    account.isActivated = 0;
    account.createdBy = req.session.user.id;
    
    Account.create(account).then((account)=>{
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: `${account.email}`,
          from: `noreply@agendamanager.nl`,
          subject: `Registration at agendamanager.nl`,
          text: `Someone has invited you to join Agenda Manager. Visit agendamanager.nl/verify and paste the following code: ${account.id}`,
          html: `${req.session.user.firstName} ${req.session.user.lastName} has invited you to join Agenda Manager. Visit <a href="http://${process.env.REF_URL}verify?uuid=${account.id}">agendamanager.nl/verify</a> and paste the following code: <br><strong>${account.id}</strong>`,
        }
        sgMail.send(msg);
        res.json(account);
    
    }).catch((err)=>{
        console.log(err)
    })

}
controller.updateAccount = (req,res) => {
    
}
controller.deleteAccount = (req,res) => {

}
controller.getAll = (req,res) => {
    Account.findAll({order:[['id','DESC']]}).then((accounts) => {
        res.json(accounts)
    });
}
controller.getOne = (req,res) => {
    
}

controller.isAuthenticated = auth.isAuthenticated;