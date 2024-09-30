const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Favorite = mongoose.model('Favorite', favoriteSchema)
module.exports = Favorite