const express = require('express')
const patientRouter = express.Router()

const patientController = require('../controllers/patientController')
const homeController = require('../controllers/homeController')

const { body } = require('express-validator');

patientRouter.post('/edit-data/blood-glucose-level', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'), 
                    body('bloodGlucoseValue', 'cannot be empty').not().isEmpty().isFloat().escape(),
                    body('bloodGlucoseComment').escape(),
                    patientController.updateBloodGlucose)

patientRouter.post('/edit-data/weight', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'), 
                    body('weightValue', 'cannot be empty').not().isEmpty().isFloat().escape(),
                    body('weightComment').escape(),
                    patientController.updateWeight)

patientRouter.post('/edit-data/exercise', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'),
                    body('exerciseValue', 'cannot be empty').not().isEmpty().isInt().escape(),
                    body('exerciseComment').escape(), 
                    patientController.updateExercise)

patientRouter.post('/edit-data/doses-of-insulin-taken', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'), 
                    body('dosesOfInsulinValue', 'cannot be empty').not().isEmpty().isInt().escape(),
                    body('dosesOfInsulinComment').escape(),
                    patientController.updateInsulin)

patientRouter.get('/edit-data', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientUserEdit)

patientRouter.get('/leaderboard', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getLeaderboard)

patientRouter.get('/settings/change-password', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientChangePassword)

patientRouter.get('/settings', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientSettings)

patientRouter.get('/dark-mode', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.turnOnDarkMode)

patientRouter.get('/', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientUser)


module.exports = patientRouter
