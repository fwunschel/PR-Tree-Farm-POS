const Product = require('../models/products');//models

const appOps = [{
    url: '/products/add/apparel/single',
    text: 'Single Item',
    sizes: ['Universal']
},
{
    url: '/products/add/apparel/smlg',
    text: 'Small/Large',
    sizes: ['Small', 'Large']
},
{
    url: '/products/add/apparel/full',
    text: 'Full Apparel',
    sizes: ['Small', 'Medium', 'Large', 'X Large', 'XX Large']
}]

module.exports.showIndex = async (req, res) => {
    const allProducts = await Product.find({})
    const catagories = await Product.find({}).distinct('type')
    res.render('products/show', { allProducts });
}


module.exports.showAddGeneral = async (req, res) => {

    const { catagory } = req.params;
    if (catagory == 'apparel') {
        return res.render('products/apparel', { appOps, choice: null })
    }
    const sizes = await Product.find({ type: catagory }).distinct('size')
    res.render(`products/newProduct`, { sizes, catagory });
}

module.exports.showAddApparel = async (req, res) => {
    const choice = req.url
    const a = appOps.filter(item => item.url == choice).map(ele => ele.sizes)
    res.render('products/apparel', { appOps, sizes: a[0], choice, catagory: 'Apparel' })
}

module.exports.showEditItem = async (req, res) => {
    const { productName } = req.params;
    const products = await Product.find({ name: productName })
    const catagory = await Product.find({ name: productName }).distinct('type')
    res.render(`products/productEdit`, { products, productName, catagory });
}

module.exports.editProduct = async (req, res) => {
    console.log(req.body)
    const keys = Object.keys(req.body)
    for (item of keys) {
        const updateProd = await Product.findByIdAndUpdate(req.body[item]._id, { price: req.body[item].price })
    }
    res.redirect('/products/index')
}

module.exports.addProduct = async (req, res) => {
    let keys = Object.keys(req.body);
    let fullArray = []
    for (let i = 1; i < keys.length; i++) {
        fullArray.push({ name: req.body['name'], ...req.body[keys[i]], creator: req.user._id })
    }
    const newItem = await Product.insertMany(fullArray)
    res.redirect("/products/index")
}

module.exports.deleteProduct = async (req, res, next) => {
    const { productName } = req.params
    const deleted = await Product.deleteMany({ name: productName })
    req.flash('success', `Successfully Deleted ${productName}`)
    res.redirect('/products/index')


}

