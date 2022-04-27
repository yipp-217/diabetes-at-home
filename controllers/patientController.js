const User = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')


const getPatientUser = async (req, res, next) => {
    try {
        // Pat's object id
        const patientUser = await Patient.findOne({email:'pat@patient.com'}).lean()
        console.log(patientUser)
        return res.render('patient_main.hbs', {user: patientUser})
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    getPatientUser
}
