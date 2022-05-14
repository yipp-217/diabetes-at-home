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
        // need to secure the session key
        user.secret = "SqS8yF:Ac;<zn9YM8:=3s\",/q$9Rn9}hX\\y7&..Q!D~h'dJu5-BGKJ7#cR``\\Z^k"
        user.dateCreated = getDateTime()
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

const getDateTime = () => {
    const today = new Date().toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});
    return today;
}


module.exports = {
    getUsers,
    createUser
}