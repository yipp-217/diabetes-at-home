const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')


clinicianRouter.get('/dashboard', clinicianController.getClinicianDashboard)

clinicianRouter.get('/patient-comments', clinicianController.getPatientComments)

clinicianRouter.get('/patient/clinician-notes', clinicianController.getPatientNotes)

clinicianRouter.get('/patient/data-history', clinicianController.getPatientDataHistory)

clinicianRouter.get('/patient', clinicianController.getPatient)

clinicianRouter.get('/settings', clinicianController.getClinicianSettings)

clinicianRouter.get('/register-patient', clinicianController.getRegisterPatient)


module.exports = clinicianRouter
