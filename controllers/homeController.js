const User = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')

const getHome = (req, res) => {
    res.render('index.hbs', {title: "Express", user: req.user.toJSON()})
}


const getLogin = (req, res) => {
    res.render('login.hbs', {flash: req.flash('error'), title: 'Login'})
}

const logout = (req, res) => {
    req.logout()
    res.redirect('/')
}

/** */
const login = (req, res, next) => {
    try {

    }
    catch (e) {
        console.log(e)
    }
}

const getAboutDiabetes = (req, res) => {
    res.render('about_diabetes.hbs')
}

const getAboutWebsite = (req, res) => {
    res.render('about_website.hbs')
}

module.exports = {
    getHome,
    getLogin,
    login,
    getAboutDiabetes,
    getAboutWebsite,
    logout,
}
