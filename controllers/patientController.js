const User = require('../models/user')
const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')


const getPatientUser = async (req, res, next) => {
    try {
        // Pat's object id
        const patientUser = await User.findById('6268f5eaaec105b721a11c62')
        console.log(patientUser)
        return res.render('patient_main.hbs', {user: patientUser})
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    getPatientUser
}
