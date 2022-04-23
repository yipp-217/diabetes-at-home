const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // definition
})

const Patient = mongoose.model('Patient', schema)
module.exports = Patient
