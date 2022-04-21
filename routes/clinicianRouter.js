const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/:userId', clinicianController.getClinician)

module.exports = clinicianRouter
