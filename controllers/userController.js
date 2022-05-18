const {User} = require('../models/user')
const {Clinician} = require('../models/clinician')
const {Patient} = require('../models/patient')


const getUsers = async (req, res) => {
    const users = await User.find().lean()
    return res.render('API-createUser.hbs', {users: users})
}


const createClinicianUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        user.secret = "SqS8yF:Ac;<zn9YM8:=3s\",/q$9Rn9}hX\\y7&..Q!D~h'dJu5-BGKJ7#cR``\\Z^k"
        user.dateCreated = getDateTime()
        user.onModel = 'Clinician'

        const clinician = new Clinician
        clinician.user = user
        await clinician.save()

        user.model = clinician
        await user.save()
        return res.redirect('/login')
    }
    catch (e) {
        return next(e)
    }
}


const createPatientUser = async (req, res, next) => {
    try {
        if (req.user.onModel === 'Patient') {
            res.redirect('/patient')
        }
        else {
            // if (req.body.password !== req.body.password2)
            const user = new User(req.body)
            const email = req.body.email
            user.secret = "SqS8yF:Ac;<zn9YM8:=3s\",/q$9Rn9}hX\\y7&..Q!D~h'dJu5-BGKJ7#cR``\\Z^k"
            user.dateCreated = getDateTime()
            user.onModel = 'Patient'

            const patient = new Patient
            patient.user = user
            patient.clinician = req.user._id
            await patient.save()

            user.model = patient
            await user.save()


            const doc = await Clinician.findById(req.user.toJSON().model)
            const usr = await User.findOne({email}, {_id: 1})
            await Clinician.findOneAndUpdate(
                {_id: doc._id},
                {$push: {patients: usr._id}}
            )
        }
        return res.redirect('/clinician/dashboard')
    }
    catch (e) {
        return next(e)
    }
}


const getDateTime = () => {
    return new Date().toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});
}


module.exports = {
    getUsers,
    createClinicianUser,
    createPatientUser
}