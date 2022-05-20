const express = require('express')
const clinicianPatientRouter = express.Router()

const homeController = require('../controllers/homeController')
const clinicianPatientController = require('../controllers/clinicianPatientController')

const { body } = require('express-validator');

clinicianPatientRouter.post('/:id/update-support', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Clinician'), 
                    body('supportMsg', 'cannot be empty').not().isEmpty().escape(),
                    clinicianPatientController.updateSupportMsg)

clinicianPatientRouter.post('/:id/add-note', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Clinician'), 
                    body('clinicianNote', 'cannot be empty').not().isEmpty().escape(),
                    clinicianPatientController.addNote)

clinicianPatientRouter.get('/:id/clinician-notes', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianPatientController.getPatientNotes)

clinicianPatientRouter.get('/:id/data-history', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianPatientController.getPatientDataHistory)

clinicianPatientRouter.post('/:id/update-reqs', 
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
                    clinicianPatientController.updatePatientRequirements)

clinicianPatientRouter.get('/:id', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianPatientController.getPatient)

clinicianPatientRouter.get('/', homeController.isAuthenticated, homeController.hasRole('Clinician'), clinicianPatientController.getPatient)

module.exports = clinicianPatientRouter