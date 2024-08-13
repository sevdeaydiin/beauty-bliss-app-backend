const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: Buffer,
    },
    productInfo: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    stock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

/* productSchema.virtual('favorites', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'product'
}) */    

const Product = mongoose.model('Product', productSchema)
module.exports = Product