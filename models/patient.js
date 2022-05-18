const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const healthDataEntrySchema = new mongoose.Schema({
    date: {type: String},

    valueBloodGlucoseLevel: Number,
    commentBloodGlucoseLevel: String,
    timeBloodGlucoseLevel: String,

    valueWeight: Number,
    commentWeight: String,
    timeWeight: String,

    valueExercise: Number,
    commentExercise: String,
    timeExercise: String,

    valueDosesOfInsulinTaken: Number,
    commentDosesOfInsulinTaken: String,
    timeDosesOfInsulinTaken: String
})

const clinicianNoteSchema = new mongoose.Schema({
    time: {type: String},
    note: String
})


/* Patient User */
const patientSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    clinician: {type: mongoose.Schema.Types.ObjectId, ref:'User'},

    supportMessage: {type: String},
    engagement: {type: Number, default: 0},

    requirementBloodGlucoseLevel: {type: Boolean, default: true},
    bloodGlucoseUpperThreshold: Number,
    bloodGlucoseLowerThreshold: Number,

    requirementWeight: {type: Boolean, default: true},
    weightUpperThreshold: Number,
    weightLowerThreshold: Number,

    requirementExercise: {type: Boolean, default: true},
    exerciseUpperThreshold: Number,
    exerciseLowerThreshold: Number,

    requirementDosesOfInsulinTaken: {type: Boolean, default: true},
    dosesOfInsulinUpperThreshold: Number,
    dosesOfInsulinLowerThreshold: Number,

    patientHealthEntries: [ObjectId],
    clinicianNotes: [ObjectId]
})


const Patient = mongoose.model('Patient', patientSchema)
const HealthDataEntry = mongoose.model('HealthDataEntry', healthDataEntrySchema)
const ClinicianNote = mongoose.model('ClinicianNote', clinicianNoteSchema)

module.exports = {
    Patient,
    HealthDataEntry,
    ClinicianNote
}
