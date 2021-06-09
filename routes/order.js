const orderRouter = require('express').Router();
const pool = require('../db');
const cors = require('cors');
const express = require('express');
const { authenticateToken } = require('../functions/middleware');
const { queryOrderAddress, payAmountMatches, createOrder, queryOrderCustomer, getStockItems } = require('../functions/orderFunctions')
require('dotenv').config();

module.exports = orderRouter;

orderRouter.use(cors())
orderRouter.use(express.json());

orderRouter.post('/single_order', authenticateToken, async(req, res) => {
  const customer_id = req.user;
  const {order_id} = req.body;
  const orderDetails = await queryOrderCustomer(customer_id, order_id);
  if(orderDetails) {
    const stockItems = await getStockItems(order_id)
    const order_data = {
      order: orderDetails,
      order_items: stockItems
    }
    res.send(order_data)
  }
  res.send()
})

orderRouter.post('/', authenticateToken , async (req, res) => {
  
  const { name, address_id, price } = req.body;
  const cart = req.body.cart.filter(item => item.qty > 0);
  try { 
    if(! queryOrderAddress(req.user, address_id) || !payAmountMatches(price, cart)) {
      res.status(403).send
    }
    const orderSuccess = await createOrder(address_id, req.user, cart, price, name);
    if(await orderSuccess) {
      res.status(201).send('Success')
    }
  } catch (err) {
    console.error(err.message);
    res.status(403).send;
  }
})