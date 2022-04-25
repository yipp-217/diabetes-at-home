const mongoose = require('mongoose')

/* User properties */
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    nameFamily: {type: String, required: true},
    nameGiven: {type: String},
    nameScreen: {type: String, required: true},
    yearBorn: {type: Number},
    bio: String,
    userType: {type: String, enum: ['patient', 'clinician']}
})


const User = mongoose.model('User', userSchema)
module.exports = {User}
