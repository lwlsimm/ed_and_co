const customersRouter = require('express').Router();
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const {generateAccessToken, getAddressData, getBasicCustomerDataById } = require('../functions/customerFunctions');
const { authenticateToken, hashPassword, checkPassword } = require('../functions/middleware');
const { checkEmailExists, registerUser } = require('../functions/registrationFunctions')

module.exports = customersRouter;

customersRouter.use(cors())
customersRouter.use(express.json())


//EXISTING USER LOGIN
customersRouter.post('/login', checkPassword , async(req, res) => {
  try {
    const customer = await req.pw
    if(customer) {
      const accessToken = generateAccessToken(customer.id);
      res.json({accessToken: accessToken})
    } else {
      res.status(403).send()
    }
  } catch (err) {
    console.error(err.message);
    res.status(403).send()
  }
});

//Get account data
customersRouter.post('/myaccount', authenticateToken, async(req, res) => {
  try {
    const id = req.user;
    const addresses = await getAddressData(id);
    const basicDataFromDB = await getBasicCustomerDataById(id)
    const {email, first_name, last_name} = await basicDataFromDB;
    const basicData = await {
      email: email,
      first_name: first_name,
      last_name: last_name
    }
    res.json({addresses: addresses, basic_data: basicData})
  } catch (err) {
    res.status(403).send()
  }
});

// REGISTRATION

customersRouter.post('/register', hashPassword ,async(req, res) => {
  try { 
    const { email } = req.body;
    const emailAlreadyExists = await checkEmailExists(email)
    if(emailAlreadyExists) {
      res.status(406).send()
    }
    const userId = await registerUser(req.body, req.pw)
    if(await userId) {
      const accessToken = generateAccessToken(userId);
      res.json({accessToken: accessToken})
    } else {
      throw new Error
    }
  } catch (err) {
    res.status(406).send();
  }
});

