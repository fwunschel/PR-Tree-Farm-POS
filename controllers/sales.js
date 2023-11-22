const Sale = require('../models/sales');
const User = require('../models/users');

module.exports.allSales = async (req, res) => {
    const timeline = 'All'
    const allSales = await Sale.find({ user: req.user._id }).populate('cart')
    res.render('sales/salesHistory', { sales: allSales, timeline });
}

module.exports.todaySales = async (req, res) => {
    const todayDate = new Date();
    const timeline = 'Today\'s'
    const allSales = await Sale.find({
        user: req.user._id,
        date: {
            $gte: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDay()),
        }
    }).populate('cart')
    res.render('sales/salesHistory', { sales: allSales, timeline });
}

module.exports.checkSale = async (req, res) => {
    const { saleId } = req.params;
    const order = await Sale.findById(saleId).populate('cart');
    res.render('sales/finalReceipt', { order });

}


module.exports.addSale = async (req, res) => {
    const populated = await req.user.populate('cart');
    let itemTotal = 0
    for (items of populated.cart) itemTotal += items.price
    for (items of populated.custom) itemTotal += items.price
    let totalPrice = itemTotal + parseInt(req.body.tip)
    var today = new Date();
    const order = new Sale({ date: today, totalPrice, tip: req.body.tip, itemTotal, cart: req.user.cart, custom: req.user.custom, company: req.user.company, user: req.user });
    await order.save()
    await User.findByIdAndUpdate(req.user._id, { $set: { cart: [], custom: [] } })
    res.render('sales/finalReceipt', { order });

}

module.exports.deleteSale = async (req, res, next) => {
    const { saleid } = req.params;
    const deleted = await Sale.findByIdAndDelete(saleid)
    req.flash('success', `Sale Number ${saleid} has been deleted`)
    res.redirect('/sales/all')
}