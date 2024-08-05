const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/user")

exports.register = catchAsyncErrors(async (req, res, next) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.login = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.allUsers = catchAsyncErrors(async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

exports.fetchUser = catchAsyncErrors(async (req, res) => {
    try {
        const _id = req.params.id 
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send("User not found!")
        } else {
            res.status(200).send(user)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})