const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../utilities/middleware.js');
const sales = require('../controllers/sales');//controller methods

router.get('/all', isLoggedIn, catchAsync(sales.allSales))

router.get('/today', isLoggedIn, catchAsync(sales.todaySales))

router.get('/:saleId', isLoggedIn, catchAsync(sales.checkSale))

router.post('/', isLoggedIn, catchAsync(sales.addSale))

router.delete('/delete/:saleid', isLoggedIn, catchAsync(sales.deleteSale))


module.exports = router;