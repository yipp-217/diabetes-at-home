const {Clinician} = require('../models/clinician')
const {Patient} = require('../models/patient')
const {ClinicianNote} = require('../models/patient')

const patientController = require('../controllers/patientController')


const getClinicianDashboard = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else {
            clinician = await Clinician.findById(req.user.model)
            patients = await getPatients(clinician.patients)
            patients = await getPatientsHealthData(patients)
            return res.render('clinician-dashboard.hbs', {
                user: req.user.toJSON(), patients: patients
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
                user: req.user.toJSON(), patients: patients
            })
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
        else {
            patient = await Patient.findById(req.params.id).lean()
            patient = await Patient.findById(patient).populate("user").lean()
            patient.patientHealthEntries = await patientController.getHealthData(patient)
            return res.render('clinician_patient.hbs', {
                user: req.user.toJSON(),
                patient: patient
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
            patient = await Patient.findById(req.params.id).populate("user").lean()
            notes = await getClinicianNotes(patient)
            return res.render('clinician_patient_notes.hbs', {user: req.user.toJSON(), patient: patient, notes: notes})
        }
    }
    catch (e) {
        return next(e)
    }
}

const getClinicianNotes = async (patient) => {
    notes = []
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
            patient = await Patient.findById(req.params.id).populate("user").lean()
            return res.render('clinician_data_history.hbs', {user: req.user.toJSON(), patient: patient})
        }
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

const updateSupportMsg = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } 
        else {
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
        if (req.body.bloodGlucoseLowerThreshold != "") {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    bloodGlucoseLowerThreshold: parseFloat(req.body.bloodGlucoseLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.bloodGlucoseUpperThreshold != "") {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    bloodGlucoseUpperThreshold: parseFloat(req.body.bloodGlucoseUpperThreshold)
                }}
            ).lean()
        }
        if (req.body.weightLowerThreshold != "") {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    weightLowerThreshold: parseFloat(req.body.weightLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.weightUpperThreshold != "") {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    weightUpperThreshold: parseFloat(req.body.weightUpperThreshold)
                }}
            ).lean()
        }
        if (req.body.exerciseLowerThreshold != "") {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    exerciseLowerThreshold: parseInt(req.body.exerciseLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.exerciseUpperThreshold != "") {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    exerciseUpperThreshold: parseInt(req.body.exerciseUpperThreshold)
                }}
            ).lean()
        }
        if (req.body.insulinLowerThreshold != "") {
            await Patient.findOneAndUpdate(
                {_id: patient._id},
                {$set: {
                    dosesOfInsulinLowerThreshold: parseInt(req.body.insulinLowerThreshold)
                }}
            ).lean()
        }
        if (req.body.insulinUpperThreshold != "") {
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
    getClinicianDashboard,
    getPatientComments,
    getPatient,
    getPatientNotes,
    getPatientDataHistory,
    getClinicianSettings,
    getRegisterPatient,
    updateSupportMsg,
    addNote,
    updatePatientRequirements,
}
