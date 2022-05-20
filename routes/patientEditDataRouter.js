const express = require('express')
const patientEditDataRouter = express.Router()

const patientEditDataController = require('../controllers/patientEditDataController')
const homeController = require('../controllers/homeController')

const { body } = require('express-validator');

patientEditDataRouter.post('/blood-glucose-level', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'), 
                    body('bloodGlucoseValue', 'cannot be empty').not().isEmpty().isFloat().escape(),
                    body('bloodGlucoseComment').escape(),
                    patientEditDataController.updateBloodGlucose)

patientEditDataRouter.post('/weight', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'), 
                    body('weightValue', 'cannot be empty').not().isEmpty().isFloat().escape(),
                    body('weightComment').escape(),
                    patientEditDataController.updateWeight)

patientEditDataRouter.post('/exercise', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'),
                    body('exerciseValue', 'cannot be empty').not().isEmpty().isInt().escape(),
                    body('exerciseComment').escape(), 
                    patientEditDataController.updateExercise)

patientEditDataRouter.post('/doses-of-insulin-taken', 
                    homeController.isAuthenticated, 
                    homeController.hasRole('Patient'), 
                    body('dosesOfInsulinValue', 'cannot be empty').not().isEmpty().isInt().escape(),
                    body('dosesOfInsulinComment').escape(),
                    patientEditDataController.updateInsulin)

patientEditDataRouter.get('/', homeController.isAuthenticated, homeController.hasRole('Patient'), patientEditDataController.getPatientUserEdit)

module.exports = patientEditDataRouter