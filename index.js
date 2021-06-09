const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5500;
const pool = require('./db');
const path = require('path');
require('dotenv').config();

//Middleware//
  //Cors allows cross-origin resoucres
app.use(cors());
  //Json parses the body
app.use(express.json());
//app.use(express.static(path.join(__dirname, "client/build")));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/build")));
};

const apiRouter = require('./api');
app.use('/api', apiRouter);

//Listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});