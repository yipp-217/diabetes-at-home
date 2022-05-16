const express = require('express')
const homeRouter = express.Router()
const passport = require('passport')
const homeController = require('../controllers/homeController')

homeRouter.get('/', homeController.getHome)

homeRouter.get('/login', homeController.getLogin)

// Handle Login
homeRouter.post('/login', 
    passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), homeController.roleRedirect
)

// Handle logout
homeRouter.post('/logout', homeController.logout)

homeRouter.get('/about-diabetes', homeController.getAboutDiabetes)

homeRouter.get('/about-website', homeController.getAboutWebsite)

homeRouter.get('/error', homeController.getError)

module.exports = homeRouter
