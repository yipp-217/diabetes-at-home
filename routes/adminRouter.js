const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminController')

adminRouter.get('/reset-dev2-database', adminController.resetDev2)

module.exports = adminRouter
