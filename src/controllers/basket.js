const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Basket = require("../models/basket")


exports.addBasket = catchAsyncErrors(async (req, res, next) => {

    const basket = new Basket({
        ...req.body,
        userId: req.params.id
    })

    try {
        await basket.save()
        res.status(201).send(basket)
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.getBasket = catchAsyncErrors(async (req, res, next) => {
    try {
        const basket = await Basket.find({})
        res.send(basket)
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.updateBasket = catchAsyncErrors(async (req, res, next) => {

})

exports.deleteBasket = catchAsyncErrors(async (req, res, next) => {

    try {
        // id: sepet id si
        const basket = await Basket.findByIdAndDelete(req.params.id)
        if(!basket) {
            return res.status(400).send('Basket is empty!')
        } else {
            return res.status(200).send('Deleted successfully')
        }
    } catch (e) {
        res.status(500).send(e)
    }
})
