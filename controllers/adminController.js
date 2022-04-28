const Clinician = require('../models/clinician')
const {Patient} = require('../models/patient')

Chris = {
    _id: "0001",
    email: "chris@mail.com",
    password: "1234",
    nameFamily: "Clinician",
    nameGiven: "Chris",
    nameScreen: "Dr. Chris",
    yearBorn: 1970,
    bio: "I am a doctor!"
}

Alice = {
    _id: "0002",
    email: "alice@mail.com",
    password: "abcd",
    nameFamily: "Clinician",
    nameGiven: "Alice",
    nameScreen: "Dr. Alice",
    yearBorn: 1978,
    bio: "I am also a doctor!"
}

Pat = {
    _id: "1000",
    bio: "I am a patient.",
    clinician: "0001",
    email: "pat@patient.com",
    nameFamily: "Patterson",
    nameGiven: "Pat",
    nameScreen: "PattyPat",
    password: "4321",
    yearBorn: 1968,
    supportMessage: "You are doing great!!!",
    weight: 70,
    bloodGlucoseLowerThreshold: 3,
    bloodGlucoseUpperThreshold: 15
}

Piper = {
    _id: "1001",
    bio: "Piper, a little bird",
    clinician: "0001",
    email: "pipper@patient.com",
    nameFamily: "Possum",
    nameGiven: "Piper",
    nameScreen: "PiperPossum",
    password: "1234",
    yearBorn: 1974,
    supportMessage: "You are doing amazing!!!",
}

Patrick = {
    _id: "1002",
    bio: "I am Patrick.",
    clinician: "0002",
    email: "patrick@patient.com",
    nameFamily: "Patter",
    nameGiven: "Patrick",
    nameScreen: "ILikeSpongebob",
    password: "4321234",
    yearBorn: 1955,
    supportMessage: "Good one!!!",
    weight: 92
}


const resetDev2 = async (req, res, next) => {
    try {
        await Clinician.collection.deleteMany({})
        await Patient.collection.deleteMany({})

        await Clinician.collection.insertOne(Chris)
        await Patient.collection.insertOne(Pat)

        res.send('done.')
    }
    catch (err){
        console.log(err)
        return next(err)
    }
}

const resetDev2more = async (req, res, next) => {
    try {
        await Clinician.collection.deleteMany({})
        await Patient.collection.deleteMany({})

        await Clinician.collection.insertMany([Chris, Alice])
        await Patient.collection.insertMany([Pat, Piper, Patrick])

        res.send('done.')
    }
    catch (e) {
        return next(e)
    }
}


module.exports = {
    resetDev2,
    resetDev2more
}