const Product = require('../models/products');//models

const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../utilities/middleware.js');


module.exports.getPOS = async (req, res) => {
    const cats = await Product.find({}).distinct('type')
    res.render('POS/catagory', { cats });
}

module.exports.getTip = async (req, res) => {
    const populated = await req.user.populate('cart');
    let itemTotal = 0;
    for (items of populated.cart) itemTotal += items.price;
    res.render('POS/tip', { itemTotal })
}

module.exports.getCats = async (req, res) => {

    const { catagory } = req.params
    const cats = await Product.find({}).distinct('type')
    const prodOptions = await Product.find({ type: catagory }).distinct('name')
    res.render('POS/products', { options: prodOptions, catagory, cats });
}

module.exports.getItems = async (req, res) => {
    const { catagory, itemName } = req.params;
    const products = await Product.find({ name: itemName })
    const cats = await Product.find({}).distinct('type')
    const prodOptions = await Product.find({ type: catagory }).distinct('name')
    res.render('POS/select', { options: prodOptions, catagory, cats, products, itemName });
}

module.exports.getCustom = async (req, res) => {
    const { catagory, itemName } = req.params
    res.render('POS/custom', { catagory, itemName })
}