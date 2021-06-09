const accountRouter = require('express').Router();
const pool = require('../db');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { deleteAddress, getAddressData, getBasicCustomerDataById, changePassword, addNewAddress, updateAddress} = require('../functions/customerFunctions');
const { getOrderData } = require('../functions/orderFunctions')
const { authenticateToken, passwordChangeCheck, hashPassword  } = require('../functions/middleware');



module.exports = accountRouter;

accountRouter.use(cors())
accountRouter.use(express.json())

//Change PW
accountRouter.put('/password', authenticateToken, passwordChangeCheck, hashPassword, async(req, res) => {
  try {
    if (req.pwChangeCheck) {
      const change = await changePassword(req.pw, req.user);
      if(change) {
        res.status(200).send(true)
      }
    }
    res.status(403).send()
  } catch (err) {
    res.status(403).send()
  }
});

//Add new address
accountRouter.post('/new_address', authenticateToken, async(req, res) => {
  try {
    await addNewAddress(req.body, req.user);
    res.status(202).send()
  } catch (error) {
    res.status(403).send()
  }
});

//Update existing address
accountRouter.post('/update_address', authenticateToken, async(req, res) => {
  try {
    await updateAddress(req.body, req.user);
    if(await updateAddress) {
      res.status(202).send()
    } else {
      res.status(403).send()
    }  
  } catch (error) {
    res.status(403).send()
  }
});

//Get account data
accountRouter.post('/myaccount', authenticateToken, async(req, res) => {
  try {
    const id = req.user;
    const addresses = await getAddressData(id);
    const basicDataFromDB = await getBasicCustomerDataById(id);
    const orderData = await getOrderData(id);
    const {email, first_name, last_name} = await basicDataFromDB;
    const basicData = await {
      email: email,
      first_name: first_name,
      last_name: last_name
    }
    res.json({addresses: addresses, basic_data: basicData, order_data: orderData})
  } catch (err) {
    res.status(403).send()
  }
});

accountRouter.delete('/delete_address', authenticateToken, async(req, res) => {
  try {
    deleteAddress(req.body.address_id, req.user);
    res.status(202).send()
  } catch (err) {
    res.status(403).send()
  }
})

