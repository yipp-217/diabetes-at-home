const express = require('express')
const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

patientRouter.post('/edit-data/blood-glucose-level', patientController.updateBloodGlucose)

patientRouter.get('/edit-data', patientController.getPatientUserEdit)

patientRouter.get('/:id', patientController.getPatientUser)

// default to find Pat
patientRouter.get('/', patientController.getPatientUser)


module.exports = patientRouter
