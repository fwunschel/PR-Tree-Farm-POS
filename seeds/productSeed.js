const Product = require('../models/products');
const mongoose = require('mongoose');
const prodUrl = "mongodb+srv://insert_seed_here!@pr-tree-farm.o3llpdj.mongodb.net/?retryWrites=true&w=majority" || 'mongodb://127.0.0.1:27017/PR-tree-farm'
//remember to start up mongo db using brew service start mongodb-community@7.0 in terminal
mongoose.connect(prodUrl)
    .then(() => {
        console.log('Mongo Connection Open');
    }).catch(err => {
        console.log('Oh No Mongo Error');
        console.log('make sure it\'s running')
        console.log(err)
    });


const treeTypes = ['Balsam fir', 'Faser Fir', 'Douglas Fir', 'Grand Fir', 'White Spruce', 'Blue Spruce'];
const treeOptions = [{ size: 5, price: 20 },
{ size: 6, price: 30 },
{ size: 7, price: 40 },
{ size: 8, price: 50 },
{ size: 9, price: 60 },
{ size: 10, price: 70 }]
Trees = []
for (trees of treeTypes) {
    for (options of treeOptions) {
        console.log(trees)
        Trees.push({ name: trees, type: 'trees', ...options });
    }
}


const NTProducts = [{ name: 'Pulpit Rock Farm Hat', type: 'apparel', size: 'Universal', price: 25.00 },
{ name: 'Wreath', type: 'decorations', size: 'Small', price: 25.00 },
{ name: 'Wreath', type: 'decorations', size: 'Large', price: 40.00 }]

AllProducts = Trees.concat(NTProducts)



const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(AllProducts);
    console.log('Products Added');
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Mongoose Connection Closed')
})
    .catch(err => {
        console.log('Oh No there\'s an error');
        console.log(err)
    });

