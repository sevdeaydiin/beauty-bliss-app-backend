const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Favorite = require("../models/favorite")


exports.addFavorite = catchAsyncErrors(async (req, res, next) => {

    const productId = req.body.productId
    const userId = req.body.userId
    const _favorite = await Favorite.findOne({ productId: productId, userId: userId })

    try {
        if(!_favorite) {
            const favorite = await Favorite.create({
                productId: productId,
                userId: userId
            })
            await favorite.save()
            res.status(201).send(favorite)
        } else {
            res.status(400).send('This product has already been added')
        } 
    } catch (e) {
        res.status(500).send(e)
    }
   next()
})

exports.getFavorite = catchAsyncErrors(async (req, res, next) => {
    try {
        const favorite = await Favorite.find({})
        res.send(favorite)
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.deleteFavorite = catchAsyncErrors(async (req, res, next) => {

    try {
        // id: sepet id si
        const favorite = await Favorite.findById(req.params.id)
        console.log(favorite)
        if(!favorite) {
            return res.status(400).send('Favorite is empty!')
        } else {
            await favorite.updateOne({ isActive: false })
            return res.status(200).send({message: 'Deleted successfully'})
        }
    } catch (e) {
        res.status(500).send(e)
    }
})