const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order