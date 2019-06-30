const dotenv = require('dotenv').config();
const express = require( 'express' );
const app = express();
app.use(express.static( 'assets' ));

const server = app.listen(process.env.PORT, () => {
  console.log( `Listening to port ${process.env.PORT}` );
});
