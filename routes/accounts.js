const connection = require('../app/dbconn'),
      dotenv = require('dotenv').config(),
      express = require('express'),
      bodyParser = require('body-parser'),
      uuidv4 = require('uuid/v4'),
      sgMail = require('@sendgrid/mail'),
      app = express();
      app.use(bodyParser.urlencoded({extended : true}));
      const bodyParserJSON = app.use(bodyParser.json());
      
const router = express.Router();





router.get('/', isAuthenticated, (req, res) => {
  connection.query('SELECT * from accounts', (err, accounts) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(accounts));
    } else {
      throw err;
    }
  })
});

function createAccount(account,req,res){
  connection.query('INSERT INTO accounts SET ?', account, (err, result) => {
    
    if (!err) {
      console.log(account);
      res.end(JSON.stringify(account));
    } else {
      throw err;
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(req.session.user)
    const msg = {
      to: `${account.email}`,
      from: `noreply@agendamanager.nl`,
      subject: `Registration at agendamanager.nl`,
      text: `Someone has invited you to join Agenda Manager. Visit agendamanager.nl/verify and paste the following code: ${account.id}`,
      html: `${req.session.user.firstName} ${req.session.user.lastName} has invited you to join Agenda Manager. Visit <a href="http://127.0.0.1:3000/verify?uuid=${account.id}">agendamanager.nl/verify</a> and paste the following code: <br><strong>${account.id}</strong>`,
    }

   sgMail.send(msg);

  

  });
}

router.post('/', bodyParserJSON, (req, res) => {

  const account = req.body,
  uuid = uuidv4();
  account.id = uuid;
  account.password = ''
  account.isActivated = 0;
  const today = new Date(),
  dd = String(today.getDate()).padStart(2, '0'),
  mm = String(today.getMonth() + 1).padStart(2, '0'), //January is 0!
  yyyy = today.getFullYear();
  const date = `${yyyy}-${mm}-${dd}`
  account.createdAt = date
  account.updatedAt = date
  createAccount(account,req,res);

});

function isAuthenticated(req, res, next) {
  if (req.session.user)
      return next();
  res.status(403).end();
}

module.exports = router;
