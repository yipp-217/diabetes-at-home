const express = require('express')
const patientRouter = express.Router()

const patientController = require('../controllers/patientController')
const homeController = require('../controllers/homeController')

patientRouter.post('/edit-data/blood-glucose-level', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.updateBloodGlucose)

patientRouter.post('/edit-data/weight', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.updateWeight)

patientRouter.post('/edit-data/exercise', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.updateExercise)

patientRouter.post('/edit-data/doses-of-insulin-taken', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.updateInsulin)

patientRouter.get('/edit-data', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientUserEdit)

patientRouter.get('/leaderboard', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getLeaderboard)

patientRouter.get('/settings/change-password', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientChangePassword)

patientRouter.get('/settings', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientSettings)

patientRouter.get('/dark-mode', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.turnOnDarkMode)

patientRouter.get('/', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientUser)


module.exports = patientRouter
