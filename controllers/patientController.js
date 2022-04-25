const {Patient} = require('../models/patient')

const createNew = async (req, res, next) => {
    /**
    let patient = new Patient({
        email: req.body.email,
        password: req.body.password,
        nameFamily: req.body.nameFamily,
        nameGiven: req.body.nameGiven,
        nameScreen: req.body.nameScreen,
        yearBorn: req.body.yearBorn,
        bio: req.body.bio,

        clinician: null,
        supportMessage: null,

        requirements: null,
        thresholds : null,
        patientHealthRecord: null,
        clinicianNotes: null
    }) */

    try {
        let patient = new Patient(req.body)
        await patient.save()
        return res.redirect('/patient')
    }
    catch (e) {
        return next(e)
    }
}

const getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.render('pat-all', {data: patients})
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    createNew,
    getPatients,
    getPatient
}
