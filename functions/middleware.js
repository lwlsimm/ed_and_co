const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { getBasicCustomerData, getBasicCustomerDataById  } = require('../functions/customerFunctions');

//Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if(token === null) return res.sendStatus(401);
  jwt.verify(token, 
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if(err) {return res.sendStatus(403)}
    req.user = user.email;
    next()
    }
  )
}

async function hashPassword (req, res, next) {
  const pw = req.body.password;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, async function(err, salt) {
    bcrypt.hash(pw, salt, async function(err, hash) {
        req.pw = await hash
        await next()
      });
  });
}

async function checkPassword (req, res, next) {
  const { email, password } = req.body;
  const customer = await getBasicCustomerData(email);
  const dbPassword = await customer.password;
  bcrypt.compare(password, dbPassword, async function(err, result) {
    if(await result) {
      req.pw = customer;
    } else {
      null
    }
    next()
  });
}

async function passwordChangeCheck (req, res, next) {
  const { curr_password } = req.body;
  const customer = await getBasicCustomerDataById(req.user);
  const dbPassword = await customer.password;
  bcrypt.compare(curr_password, dbPassword, async function(err, result) {
    if(await result) {
      req.pwChangeCheck = customer;
    } else {
      null
    }
    next()
  });
}


module.exports = { authenticateToken, hashPassword, checkPassword, passwordChangeCheck  }