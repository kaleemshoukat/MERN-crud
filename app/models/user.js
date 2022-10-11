const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema =new Schema({
    name: {
        type: String,
        max: 255,
        required: true
    },
    email: {
        type: String,
        max: 255,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        max: 255,
        required: true,
        enum: ['Male', 'Female']
    },
    verify: {
        type: Number,
        max: 1,
        required: true,
        default: 0
    },
    password: {
        type: String,
        max: 255,
        default: null
    },
    profileImage: {
        type: String,
        max: 255,
        default: null
    },
    cgpa: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    country: {
        type: String,
        max: 255,
        required: true,
    },
    token: {
        type: String,
        default: ''
    },
    firebaseToken: {
        type: String,
        default: ''
    },
    provider: {
        type: String,
        max: 255,
        default: '',
        enum: ['google', 'facebook', '']
    },
    provider_id: {
        type: String,
        max: 255,
        default: ''
    },
},{
    timestamps: true
});

///statics vs methods: statics can be invoked by model
///methods are instance methods

UserSchema.statics.findUserByEmail = async (email) => {
    let search = { email: email }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

var User =  mongoose.model('User', UserSchema)
module.exports = User