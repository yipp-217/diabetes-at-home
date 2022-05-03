const express = require('express')
const apiRouter = express.Router()

const apiController = require('../controllers/apiController')


apiRouter.get('/user-signup', apiController.getUsers)

apiRouter.post('/user-signup', apiController.userSignup)


module.exports = apiRouter
