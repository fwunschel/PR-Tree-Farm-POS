const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: {
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
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);