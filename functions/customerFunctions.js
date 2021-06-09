const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../db');
const bcrypt = require('bcryptjs');

const generateAccessToken = (email) => {
  const exp = 60 * 60 * 2
  return jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET,  {expiresIn: exp} )
}

const createRefreshToken = (email) => {
  return jwt.sign(email, process.env.REFRESH_TOKEN_SECRET)
}

const getBasicCustomerData = async (email) => {
    const customerData = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);
    const customer = customerData.rows[0];
    return customer;
}

const getBasicCustomerDataById = async (id) => {
    const customerData = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
    const customer = customerData.rows[0];
    return customer;
}

const getAddressData = async (id) => {
  const data = await pool.query("SELECT id, address_1, address_2, postal_town, post_code, country FROM addresses WHERE customer_id = $1", [id]);
  const addresses = await data.rows
  return addresses
}

const changePassword = async (pw, id) => {
  try {
    pool.query("UPDATE customers SET password = $1 WHERE id = $2", [pw, id]);
    return true
  } catch (error) {
    return false
  }
}

const addNewAddress = async (data, id) => {
  const {address_1, address_2, postal_town, post_code, country } = data;
  pool.query("INSERT INTO addresses (customer_id, address_1, address_2, postal_town, post_code, country) VALUES ($1, $2, $3, $4, $5, $6)",[id, address_1, address_2, postal_town, post_code, country])
  return
}

const updateAddress = async (data, id) => {
  const {address_key, address_1, address_2, postal_town, post_code, country } = data;
  const currentAddData = await pool.query("SELECT * FROM addresses WHERE id = $1", [address_key]);
  const customerIDfromDB = await currentAddData.rows[0]['customer_id'];
  const doesAddBelongtoUser = await customerIDfromDB === id ? true: false;
  if(await doesAddBelongtoUser) {
    pool.query("UPDATE addresses SET address_1 = $1, address_2 = $2, postal_town = $3, post_code = $4, country = $5", [address_1, address_2, postal_town, post_code, country ]);
    return true
  } 
  return false
}

const deleteAddress = async (address_id, customer_id) => {
  pool.query('DELETE FROM addresses WHERE id = $1 AND customer_id = $2', [address_id, customer_id])
  return
}

module.exports = { deleteAddress, addNewAddress, generateAccessToken, createRefreshToken, getBasicCustomerData, getAddressData, getBasicCustomerDataById, changePassword, updateAddress}