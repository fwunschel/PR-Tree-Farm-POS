const mongoose = require('mongoose');
const products = require('./products');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number
    },
    itemTotal: {
        type: Number
    },
    tip: {
        type: Number
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    custom: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['trees', 'decorations', 'apparel', 'food', 'other']
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    company: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})



module.exports = mongoose.model('Sale', salesSchema);