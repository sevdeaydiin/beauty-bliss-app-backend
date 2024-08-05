const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
        type: Buffer
    },
    product_info: {
        type: String,
        trim: true
    },
    stock: {
        type: Boolean
    }
}, {
    timestamps: true
})

favoriteSchema.virtual('favorites', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'product'
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product