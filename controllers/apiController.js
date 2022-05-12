const {User} = require('../models/user')
const {Clinician} = require('../models/clinician')
const {Patient} = require('../models/patient')


const registrations = async (req, res, next) => {
    const users = [];
    const patients = await User.find({onModel: 'Patient'}).lean()
    for (const patientUser of patients) {
        const patient = await Patient.findOne({_id: patientUser.model}).lean()
        const clinicianUser = await User.findOne({_id: patient.clinician}).lean()

        const user = {namePatient: patientUser.nameGiven + ' ' + patientUser.nameFamily}
        if (!clinicianUser) {
            user.nameClinician = 'null'
        }
        else {
            user.nameClinician = clinicianUser.nameGiven + ' ' + clinicianUser.nameFamily
        }
        users.push(user)
    }
    return res.render('API-registerPatient.hbs', {users: users})
}

const registerPatient = async (req, res, next) => {
    try {
        const clinicianUser = await User.findOne({email: req.body.emailClinician}).lean()
        const patientUser = await User.findOne({email: req.body.emailPatient}).lean()
        await Patient.updateOne({user: patientUser}, {$set: {clinician: clinicianUser}})
        return res.redirect('/api/registration')
    }
    catch(e){
        return next(e)
    }
}



module.exports = {
    registrations,
    registerPatient
}
