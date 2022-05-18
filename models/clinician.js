const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


/* Clinician User */
const clinicianSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    patients: [ObjectId]
})


const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = {
    Clinician
}