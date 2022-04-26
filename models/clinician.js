const mongoose = require('mongoose')

/* Clinician User */
const clinicianSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    patients: {type: [mongoose.Schema.Types.ObjectId], ref: 'Patient'}
})


const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = Clinician
