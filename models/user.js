const mongoose = require('mongoose')

const DOB = new mongoose.Schema({
    year: {type: Number, required: true},
    month: Number,
    day: Number
})

const user = new mongoose.Schema({
    /* define user properties */
    id: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String, required: true},
    screenName: {type: String, required: true},
    dataOfBirth: {type: DOB, required: true},
    bio: String
})

module.exports = user
