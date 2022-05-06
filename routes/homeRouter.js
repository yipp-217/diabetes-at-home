const express = require('express')
const homeRouter = express.Router()
const passport = require('passport')

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}
const homeController = require('../controllers/homeController')

homeRouter.get('/', isAuthenticated, homeController.getHome)

homeRouter.get('/login', homeController.getLogin)

// Handle Login
homeRouter.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login', failureFlash: true
    })
)

// Handle logout
homeRouter.post('/logout', homeController.logout)

homeRouter.get('/about-diabetes', homeController.getAboutDiabetes)

homeRouter.get('/about-website', homeController.getAboutWebsite)

module.exports = homeRouter
