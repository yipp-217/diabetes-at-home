const {Patient} = require('../models/patient')
const {HealthDataEntry} = require('../models/patient')

const { validationResult } = require('express-validator');

const patientController = require('../controllers/patientController')

const getPatientUserEdit = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            let patient = await patientController.getPatient(req.user.toJSON().model)
            let engagementRate = await patientController.calculateEngagement(patient)
            await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()
            healthData = await patientController.getHealthData(patient)
            return res.render('patient_edit_data.hbs', {
                user: req.user.toJSON(), patient: patient, healthData: healthData, darkMode: req.user.darkMode
            })
        }
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect('/patient/edit-data')
            }
            today = patientController.getDateTime()
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect('/patient/edit-data')
            }
            today = patientController.getDateTime()
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect('/patient/edit-data')
            }
            today = patientController.getDateTime()
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect('/patient/edit-data')
            }
            today = patientController.getDateTime()
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

const displayDate = (x) => {
    const time = x.substring(11, 16);
    const which12hour = x.substring(19);
    return time.concat(which12hour);
}

module.exports = {
    getPatientUserEdit,
    updateBloodGlucose,
    updateWeight,
    updateExercise,
    updateInsulin,
}