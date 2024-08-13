const sharp = require("sharp")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Product = require("../models/product")

exports.postProduct = catchAsyncErrors(async (req, res, next) => {

    const product = new Product({
        ...req.body,
        //product: req.product._id
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.uploadImage = catchAsyncErrors(async (req, res, next) => {

    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            throw new Error('Cannot find the product');
        }

        const buffer = await sharp(req.file.buffer)
            .resize({ width: 350, height: 350 })
            .png()
            .toBuffer();

        product.image = buffer;
        await product.save();
        res.status(200).send({ product });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

exports.getProduct = catchAsyncErrors(async (req, res, next) => {

    try {
        const products = await Product.find({})
        res.send(products)

    } catch(e) {
        res.status(500).send(e)
    }
})

exports.getImage = catchAsyncErrors(async (req, res, next) => {

    try {
        const tweet = await Tweet.findById(req.params.id)

        if(!tweet || !tweet.image) {
            throw new Error('Tweet image doesnt exists')
        }

        res.set('Content-Type', 'image/jpg')
        res.send(tweet.image)

    } catch(e) {
        res.status(404).send(e)
    }
})