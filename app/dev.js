const logger = require('morgan'),
dotenv = require('dotenv').config(),
jshint = require('jshint'),
dev = (app)=>{ 
  const env = process.env.NODE_ENV || "development";
  if(env ==='development') app.use(logger('dev')); // log requests
}
module.exports = dev;