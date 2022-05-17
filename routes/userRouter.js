const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')


userRouter.get('/get', userController.getUsers)

userRouter.post('/create', userController.createUser)


module.exports = userRouter