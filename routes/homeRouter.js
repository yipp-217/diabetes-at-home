const express = require('express')
const homeRouter = express.Router()

const homeController = require('../controllers/homeController')

homeRouter.get('/', homeController.getHome)

homeRouter.get('/login', homeController.getLogin)

homeRouter.get('/about-diabetes', homeController.getAboutDiabetes)

homeRouter.get('/about-website', homeController.getAboutWebsite)

module.exports = homeRouter
