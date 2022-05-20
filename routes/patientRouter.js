const express = require('express')
const patientRouter = express.Router()

const patientController = require('../controllers/patientController')
const homeController = require('../controllers/homeController')

const { body } = require('express-validator');

patientRouter.use('/edit-data', require('./patientEditDataRouter'))

patientRouter.get('/leaderboard', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getLeaderboard)

patientRouter.get('/settings/change-password', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientChangePassword)

patientRouter.get('/settings', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientSettings)

patientRouter.get('/dark-mode', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.turnOnDarkMode)

patientRouter.get('/', homeController.isAuthenticated, homeController.hasRole('Patient'), patientController.getPatientUser)


module.exports = patientRouter
