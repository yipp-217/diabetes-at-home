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

const getPatientUserEdit = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            patient = await Patient.findById(req.user.toJSON().model).lean()
            healthData = await getHealthData(patient)
            return res.render('patient_edit_data.hbs', {
                user: req.user.toJSON(), patient: patient, healthData: healthData
            })
    }
    catch (e) {
        return next(e)
    }
}

const getDateTime = () => {
    const today = new Date().toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});
    return today;
}

const displayDate = (x) => {
    const time = x.substring(11, 16);
    const which12hour = x.substring(19);
    return time.concat(which12hour);
}

const getHealthData = async (patient) => {
    for (let i = 0; i < patient.patientHealthEntries.length; i++) {
        data = await HealthDataEntry.findById(patient.patientHealthEntries[i]).lean()
        today = getDateTime().slice(0, 10)
        if (today === data.date) {
            return data
        }
    }
    return null
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

const updateBloodGlucose = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueBloodGlucoseLevel: req.body.bloodGlucoseValue,
                    commentBloodGlucoseLevel: req.body.bloodGlucoseComment,
                    timeBloodGlucoseLevel: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueBloodGlucoseLevel: req.body.bloodGlucoseValue,
                        commentBloodGlucoseLevel: req.body.bloodGlucoseComment,
                        timeBloodGlucoseLevel: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
    }
    catch (e) {
        return next(e)
    }
}

const updateWeight = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueWeight: req.body.weightValue,
                    commentWeight: req.body.weightComment,
                    timeWeight: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueWeight: req.body.weightValue,
                        commentWeight: req.body.weightComment,
                        timeWeight: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
    }
    catch (e) {
        return next(e)
    }
}

const updateExercise = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueExercise: req.body.exerciseValue,
                    commentExercise: req.body.exerciseComment,
                    timeExercise: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueExercise: req.body.exerciseValue,
                        commentExercise: req.body.exerciseComment,
                        timeExercise: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
    }
    catch (e) {
        return next(e)
    }
}

const updateInsulin = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueDosesOfInsulinTaken: req.body.dosesOfInsulinValue,
                    commentDosesOfInsulinTaken: req.body.dosesOfInsulinComment,
                    timeDosesOfInsulinTaken: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueDosesOfInsulinTaken: req.body.dosesOfInsulinValue,
                        commentDosesOfInsulinTaken: req.body.dosesOfInsulinComment,
                        timeDosesOfInsulinTaken: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
    }
    catch (e) {
        return next(e)
    }
}

module.exports = {
    getPatientUser,
    getPatientUserEdit,
    getLeaderboard,
    getPatientSettings,
    getPatientChangePassword,
    updateBloodGlucose,
    updateWeight,
    updateExercise,
    updateInsulin,
}
