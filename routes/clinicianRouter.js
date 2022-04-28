const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')
const {getClinicianDashboard} = require("../controllers/clinicianController");


clinicianRouter.get('/clinician-dashboard', clinicianController.getPatientsData)

clinicianRouter.get('/dashboard', clinicianController.getPatientData)

clinicianRouter.get('/', clinicianController.getClinicianDashboard)


module.exports = clinicianRouter
