const dbconn = (function(){
  const includes = require('./includes');
  const mysql = includes.mysql,
        dotenv = includes.dotenv;
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  return connection;
})
