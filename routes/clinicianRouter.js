const express = require('express')
const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')
const {getClinicianDashboard} = require("../controllers/clinicianController");


clinicianRouter.get('/dashboard', clinicianController.getClinicianDashboard)

clinicianRouter.get('/patient-comments', clinicianController.getPatientComments)


module.exports = clinicianRouter
