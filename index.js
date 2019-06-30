const dotenv = require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
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

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
