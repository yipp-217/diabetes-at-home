const User = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')

const getHome = (req, res) => {
    res.render('index.hbs')
}

/* */
const getUsers = async (req, res) => {
    const users = await User.find().lean()
    return res.render('user.hbs', {data: users})
}

const signup = async (req, res, next) => {
    try {
        let user = new User(req.body)
        if (Boolean(req.body.clinician)) {
            user.onModel = 'Clinician'
            let clinician = new Clinician
            clinician.user = user
            await clinician.save()
            user.model = clinician
        }
        else {
            user.onModel = 'Patient'
            let patient = new Patient
            patient.user = user
            await patient.save()
            user.model = patient
        }
        await user.save()
        return res.redirect('/users')
    }
    catch (e) {
        return next(e)
    }
}

const getLogin = (req, res) => {
    res.render('login.hbs')
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

    getUsers,
    signup
}
