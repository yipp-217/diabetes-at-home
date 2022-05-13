const User = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')
const {HealthDataEntry} = require('../models/patient')

const getPatientUser = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            patient = await Patient.findById(req.user.toJSON().model).lean()
            healthData = await getHealthData(patient)
            return res.render('patient_main.hbs', {
                user: req.user.toJSON(), patient: patient, healthData: healthData
            })
    }
    catch (e) {
        return next(e)
    }
}

const getHealthData = async (patient) => {
    for (let i = 0; i < patient.patientHealthEntries.length; i++) {
        data = await HealthDataEntry.findById(patient.patientHealthEntries[0]).lean()
        today = getDateTime().slice(0, 10)
        if (today === data.date) {
            return data
        }
    }
}

const getPatientUserEdit = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            return res.render('patient_edit_data.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const updateBloodGlucose = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            console.log(req.body.dateTime)
            await Patient.findOneAndUpdate({email:'pat@patient.com'},
                {$set: {
                        bloodGlucose: req.body.bloodGlucoseValue,
                        bloodGlucoseComment: req.body.bloodGlucoseComment,
                        bloodGlucoseRecordDateTime: getDateTime()}}).lean()
            console.log(req.body.bloodGlucoseValue)
            return res.redirect('/patient/edit-data', {user: req.user.toJSON()})
        }
    }
    catch (e) {
        return next(e)
    }
}

function getDateTime() {
    const today = new Date().toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});
    return today;
}


const getLeaderboard = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            return res.render('patient_leaderboard.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getPatientSettings = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            return res.render('settings.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}

const getPatientChangePassword = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            return res.render('change_password.hbs', {user: req.user.toJSON()})
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    getPatientUser,
    getPatientUserEdit,
    updateBloodGlucose,
    getLeaderboard,
    getPatientSettings,
    getPatientChangePassword,
}
