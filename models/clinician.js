const mongoose = require('mongoose')

const User = require('./user')

const schema = new mongoose.Schema({
    /* define clinician */
    user_properties: [User],
    patients: [String]
})

const Clinician = mongoose.model('Clinician', schema)
module.exports = Clinician
