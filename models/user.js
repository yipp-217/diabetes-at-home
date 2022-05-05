const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

/* User properties */
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    secret: { type: String, required: true },
    nameFamily: {type: String, required: true},
    nameGiven: String,
    nameScreen: {type: String, required: true},
    yearBorn: Number,
    bio: String,

    onModel: {type: String, enum: ['Clinician', 'Patient']},
    model: {type: mongoose.Schema.Types.ObjectId, refPath:'onModel'}
})

/* password comparison */
userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

const SALT_FACTOR = 10

userSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }
    
    /* hash */
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}
