const express = require('express');
const apiRouter = express.Router();
const pool = require('./db');

//Routes
const customersRouter = require('./routes/customers');
apiRouter.use('/customers',customersRouter)
const stockRouter = require('./routes/stock');
apiRouter.use('/stock',stockRouter)
const accountRouter = require('./routes/account');
apiRouter.use('/account', accountRouter)
const orderRouter = require('./routes/order');
apiRouter.use('/order', orderRouter)

module.exports = apiRouter;