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

const getPatientUserEdit = async (req, res, next) => {
    try {
        // Pat's object id
        let patientUser = await Patient.findOne({email:'pat@patient.com'}).lean()
        return res.render('patient_edit_data.hbs', {user: patientUser})
    }
    catch (e) {
        return next(e)
    }
}

const updateBloodGlucose = async (req, res, next) => {
    try {
        // let patientUser = await Patient.findOne({email:'pat@patient.com'}).lean()
        let patientUser = await Patient.findOneAndUpdate({email:'pat@patient.com'}, {$set: {bloodGlucose: req.body.bloodGlucoseValue}}).lean()
        console.log(req.body.bloodGlucoseValue)
        return res.redirect('/patient/edit-data')
    }
    catch (e) {
        return next(e)
    }
}

module.exports = {
    getPatientUser,
    getPatientUserEdit,
    updateBloodGlucose
}
