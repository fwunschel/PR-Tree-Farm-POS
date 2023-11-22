const express = require('express');
const router = express.Router();
const products = require('../controllers/products');//controller methods

const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../utilities/middleware.js');



router.get('/index', isLoggedIn, catchAsync(products.showIndex))

router.get('/add/:catagory', isLoggedIn, catchAsync(products.showAddGeneral))

router.get('/add/apparel/:option', isLoggedIn, catchAsync(products.showAddApparel))

router.get('/edit/:productName', isLoggedIn, catchAsync(products.showEditItem))

router.put('/edit', isLoggedIn, catchAsync(products.editProduct))

router.post('/', isLoggedIn, catchAsync(products.addProduct))

router.delete('/delete/:productName', isLoggedIn, catchAsync(products.deleteProduct))

module.exports = router;