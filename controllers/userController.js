const {User} = require('../models/user')
const {Clinician} = require('../models/clinician')
const {Patient} = require('../models/patient')

const getUsers = async (req, res) => {
    const users = await User.find().lean()
    return res.render('API-createUser.hbs', {users: users})
}


const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        console.log(req.body)
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
        return res.redirect('/user/get')
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    getUsers,
    createUser
}