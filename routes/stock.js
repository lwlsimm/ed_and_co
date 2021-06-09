const stockRouter = require('express').Router();
const pool = require('../db');

module.exports = stockRouter;

stockRouter.get('/', async (req, res) => {
  try { 
    const data = await pool.query("SELECT * FROM stock");
    res.json(data.rows);
  } catch (err) {
    console.error(err.message)
  }
})