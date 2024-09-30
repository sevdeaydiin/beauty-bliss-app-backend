const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/user")

exports.profilePicture = catchAsyncErrors(async (req, res, next) => {
    try {
        
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error('The user doesnt exists')
        }
    
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch(e) {
        res.status(404).send(e)
    }
})