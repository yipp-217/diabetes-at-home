const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_properties: [User],
    patients: [String]
})

const Clinician = mongoose.model('Clinician', schema)
module.exports = Clinician
