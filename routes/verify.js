const connection = require('../app/dbconn'),
      dotenv = require('dotenv').config(),
      express = require('express'),
      bodyParser = require('body-parser'),
      uuidv4 = require('uuid/v4'),
      sgMail = require('@sendgrid/mail'),
      flash = require('connect-flash'),
      app = express();
app.use(flash());
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    const uuid = req.query.uuid;
    connection.query(`SELECT * FROM accounts WHERE uuid='${uuid}'`, (err, account) => {
        if(err){ // uuid is not found in database

        }else {
            res.render('activate',{
                name : 'Agenda Manager', 
                uuid : uuid,
                firstName : account.firstName,
                lastName : account.lastName
            });
        }
    });
        
});
app.post('/',(req,res) => { // save data from form to database 
    let account = req.body;
    //connection.query(`UPDATE)
});
module.exports = app


