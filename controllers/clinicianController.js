const {Clinician} = require('../models/clinician')
const {Patient} = require('../models/patient')
const {ClinicianNote} = require('../models/patient')
const {HealthDataEntry} = require('../models/patient')
const {User} = require('../models/user')

const patientController = require('../controllers/patientController')

const { validationResult } = require('express-validator');

const getClinicianDashboard = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else {
            clinician = await Clinician.findById(req.user.model)
            patients = await getPatients(clinician.patients)
            patients = await getPatientsHealthData(patients)
            
            return res.render('clinician_dashboard.hbs', {
                user: req.user.toJSON(), patients: patients, darkMode: req.user.darkMode
            })
        }
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
            clinician = await Clinician.findById(req.user.toJSON().model).lean()
            patients = await getPatients(clinician.patients)
            patients = await getPatientsHealthData(patients)
            return res.render('clinician_dashboard_comment.hbs', {
                user: req.user.toJSON(), patients: patients, darkMode: req.user.darkMode
            })
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
            return res.render('clinician_settings.hbs', {user: req.user.toJSON(), darkMode: req.user.darkMode})
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
            return res.render('patient_register.hbs', {user: req.user.toJSON(), darkMode: req.user.darkMode})
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

const getClinician = async (user) => {
    return await Clinician.findById(user).lean()
}

const turnOnDarkMode = async(req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        }else{
            const clinician = await getClinician(req.user.toJSON().model)
            const data = await User.findById(clinician.user).lean()
            
            if (data.darkMode == true){
                await User.findOneAndUpdate({_id: data._id}, {$set: {darkMode: false}}).lean()
            } else{
                await User.findOneAndUpdate({_id: data._id}, {$set: {darkMode: true}}).lean()
            }
            console.log("Dark mode: " + data.darkMode)
            res.redirect('/clinician/settings')
        }
    } 
    catch(e){
        return next(e)
    }
}

module.exports = {
    getClinicianDashboard,
    getPatientComments,
    getClinicianSettings,
    getRegisterPatient,
    turnOnDarkMode,
}
