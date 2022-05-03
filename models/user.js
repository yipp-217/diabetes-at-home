const mongoose = require('mongoose')

/* User properties */
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    nameFamily: {type: String, required: true},
    nameGiven: String,
    nameScreen: {type: String, required: true},
    yearBorn: Number,
    bio: String,

    onModel: {type: String, enum: ['Clinician', 'Patient']},
    model: {type: mongoose.Schema.Types.ObjectId, refPath:'onModel'}
})


const User = mongoose.model('User', userSchema)

module.exports = {
    User
}
