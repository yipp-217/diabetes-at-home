const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')
const cdb = require('../test-data/clinicians')


const getPatientData = async (req, res, next) => {
    try {
        const patients = await Patient.find({clinician: "626908e2af5e8168d1c69f0c"}).lean()
        console.log(patients)
    }   
    catch (err){
        console.log(err)
    }
    
}


module.exports = {
    getPatientData
}
