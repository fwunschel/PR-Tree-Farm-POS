const express = require('express');
const router = express.Router();
// const campgrounds = require('../controllers/p');//controller methods

const POS = require('../controllers/POS');//controller methods

const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../utilities/middleware.js');

router.get('/', isLoggedIn, catchAsync(POS.getPOS))

router.get('/tip', isLoggedIn, catchAsync(POS.getTip))

router.get('/:catagory', isLoggedIn, catchAsync(POS.getCats))

router.get('/:catagory/:itemName', isLoggedIn, catchAsync(POS.getItems))

router.get('/:catagory/:itemName/custom', isLoggedIn, catchAsync(POS.getCustom))



module.exports = router;