const {User} = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')
const bcrypt = require('bcryptjs')

const SALT_FACTOR = 10

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}

// Role based authentication
const hasRole = (thisRole) => {
    return (req, res, next) => {
        if (req.user.onModel == thisRole)
            return next()
        else {
            roleRedirect(req, res)
        }
    }
}

const roleRedirect = (req, res) => {
    if (req.user.onModel == 'Patient') {
        res.redirect('/patient')
    } else if (req.user.onModel == 'Clinician') {
        res.redirect('/clinician/dashboard')
    } else {
        res.redirect('/')
    }
}

const getHome = (req, res) => {
    res.render('index.hbs')
}


const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.onModel == 'Patient') {
            res.redirect('/patient')
        } else if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        }
    }
    res.render('login.hbs', {flash: req.flash('error'), title: 'Login'})
}

const logout = (req, res) => {
    req.logout()
    res.redirect('/')
}

const getAboutDiabetes = (req, res) => {
    res.render('about_diabetes.hbs', {loggedin: req.isAuthenticated()})
}

const getAboutWebsite = (req, res) => {
    res.render('about_website.hbs', {loggedin: req.isAuthenticated()})
}

const getError = (req, res) => {
    res.render('error_page.hbs')
}

const updateUserDetails = async (req, res, next) => {
    try {
        await User.findOneAndUpdate(
            {_id: req.user._id},
            {$set: {
                bio: req.body.bio
            }}
        ).lean()
        if (req.body.Password != "") {
            if (req.body.Password.localeCompare(req.body.Confirm_Password) == 0) {
                bcrypt.hash(req.body.Password, SALT_FACTOR, async (err, hash) => {
                    if (err) {
                        return next(err)
                    }
                    // Replace password with hash
                    await User.findOneAndUpdate(
                        {_id: req.user._id},
                        {$set: {
                            password: hash
                        }}
                    ).lean()
                })
            }
        }
        var role
        if (req.user.onModel == 'Patient') {
            role = 'patient'
        } else if (req.user.onModel == 'Clinician') {
            role = 'clinician'
        }
        path = '/' + role + '/settings'
        return res.redirect(path)
    }
    catch (e) {
        return next(e)
    }
}

module.exports = {
    isAuthenticated,
    hasRole,
    roleRedirect,
    getHome,
    getLogin,
    getAboutDiabetes,
    getAboutWebsite,
    logout,
    getError,
    updateUserDetails,
}
