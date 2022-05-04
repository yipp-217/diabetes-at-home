const User = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')


const getPatientUser = async (req, res, next) => {
    try {
        // Pat's object id
        const patientUser = await Patient.findOne({email:'pat@patient.com'}).lean()
        return res.render('patient_main.hbs', {user: patientUser})
    }
    catch (e) {
        return next(e)
    }
}

const getPatientUserEdit = async (req, res, next) => {
    try {
        // Pat's object id
        const patientUser = await Patient.findOne({email:'pat@patient.com'}).lean()
        return res.render('patient_edit_data.hbs', {user: patientUser})
    }
    catch (e) {
        return next(e)
    }
}

const updateBloodGlucose = async (req, res, next) => {
    try {
        console.log(req.body.dateTime)
        await Patient.findOneAndUpdate({email:'pat@patient.com'},
            {$set: {
                    bloodGlucose: req.body.bloodGlucoseValue,
                    bloodGlucoseComment: req.body.bloodGlucoseComment,
                    bloodGlucoseRecordDateTime: getDateTime()}}).lean()
        console.log(req.body.bloodGlucoseValue)
        return res.redirect('/patient/edit-data')
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
        return res.render('patient_leaderboard.hbs')
    }
    catch (e) {
        return next(e)
    }
}

const getPatientSettings = async (req, res, next) => {
    try {
        return res.render('settings.hbs')
    }
    catch (e) {
        return next(e)
    }
}

const getPatientChangePassword = async (req, res, next) => {
    try {
        return res.render('change_password.hbs')
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
