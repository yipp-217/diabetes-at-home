const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')
const homeController = require('../controllers/homeController')


clinicianRouter.get('/dashboard', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getClinicianDashboard)

clinicianRouter.get('/patient-comments', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientComments)

clinicianRouter.get('/patient/clinician-notes', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientNotes)

clinicianRouter.get('/patient/data-history', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientDataHistory)

clinicianRouter.get('/patient', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatient)

clinicianRouter.get('/settings', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getClinicianSettings)

clinicianRouter.get('/register-patient', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getRegisterPatient)


module.exports = clinicianRouter
