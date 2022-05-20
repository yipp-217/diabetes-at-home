

const {User} = require('../models/user')
const {Patient} = require('../models/patient')
const {HealthDataEntry} = require('../models/patient')

const getPatient = async (user) => {
    return await Patient.findById(user).lean()
}

const getPatientUser = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            const patient = await getPatient(req.user.toJSON().model)
            const healthData = await getHealthData(patient)
            const engagementRate = await calculateEngagement(patient)
            await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()

            let dateBG= [], valBG = [], dateW = [], valW = [], dateDose = [], valDose = [], dateExc = [], valExc = []

            for (let i = 0; i < patient.patientHealthEntries.length; i++){ 
                let currHealthEntry = await HealthDataEntry.findById(patient.patientHealthEntries[i])
                
                if (currHealthEntry.valueBloodGlucoseLevel){
                    dateBG.push(currHealthEntry.date)
                    valBG.push(currHealthEntry.valueBloodGlucoseLevel)
                }
                if (currHealthEntry.valueWeight){
                    dateW.push(currHealthEntry.date)
                    valW.push(currHealthEntry.valueWeight)
                }
                if (currHealthEntry.valueDosesOfInsulinTaken){
                    dateDose.push(currHealthEntry.date)
                    valDose.push(currHealthEntry.valueDosesOfInsulinTaken)
                }
                if (currHealthEntry.valueExercise){
                    dateExc.push(currHealthEntry.date)
                    valExc.push(currHealthEntry.valueExercise)
                }
            }
            
            valBG = valBG.toString(), dateBG = dateBG.toString()
            valW = valW.toString(), dateW = dateW.toString()
            valDose = valDose.toString(), dateDose = dateDose.toString()
            valExc = valExc.toString(), dateExc = dateExc.toString()

            if (valBG.length == 1){
                valBG = valBG + ",null"
                dateBG = dateBG + ","
            }
            if (valBG.length == 0){
                valBG = "null,null"
                dateBG = ","
            }
            if (valW.length == 1){
                valW = valW + ",null"
                dateW = dateW + ","
            }
            if (valW.length == 0){
                valW = "null,null"
                dateW = ","
            }
            if (valDose.length == 1){
                valDose = valDose + ",null"
                dateDose = dateDose + ","
            }
            if (valDose.length == 0){
                valDose = "null,null"
                dateDose = ","
            }
            if (valExc.length == 1){
                valExc = valExc + ",null"
                dateExc = dateExc + ","
                
            }
            if (valExc.length == 0){
                valExc = "null,null"
                dateExc = ","
            }
            
            
            return res.render('patient_main.hbs', {
                user: req.user.toJSON(), patient: patient, healthData: healthData, darkMode: req.user.darkMode, 
                bloodGlucoseLevel: valBG, dateBloodGlucose: dateBG,
                weightValue: valW, weightDate: dateW,
                doseValue: valDose, doseDate: dateDose,
                excValue: valExc, excDate: dateExc
            })
        }
    }
    catch (e) {
        return next(e)
    }
}

const getDateTime = () => {
    const today = new Date().toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});
    return today;
}

const getHealthData = async (patient) => {
    if (patient.HealthDataEntries === null) {
        return null
    }
    for (let i = 0; i < patient.patientHealthEntries.length; i++) {
        const data = await HealthDataEntry.findById(patient.patientHealthEntries[i]).lean()
        const today = getDateTime().slice(0, 10)
        if (today === data.date) {
            return data
        }
    }
    return null
}
const calculateEngagement = async (patient) => {
    const oneDay = 24 * 60 * 60 * 1000
    
    const data = await User.findById(patient.user).lean()
    
    let today = getDateTime().substring(0,10)
    
    let dayCreated
    if (data == null) {
        dayCreated = today
    } else {
        dayCreated = data.dateCreated.substring(0, 10)
    }

    const dateOne = new Date(dayCreated.substring(6,10), dayCreated.substring(3,5), dayCreated.substring(0,2))
    const dateTwo = new Date(today.substring(6,10), today.substring(3,5), today.substring(0,2))
    
    const diffDays = Math.round(Math.abs((dateOne - dateTwo) / oneDay)) + 1
    
    const numEntries = patient.patientHealthEntries.length
    const engagementRate = (numEntries/diffDays) * 100

    await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()
    //console.log("Updated " + data.email + "'s engagement, new value: " + engagementRate)
    return engagementRate
}


const getLeaderboard = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            // update every patients engagement rate
            for await (const doc of Patient.find()) {
                let patient = await Patient.findById(doc._id)
                await calculateEngagement(patient)
                
            }

            // create dictionary of scores sorted by screen names
            var dict = {}
            for await (const doc of User.find({onModel: "Patient"}).sort('nameScreen')){
                const screenName = doc.nameScreen

                const currPatient = await Patient.findById(doc.model)
                dict[screenName] = currPatient.engagement
            }
            
            console.log(dict)
            let items = Object.keys(dict).map((key) => { return [key, dict[key]] });
            items.sort((first, second) => { return first[1] - second[1] });
            let keys = items.map((e) => { return e[0] });

            keys = keys.slice(-5)
            keys = keys.reverse()

            
            const patient = await getPatient(req.user.toJSON().model)
            return res.render('patient_leaderboard.hbs', {user: req.user.toJSON(), patient: patient, darkMode: req.user.darkMode, topfive: keys})
        }
    }
    catch (e) {
        return next(e)
    }
}

const getPatientSettings = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            const patient = await getPatient(req.user.toJSON().model)
            const engagementRate = await calculateEngagement(patient)
            await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()
            return res.render('settings.hbs', {user: req.user.toJSON(), patient: patient, darkMode: req.user.darkMode})
        }
    }
    catch (e) {
        return next(e)
    }
}

const getPatientChangePassword = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            return res.render('change_password.hbs', {user: req.user.toJSON(), darkMode: req.user.darkMode})
    }
    catch (e) {
        return next(e)
    }
}

const turnOnDarkMode = async(req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        }else{
            const patient = await getPatient(req.user.toJSON().model)
            const data = await User.findById(patient.user).lean()
            
            if (data.darkMode == true){
                await User.findOneAndUpdate({_id: data._id}, {$set: {darkMode: false}}).lean()
            } else{
                await User.findOneAndUpdate({_id: data._id}, {$set: {darkMode: true}}).lean()
            }
            console.log("Dark mode: " + data.darkMode)
            res.redirect('/patient/settings')
        }
    } 
    catch(e){
        return next(e)
    }
}

module.exports = {
    getPatient,
    getPatientUser,
    getLeaderboard,
    getPatientSettings,
    getPatientChangePassword,
    getHealthData,
    turnOnDarkMode,
    getDateTime,
    calculateEngagement,
}
