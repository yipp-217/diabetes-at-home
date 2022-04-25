const mongoose = require('mongoose')

/* Patient User */
const patientSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    nameFamily: {type: String, required: true},
    nameGiven: {type: String},
    nameScreen: {type: String, required: true},
    yearBorn: {type: Number},
    bio: String,

    clinician: {type: mongoose.Schema.Types.ObjectId, ref: 'Clinician'}
})


const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
