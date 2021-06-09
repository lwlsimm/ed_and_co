const customersRouter = require('express').Router();
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const {generateAccessToken, getAddressData, getBasicCustomerDataById } = require('../functions/customerFunctions');
const { authenticateToken, hashPassword, checkPassword } = require('../functions/middleware');
//const { checkEmailExists, registerUser } = require('../functions/registrationFunctions');
const pool = require('../db');

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
      console.error(err.message);
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
  // try { 
    const { email } = req.body;
    const serverQuery = await pool.query("SELECT email FROM customers WHERE email = $1", [email]);
    const data = await serverQuery.rows[0];
    if(data) {
      res.status(406).send()
    }
    const { first_name, last_name, address_1, address_2, postal_town, post_code, country } = req.body;
    const customerData = await pool.query("INSERT INTO customers (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING id", [email, first_name, last_name, req.pw]);
    const customer_id = await customerData.rows[0].id;
    const addressData = await pool.query("INSERT INTO addresses (customer_id, address_1, address_2, postal_town, post_code, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", [await customer_id, address_1, address_2, postal_town, post_code, country]);
    const address_id = await addressData.rows[0].id;
    if(await address_id) {
      const accessToken = generateAccessToken(customer_id);
      res.json({accessToken: accessToken})
    } else {
      throw new Error
    }
  // } catch (err) {
  //   console.log(err.message)
  //   res.status(406).send();
  // }
});

