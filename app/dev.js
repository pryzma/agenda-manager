/*
* app/dev.js
*/
const logger = require('morgan'),
dotenv = require('dotenv').config(),
jshint = require('jshint'),
dev = (app)=>{ 
  logger(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })
  const env = process.env.NODE_ENV || "development";
  if(env ==='development') app.use(logger('dev')); // log requests
}
module.exports = dev;