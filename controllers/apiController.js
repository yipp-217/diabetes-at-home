const {User} = require('../models/user')
const {Clinician} = require('../models/clinician')
const {Patient} = require('../models/patient')


const getUsers = async (req, res) => {
    const users = await User.find().lean()
    return res.render('API-user-signup.hbs', {users: users})
}

const userSignup = async (req, res, next) => {
    try {
        const user = new User(req.body)
        if (Boolean(req.body.clinician)) {
            user.onModel = 'Clinician'
            const clinician = new Clinician
            clinician.user = user
            await clinician.save()
            user.model = clinician
        }
        else {
            user.onModel = 'Patient'
            const patient = new Patient
            patient.user = user
            await patient.save()
            user.model = patient
        }
        await user.save()
        return res.redirect('/api/user-signup')
    }
    catch (e) {
        return next(e)
    }
}

const registrations = async (req, res, next) => {
    const users = [];
    const patients = await User.find({onModel: 'Patient'}).lean()
    for (const patient of patients) {
        const user = {namePatient: patient.nameGiven + ' ' + patient.nameFamily}
        const clinician = await Clinician.findOne({_id: patient.clinician}).lean()
        if (!clinician) {
            user.nameClinician = 'null'
        }
        else {
            user.nameClinician = clinician.nameGiven + ' ' + clinician.nameFamily
        }
        users.push(user)
    }
    return res.render('API-registerPatient.hbs', {users: users})
}

const registerPatient = async (req, res, next) => {
    try {
        const clinician = await User.findOne({email: req.body.emailClinician}).lean()

        console.log(await User.findOne({email: req.body.emailPatient}).lean())
        await User.updateOne({email: req.body.emailPatient}, {$set: {clinician: clinician}})
        console.log(await User.findOne({email: req.body.emailPatient}).lean())
        return res.redirect('/api/registration')
    }
    catch(e){
        return next(e)
    }
}



module.exports = {
    getUsers,
    userSignup,
    registrations,
    registerPatient
}
