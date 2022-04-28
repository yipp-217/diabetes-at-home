const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')
const cdb = require('../test-data/clinicians')


const getClinician = (req, res) => {
    const data = cdb.find(data => data.id === req.params.userId)

    if (data) {
        res.send(data)
    }
    else {
        res.send([])
    }
}

const getAllClinician = async (req, res, next) => {
    try {
        const clinicians = await Clinician.find().lean()
        console.log(clinicians)
        res.send(clinicians)
    }

    catch (err) {
        console.log(err)
    }
}

const getPatientData = async (req, res, next) => {
    try {
        const patients = await Patient.find({clinician: "626908e2af5e8168d1c69f0c"}).lean()
        console.log(patients)
    }   
    catch (err){
        console.log(err)
    }
    
}


module.exports = {
    getClinician,
    getAllClinician,
    getPatientData
}
