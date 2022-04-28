const mongoose = require('mongoose')

/* Clinician User */
const clinicianSchema = new mongoose.Schema({
    // user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},

    /* user properties */
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    nameFamily: {type: String, required: true},
    nameGiven: String,
    nameScreen: {type: String, required: true},
    yearBorn: Number,
    bio: String,
    /* ----- */

    // patients: {type: [mongoose.Schema.Types.ObjectId], ref: 'Patient'}
})


const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = Clinician
