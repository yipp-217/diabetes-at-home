const express = require('express')
const homeRouter = express.Router()
const passport = require('passport')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')

const { body } = require('express-validator');

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

homeRouter.post('/update-user', 
                homeController.isAuthenticated, 
                body('bio').escape(),
                userController.updateUserDetails)

module.exports = homeRouter
