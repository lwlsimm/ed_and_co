const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../db');

const getOrderData = async (id) => {
  try {
    const data = await pool.query("SELECT * FROM orders WHERE customer_id = $1", [id]);
    const orderData = await data.rows;
    return orderData;
  } catch (err) {
    return {} 
  }
}

const queryOrderAddress = async (id, address_id) => {
  try {
    const data = await pool.query("SELECT customer_id FROM addresses WHERE id = $1", [address_id]);
    const customerIdFromAddress = await data.rows[0]['customer_id']
    if(id === await customerIdFromAddress) {
      return true
    }
    return false
  } catch (error) {
    return false
  } 
}

const payAmountMatches = async (amount, cart) => {
  try {
    const cartAmounts = await cartTotals(cart);
    let grandTotalFromDb = 0
    await cartAmounts.map(item => {
      grandTotalFromDb = grandTotalFromDb + item.total
    });
    if(await grandTotalFromDb === amount) {
      return true;
    }
    return false
  } catch (error) {
    return false
  }
}

const cartTotals = async (cart) => {
  const promises = cart.map(async (item) => {
      const data = await pool.query("SELECT price FROM stock WHERE id = $1", [item.id]);
      const price = await data.rows[0]['price'];
      const total = await price * item.qty;
      return {
          total: await total
      }
  });
  return Promise.all(promises);
}

const createOrder = async (address_id, customer_id, cart, price, addressee_name) => {
    const date_created = new Date(Date.now());
    const mon = date_created.getUTCMonth()
    const day = date_created.getUTCDate()
    const year = date_created.getUTCFullYear()
    const returnedDate = `${year}-${mon}-${day}`
    const status = 'Order Received';
  try {
  const data = await pool.query("INSERT INTO orders (address_id, date_created, status, customer_id, price, addressee_name) VALUES($1, $2, $3, $4, $5, $6) RETURNING id", 
  [address_id, returnedDate, status, customer_id, price, addressee_name]);
  const orderId = await data.rows[0]['id'];
  cart.map(item => {
    pool.query("INSERT INTO order_items (order_id, stock_id, quantity, date_created, customer_id) VALUES ($1, $2, $3, $4, $5)", 
    [orderId, item.id, item.qty, returnedDate, customer_id]);
  })
  cart.map(item => {
    pool.query("UPDATE stock SET quantity = quantity - $1 WHERE id = $2", [item.qty, item.id])
  })
  return true
 } catch (err) {
  console.error(err.message)
   return false
 }
}

const queryOrderCustomer = async (customer_id, order_id) => {
  try {
    const data = await pool.query("SELECT * FROM orders WHERE id = $1", [order_id]);
    const orderDetails = await data.rows[0];
    if(orderDetails.customer_id === customer_id) {
      return orderDetails
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

const getStockItems = async (order_id) => {
  try {
    const data = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [order_id]);
    const stockData = await data.rows;
    return stockData
  } catch (err) {
    return null
  }
}


module.exports = { queryOrderAddress, payAmountMatches, createOrder, getOrderData, queryOrderCustomer, getStockItems };