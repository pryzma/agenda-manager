const dotenv = require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const sgMail = require('@sendgrid/mail');
const app = express();

app.use(bodyParser.json());
app.use(express.static('assets'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  else {
    console.log(`Connected!`);
  }
});

app.get('/api/accounts', (req, res) => {
  connection.query('SELECT * from accounts', (err, accounts) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(accounts));
    } else {
      throw err;
    }
  })
});

app.post('/api/accounts', (req, res) => {
  let account = req.body;
  let uuid = uuidv4();
  account.uuid = uuid;
  account.isActivated = 0;
  connection.query('INSERT INTO accounts SET ?', account, (err, result) => {
    if (!err) {
      console.log(account);
    } else {
      throw err;
    }
  });
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${account.email}`,
    from: `info@agendamanager.nl`,
    subject: `Registration at agendamanager.nl`,
    text: `Someone has invited you to join Agenda Manager. Visit agendamanager.nl/verify and paste the following code: ${account.uuid}`,
    html: `Someone has invited you to join Agenda Manager. Visit <a href="https://www.agendamanager.nl/verify">agendamanager.nl/verify</a> and paste the following code: <br><strong>${account.uuid}</strong>`,
  };
  // Disable actually sending an email, for now
  // sgMail.send(msg);
  console.log(msg);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
