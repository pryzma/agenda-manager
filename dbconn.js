

  const mysql = require('mysql'),
        dotenv = require('dotenv').config(),
        env = process.env.NODE_ENV || "development",
        config = require("./config/config")()[env];

  const connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
  });
  connection.connect((err) => {
    if (err) {
      throw err;
    }
    else {
      console.log(`Connected!`);
    }
  });


module.exports = connection;
