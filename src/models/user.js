const mongoose  = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLenght: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "password"')
            }
        }
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: String,
        default: "00/00/0000",
        trim: true
    },
    gender: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    orders: {
        type: Array,
        default: []
    },
    favorites: {
        type: Array,
        default: []
    },
    clubScore: {
        type: Number,
        default: 0,
        trim: true
    },
    clubNo: {
        type: Number,
        default: 0,
        trim: true
    }
})

// userSchema.virtual('favorites', {
//     ref: 'Favorite',
//     localField: '_id',
//     foreignField: 'user'
// })

userSchema.methods.toJson = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    return userObject
}

userSchema.pre('save', async function(next){
    const user = this 

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password) 

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'bbapi') 
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
} 

const User = mongoose.model('User', userSchema)
module.exports = User