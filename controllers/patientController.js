const User = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')


const getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.render('user', {data: patients})
    }
    catch (e) {
        return next(e)
    }
}

const getPatient = async (req, res, next) => {
    try {
        // const user = await User.

    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    createNew,
    getPatients,
}
