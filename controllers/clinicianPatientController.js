const {Patient} = require('../models/patient')
const {ClinicianNote} = require('../models/patient')
const {HealthDataEntry} = require('../models/patient')

const patientController = require('../controllers/patientController')
const clinicianController = require('../controllers/clinicianController')

const { validationResult } = require('express-validator');

const getPatient = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else {
            let patient = await Patient.findById(req.params.id).lean()
            patient = await Patient.findById(patient).populate("user").lean()
            patient.patientHealthEntries = await patientController.getHealthData(patient)
            return res.render('clinician_patient.hbs', {
                user: req.user.toJSON(),
                patient: patient,
                darkMode: req.user.darkMode
            })
        }
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
        else {
            let patient = await Patient.findById(req.params.id).populate("user").lean()
            let notes = await getClinicianNotes(patient)
            return res.render('clinician_patient_notes.hbs', {user: req.user.toJSON(), patient: patient, notes: notes, darkMode: req.user.darkMode})
        }
    }
    catch (e) {
        return next(e)
    }
}

const getClinicianNotes = async (patient) => {
    let notes = []
    for (let i = 0; i < patient.clinicianNotes.length; i++) {
        data = await ClinicianNote.findById(patient.clinicianNotes[i]).lean()
        notes[i] = data
    }
    return notes
}

const getPatientDataHistory = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else {
            let patient = await Patient.findById(req.params.id).populate("user").lean()
            
            const oneDay = 24 * 60 * 60 * 1000
            dayCreated = patient.user.dateCreated
            today = patientController.getDateTime().substring(0,10)
            
            dateOne = new Date(dayCreated.substring(6,10), dayCreated.substring(3,5), dayCreated.substring(0,2))
            dateTwo = new Date(today.substring(6,10), today.substring(3,5), today.substring(0,2))
            diffDays = Math.round(Math.abs((dateOne - dateTwo) / oneDay)) + 1

            currDate = new Date(dayCreated.substring(6,10), dayCreated.substring(3,5), dayCreated.substring(0,2))
            nextDay = new Date(currDate)
            

            dates = []

            bloodGlucoseData = []
            weightData = []
            doseData = []
            exData = []

            nextDay.setMonth(nextDay.getMonth() - 1)
            for (let i = 0; i < diffDays; i++){
                
                dates.push(nextDay.toLocaleString().substring(0,10))
                BGfound = 0
                Wfound = 0
                Efound = 0
                Dfound = 0
                
                for (let j = 0; j < patient.patientHealthEntries.length; j++){
                    const doc = await HealthDataEntry.findById(patient.patientHealthEntries[j])
                    
                    if (doc.date == nextDay.toLocaleString().substring(0,10)){
                        if (doc.valueBloodGlucoseLevel){
                            bloodGlucoseData.push(doc.valueBloodGlucoseLevel)
                            BGfound = 1
                        }
                        if (doc.valueWeight){
                            weightData.push(doc.valueWeight)
                            Wfound = 1
                        }
                        if (doc.valueExercise){
                            exData.push(doc.valueExercise)
                            Efound = 1
                        }
                        if (doc.valueDosesOfInsulinTaken){
                            doseData.push(doc.valueDosesOfInsulinTaken)
                            Dfound = 1
                        }
                            
                    }
                
                }
                if (BGfound == 0){
                    bloodGlucoseData.push("---")
                }
                if (Wfound == 0){
                    weightData.push("---")
                }
                if (Efound == 0){
                    exData.push("---")
                }
                if (Dfound == 0){
                    doseData.push("---")
                }
                nextDay.setDate(currDate.getDate() + 1)
                currDate = nextDay
                
            }

            
            return res.render('clinician_data_history.hbs', {user: req.user.toJSON(), patient: patient, date: dates, 
                bloodGlucose: bloodGlucoseData, weight: weightData, excercise: exData, doses: doseData, darkMode: req.user.darkMode})
        }
    }
    catch (e) {
        return next(e)
    }
}

const updateSupportMsg = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect('/clinician/patient/' + patient._id)
            }
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    supportMessage: req.body.supportMsg
                }}
            ).lean()
            return res.redirect('/clinician/patient/' + patient._id)
        }
    }
    catch (e) {
        return next(e)
    }
}

const addNote = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect('/clinician/patient/' + patient._id)
            }
            newNote = await ClinicianNote.insertMany({
                time: patientController.getDateTime(),
                note: req.body.clinicianNote
            })
            newId = newNote[0]._id
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$push: {
                    clinicianNotes: newId
                }}
            ).lean()
            return res.redirect('/clinician/patient/' + patient._id)
        }
    }
    catch (e) {
        return next(e)
    }
}

const updatePatientRequirements = async (req, res, next) => {
    try {
        patient = await Patient.findById(req.params.id).populate("user").lean()
        await Patient.findOneAndUpdate(
            {_id: patient._id},
            {$set: {
                requirementWeight: (req.body.weightReq === "on"),
                requirementBloodGlucoseLevel: (req.body.bloodGlucoseReq === "on"),
                requirementExercise: (req.body.exerciseReq === "on"),
                requirementDosesOfInsulinTaken: (req.body.insulinReq === "on")
            }}
        ).lean()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('/clinician/patient/' + patient._id)
        }
        if (req.body.bloodGlucoseLowerThreshold != "" && !isNaN(req.body.bloodGlucoseLowerThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    bloodGlucoseLowerThreshold: parseFloat(req.body.bloodGlucoseLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.bloodGlucoseUpperThreshold != "" && !isNaN(req.body.bloodGlucoseUpperThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    bloodGlucoseUpperThreshold: parseFloat(req.body.bloodGlucoseUpperThreshold)
                }}
            ).lean()
        }
        if (req.body.weightLowerThreshold != "" && !isNaN(req.body.weightLowerThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    weightLowerThreshold: parseFloat(req.body.weightLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.weightUpperThreshold != "" && !isNaN(req.body.weightUpperThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    weightUpperThreshold: parseFloat(req.body.weightUpperThreshold)
                }}
            ).lean()
        }
        if (req.body.exerciseLowerThreshold != "" && !isNaN(req.body.exerciseLowerThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    exerciseLowerThreshold: parseInt(req.body.exerciseLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.exerciseUpperThreshold != "" && !isNaN(req.body.exerciseUpperThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    exerciseUpperThreshold: parseInt(req.body.exerciseUpperThreshold)
                }}
            ).lean()
        }
        if (req.body.insulinLowerThreshold != "" && !isNaN(req.body.insulinLowerThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    dosesOfInsulinLowerThreshold: parseInt(req.body.insulinLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.insulinUpperThreshold != "" && !isNaN(req.body.insulinUpperThreshold)) {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    dosesOfInsulinUpperThreshold: parseInt(req.body.insulinUpperThreshold)
                }}
            ).lean()
        }
        return res.redirect('/clinician/patient/' + patient._id)
    }
    catch (e) {
        return next(e)
    }
}

module.exports = {
    getPatient,
    getPatientNotes,
    getPatientDataHistory,
    updateSupportMsg,
    addNote,
    updatePatientRequirements,
}