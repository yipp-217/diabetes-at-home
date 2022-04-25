const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/:userId', clinicianController.getClinician)

clinicianRouter.get('/all', clinicianController.getAllClinician)
// clinicianRouter.get('/test/:userID', clinicianController.)

module.exports = clinicianRouter
