const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Order = require("../models/order")


exports.addOrder = catchAsyncErrors(async (req, res, next) => {

    const order = new Order({
        ...req.body,
        userId: req.params.id
    })

    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.getOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.find({})
        res.send(order)
    } catch (e) {
        res.status(500).send(e)
    }
})
/*
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
})*/