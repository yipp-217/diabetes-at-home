const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')


const getClinicianDashboard = async (req, res, next) => {
    try {
        // Chris's object id
        const clinician = await Clinician.findOne({email: 'chris@mail.com'}).lean()
        const patients = await Patient.find({clinician: "0001"}).lean()
        return res.render('clinician-dashboard.hbs', {user: clinician, patients: patients})
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    getClinicianDashboard
}
