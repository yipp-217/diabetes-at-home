const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')


const getClinicianDashboard = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else
            return res.render('clinician-dashboard.hbs', {user: req.user.toJSON()})
        // Chris's object id
        //const clinician = await Clinician.findOne({email: 'chris@mail.com'}).lean()
        //const patients = await Patient.find({clinician: "0001"}).lean()
        //return res.render('clinician-dashboard.hbs', {user: clinician, patients: patients})
        //return res.render('clinician-dashboard.hbs', {
        //    user: {
        //        nameScreen: "Dr. Chris"
        //    }, 
        //    patients: {
        //        patient1: {
        //            nameGiven: "Pat",
        //            nameFamily: "Patient",
        //            bloodGlucose: 3,
        //            bloodGlucoseLowerThreshold: 1,
        //            bloodGlucoseUpperThreshold: 5
        //        }
        //    }
        //})
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
        //const patients = await Patient.find({clinician: "0001"}).lean()
        //return res.render('dashboard_comment.hbs', {patients: patients})
        //return res.render('clinician_dashboard_comment.hbs')
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

module.exports = {
    getClinicianDashboard,
    getPatientComments,
    getPatient,
    getPatientNotes,
    getPatientDataHistory,
    getClinicianSettings,
    getRegisterPatient,
}
