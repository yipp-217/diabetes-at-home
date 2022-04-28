const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')



clinicianRouter.get('/all', clinicianController.getAllClinician)
// clinicianRouter.get('/test/:userID', clinicianController.)

clinicianRouter.get('/dashboard', clinicianController.getPatientData)

clinicianRouter.get('/:userId', clinicianController.getClinician)

module.exports = clinicianRouter
