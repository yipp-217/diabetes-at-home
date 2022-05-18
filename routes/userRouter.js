const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')


userRouter.get('/sudo-create', userController.getUsers)

userRouter.post('/sudo-create', userController.createClinicianUser)


module.exports = userRouter
