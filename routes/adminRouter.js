const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminController')


adminRouter.get('/reset-dev2', adminController.resetDev2)

adminRouter.get('/reset-dev2more', adminController.resetDev2more)


module.exports = adminRouter
