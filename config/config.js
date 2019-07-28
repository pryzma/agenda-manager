dotenv = require('dotenv').config();
const config = function(){
    return {
        development : {
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            dialect : process.env.DB_DIALECT
        }
    }
}
module.exports = config;