const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../utilities/middleware.js');
const cart = require('../controllers/cart');//controller methods

router.get('/', isLoggedIn, catchAsync(cart.getCart))

router.post('/', isLoggedIn, catchAsync(cart.addItem))

router.delete('/:indexId', isLoggedIn, catchAsync(cart.deleteItem))


router.post('/custom', catchAsync(cart.customAdd))

router.delete('/custom/:indexId', catchAsync(cart.customDelete))

module.exports = router;