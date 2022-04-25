const express = require('express')
const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

patientRouter.get('/:userId/', patientController.getPatient)

patientRouter.get('/:userId/data', patientController.getPatientData)


module.exports = patientRouter
