const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')

const { body } = require('express-validator');

clinicianRouter.get('/dashboard', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getClinicianDashboard)

clinicianRouter.get('/patient-comments', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientComments)

clinicianRouter.post('/patient/:id/update-support', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Clinician'), 
                    body('supportMsg', 'cannot be empty').not().isEmpty().escape(),
                    clinicianController.updateSupportMsg)

clinicianRouter.post('/patient/:id/add-note', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Clinician'), 
                    body('clinicianNote', 'cannot be empty').not().isEmpty().escape(),
                    clinicianController.addNote)

clinicianRouter.get('/patient/:id/clinician-notes', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientNotes)

clinicianRouter.get('/patient/:id/data-history', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatientDataHistory)

clinicianRouter.post('/patient/:id/update-reqs', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Clinician'), 
                    body('bloodGlucoseLowerThreshold').escape(),
                    body('weightLowerThreshold').escape(),
                    body('exerciseLowerThreshold').escape(),
                    body('insulinLowerThreshold').escape(),
                    body('bloodGlucoseUpperThreshold').escape(),
                    body('weightUpperThreshold').escape(),
                    body('exerciseUpperThreshold').escape(),
                    body('insulinUpperThreshold').escape(),
                    clinicianController.updatePatientRequirements)

clinicianRouter.get('/patient/:id', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatient)

clinicianRouter.get('/patient', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getPatient)

clinicianRouter.get('/settings', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getClinicianSettings)

clinicianRouter.get('/register-patient', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getRegisterPatient)

clinicianRouter.post('/register-patient', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Clinician'), 
                    body('email').isEmail().not().isEmpty().escape(),
                    body('nameGiven').not().isEmpty().escape(),
                    body('nameFamily').not().isEmpty().escape(),
                    body('nameScreen').not().isEmpty().escape(),
                    body('yearBorn').isInt().not().isEmpty().escape(),
                    body('password').not().isEmpty().escape(),
                    body('password2').not().isEmpty().escape(),
                    userController.createPatientUser)

clinicianRouter.get('/dark-mode', homeController.isAuthenticated, homeController.hasRole('Clinician'),clinicianController.turnOnDarkMode)

clinicianRouter.get('/', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianController.getClinicianDashboard)

module.exports = clinicianRouter
