const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')
const cdb = require('../test-data/clinicians')


const getClinicianDashboard = async (req, res, next) => {
    res.render('dashboard.hbs', )
}

const getPatientData = async (req, res, next) => {
    try {
        const patients = await Patient.find({clinician: "626908e2af5e8168d1c69f0c"}).lean()
        console.log(patients)
    }   
    catch (err){
        console.log(err)
    }
    
}

const getPatientsData = async (req, res, next) => {
    try {
        // Chris's object id
        const patients = await Patient.find({clinician: "626908e2af5e8168d1c69f0c"}).lean()
        return res.render('clinician-dashboard.hbs', {patients: patients})
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    getClinicianDashboard,
    getPatientData,
    getPatientsData
}
