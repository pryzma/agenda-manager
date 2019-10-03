const express = require('express'),
      bodyParser = require('body-parser'),
      uuidv4 = require('uuid/v4'),
      sgMail = require('@sendgrid/mail'),
      app = express();
      const  bodyParserJSON = app.use(bodyParser.urlencoded({extended : true}));
      app.use(bodyParser.json());
      
const models = require('../models').sequelize.models
const Account = models.account;

module.exports = {
    createAccount : (req,res) => {
        const account = req.body,
        uuid = uuidv4();
        account.id = uuid;
        account.password = '';
        account.isActivated = 0;

        Account.create(account).then((account)=>{
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: `${account.email}`,
              from: `noreply@agendamanager.nl`,
              subject: `Registration at agendamanager.nl`,
              text: `Someone has invited you to join Agenda Manager. Visit agendamanager.nl/verify and paste the following code: ${account.id}`,
              html: `${req.session.user.firstName} ${req.session.user.lastName} has invited you to join Agenda Manager. Visit <a href="http://127.0.0.1:3000/verify?uuid=${account.id}">agendamanager.nl/verify</a> and paste the following code: <br><strong>${account.id}</strong>`,
            }
            sgMail.send(msg);
            res.json(account);
        
        }).catch((err)=>{
            console.log(err)
        })
    
    },
    getAll :(res) =>{
        Account.findAll({order:[['id','DESC']]}).then((accounts) => {
            res.json(accounts)
        });
    },
    isAuthenticated : (req, res, next) => {
        if (req.session.user)
            return next();
        res.status(403).end();
    }
}