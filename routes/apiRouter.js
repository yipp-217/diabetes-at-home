const express = require('express')
const apiRouter = express.Router()

const apiController = require('../controllers/apiController')


apiRouter.get('/registration', apiController.registrations)

apiRouter.post('/register-patient', apiController.registerPatient)


module.exports = apiRouter
