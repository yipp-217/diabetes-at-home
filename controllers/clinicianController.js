const {Clinician} = require('../models/clinician')
const {Patient} = require('../models/patient')

const patientController = require('../controllers/patientController')


const getClinicianDashboard = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            clinician = await Clinician.findById(req.user.toJSON().model).lean()
            patients = await getPatients(clinician.patients)
            patients = await getPatientsHealthData(patients)
            return res.render('clinician-dashboard.hbs', {
                user: req.user.toJSON(), patients: patients
            })
    }
    catch (e) {
        return next(e)
    }
}

const getPatientComments = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            return res.render('clinician_dashboard_comment.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getPatient = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            return res.render('clinician_patient.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getPatientNotes = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            return res.render('clinician_patient_notes.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getPatientDataHistory = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            return res.render('clinician_data_history.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getClinicianSettings = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            return res.render('clinician_settings.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getRegisterPatient = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            return res.render('patient_register.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getPatientsHealthData = async (patients) => {
    for (let i = 0; i < patients.length; i++) {
        patients[i].patientHealthEntries = await patientController.getHealthData(patients[i])
    }
    return patients
}

const getPatients = async (patients) => {
    newPatients = []
    for (let i = 0; i < patients.length; i++) {
        newPat = await Patient.findById(patients[i]).lean()
        newPat = await Patient.findById(patients[i]).populate("user").lean()
        newPatients[i] = newPat
    }
    return newPatients
}

module.exports = {
    getClinicianDashboard,
    getPatientComments,
    getPatient,
    getPatientNotes,
    getPatientDataHistory,
    getClinicianSettings,
    getRegisterPatient,
}
