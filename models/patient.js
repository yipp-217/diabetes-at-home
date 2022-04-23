const mongoose = require('mongoose')

const User = require('./user')

const schema = new mongoose.Schema({
    user_properties: [User],
    clinician: String,

    data: {

    }

})

const Patient = mongoose.model('Patient', schema)
module.exports = Patient
