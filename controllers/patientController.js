const pdb = require('../test-data/patients')


const getPatient = (req, res) => {
    const data = pdb.find(data => data.id === req.params.userId)

    if (data) {
        res.send(data)
    }
    else {
        res.send([])
    }
}

const getPatientData = (req, res) => {

}

const getPatientDataWeight = (req, res) => {

}

const getPatientDataBloodGlucoseLevel = (req, res) => {

}

const getPatientDataExercise = (req, res) => {

}

const getDosesOfInsulinTaken = (req, res) => {

}

module.exports = {
    getPatient,
    getPatientData,
    getPatientDataWeight,
    getPatientDataBloodGlucoseLevel,
    getPatientDataExercise,
    getDosesOfInsulinTaken
}