const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')


clinicianRouter.get('/dashboard', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getClinicianDashboard)

clinicianRouter.get('/patient-comments', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientComments)

clinicianRouter.post('/patient/:id/update-support', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.updateSupportMsg)

clinicianRouter.post('/patient/:id/add-note', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.addNote)

clinicianRouter.get('/patient/:id/clinician-notes', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientNotes)

clinicianRouter.get('/patient/:id/data-history', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientDataHistory)

clinicianRouter.post('/patient/:id/update-reqs', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.updatePatientRequirements)

clinicianRouter.get('/patient/:id', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatient)

clinicianRouter.get('/patient', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatient)

clinicianRouter.get('/settings', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getClinicianSettings)

clinicianRouter.get('/register-patient', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getRegisterPatient)

clinicianRouter.post('/register-patient', homeController.isAuthenticated, homeController.hasRole('Clinician'), userController.createPatientUser)

module.exports = clinicianRouter
