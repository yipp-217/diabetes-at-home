const mongoose = require('mongoose')

/* Clinician User */
const clinicianSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    nameFamily: {type: String, required: true},
    nameGiven: {type: String},
    nameScreen: {type: String, required: true},
    yearBorn: {type: Number},
    bio: String,

    patients: {type: [mongoose.Schema.Types.ObjectId], ref: 'Patient'}
})


const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = Clinician
