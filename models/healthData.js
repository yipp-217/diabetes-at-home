const mongoose = require('mongoose')

const healthDataSchema = new mongoose.Schema({
    category: {type: String, enum: ['bloodGlucoseLevel', 'weight', 'dosesOfInsulinTaken', 'exercise']},
    value: {type: Number, required: true},
    comment: String
})


const HealthData = mongoose.model('HealthData', healthDataSchema)

module.exports = HealthData
