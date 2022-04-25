const express = require('express')
const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

patientRouter.get('/', patientController.getPatients)

patientRouter.post('/', patientController.createNew)


module.exports = patientRouter
