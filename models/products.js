const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./users');

const productSchema = new Schema({
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
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Product', productSchema);