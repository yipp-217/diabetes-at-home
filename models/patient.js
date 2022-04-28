const mongoose = require('mongoose')

/* each entry stores health data object(s) */
const healthDataEntrySchema = new mongoose.Schema({
    data: {type: [mongoose.Schema.Types.ObjectId], ref: 'HealthData'},
    date: {type: Date, default: Date.now}
})

const clinicianNoteSchema = new mongoose.Schema({
    time: {type: Date, default: Date.now},
    note: String
})

const requirementsSchema = new mongoose.Schema({
    bloodGlucoseLevel: Boolean,
    weight: Boolean,
    dosesOfInsulinTaken: Boolean,
    exercise: Boolean
})

const thresholdSchema = new mongoose.Schema({
    category: {type: String, enum: ['bloodGlucoseLevel', 'weight', 'dosesOfInsulinTaken', 'exercise']},
    upper: Number,
    lower: Number
})

/* Patient User */
const patientSchema = new mongoose.Schema({
    // user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},

    /* user properties */
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    nameFamily: {type: String, required: true},
    nameGiven: String,
    nameScreen: {type: String, required: true},
    yearBorn: Number,
    bio: String,
    /* ----- */

    // clinician: {type: mongoose.Schema.Types.ObjectId, ref:'Clinician'},
    clinician: {type: String, required: true},
    supportMessage: {type: String},

    /* today */
    bloodGlucoseRecordDateTime: String,
    bloodGlucose: Number,
    bloodGlucoseComment: String,
    bloodGlucoseUpperThreshold: Number,
    bloodGlucoseLowerThreshold: Number,
    weight: Number,
    weightComment: String,
    exercise: Number,
    exerciseComment: String,
    dosesOfInsulin: Number,
    dosesOfInsulinComment: String,
    /* ----- */

    requirements: requirementsSchema,
    thresholds : [thresholdSchema],
    patientHealthRecord: [healthDataEntrySchema],
    clinicianNotes: [clinicianNoteSchema]
})


const Patient = mongoose.model('Patient', patientSchema)
const Requirements = mongoose.model('Requirements', requirementsSchema)
const Threshold = mongoose.model('Threshold', thresholdSchema)
const HealthDataEntry = mongoose.model('HealthDataEntry', healthDataEntrySchema)
const ClinicianNote = mongoose.model('ClinicianNote',clinicianNoteSchema)

module.exports = {
    Patient,
    Requirements,
    Threshold,
    HealthDataEntry,
    ClinicianNote
}
