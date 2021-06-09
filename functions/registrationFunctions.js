const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../db');

const checkEmailExists = async (email) => {
  console('insider check email function')
 const serverQuery = await pool.query("SELECT email FROM customers WHERE email = $1", [email]);
 const data = await serverQuery.rows[0];
 if(await data) {
  return true
 } else {
  return false
 }
}

const registerUser = async(data, password) => {
 const { first_name, last_name, email, address_1, address_2, postal_town, post_code, country } = data;
 console(`Step 3: email ${email}, first_name ${first_name}, last_name ${last_name}, password ${password}.`)
 const customerData = await pool.query("INSERT INTO customers (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING id", [email, first_name, last_name, password]);
 const customer_id = await customerData.rows[0].id;
 console.log(`Step 4: customer data ${customer_id}`)
 const addressData = await pool.query("INSERT INTO addresses (customer_id, address_1, address_2, postal_town, post_code, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", [customer_id, address_1, address_2, postal_town, post_code, country]);
 const address_id = await addressData.rows[0].id;
  if(address_id) {
    return customer_id
  }
  return null
}

module.exports = { checkEmailExists, registerUser }