const Product = require('../models/products');//controller methods


module.exports.getCart = async (req, res, next) => {
    console.log(req.user)
    const populated = await req.user.populate('cart')
    res.render('POS/cart', { populated });
}

module.exports.addItem = async (req, res, next) => {
    const addedProd = await Product.findById(req.body.item);
    req.user.cart.push(addedProd)
    await req.user.save()
    req.flash('success', ` Successfully Added a ${addedProd.name} to the cart`)
    res.redirect('/POS');
}



module.exports.deleteItem = async (req, res) => {
    const { indexId } = req.params;
    console.log(req.user.cart)
    const cartUpdate = Object.values(req.user.cart)
    cartUpdate.splice(indexId, 1)
    req.user.cart = cartUpdate
    await req.user.save()
    res.redirect('/cart')
}

module.exports.customAdd = async (req, res) => {
    const { item } = req.body
    req.user.custom.push(item)
    await req.user.save()
    req.flash('success', `Successfully Added a Custom ${item.name}`)
    res.redirect('/POS')
}

module.exports.customDelete = async (req, res) => {
    const { indexId } = req.params;
    console.log(req.user.custom)
    const customUpdate = Object.values(req.user.custom)
    customUpdate.splice(indexId, 1)
    req.user.custom = customUpdate
    await req.user.save()
    req.flash('success', 'Custom Item Successfully Deleted')
    res.redirect('/cart')

}