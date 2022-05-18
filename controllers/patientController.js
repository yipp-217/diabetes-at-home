

const {User} = require('../models/user')
const {Clinician} = require('../models/clinician')
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
        else
            patient = await getPatient(req.user.toJSON().model)
            healthData = await getHealthData(patient)
            engagementRate = await calculateEngagement(patient)
            await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()

            dataset = [4,3,7,3,6,4,7].toString()
            
            return res.render('patient_main.hbs', {
                user: req.user.toJSON(), patient: patient, healthData: healthData, darkMode: req.user.darkMode, dataset: dataset
            })
    }
    catch (e) {
        return next(e)
    }
}

const getPatientUserEdit = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else
            patient = await getPatient(req.user.toJSON().model)
            engagementRate = await calculateEngagement(patient)
            await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()
            healthData = await getHealthData(patient)
            return res.render('patient_edit_data.hbs', {
                user: req.user.toJSON(), patient: patient, healthData: healthData, darkMode: req.user.darkMode
            })
    }
    catch (e) {
        return next(e)
    }
}

const getDateTime = () => {
    const today = new Date().toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});
    return today;
}

const displayDate = (x) => {
    const time = x.substring(11, 16);
    const which12hour = x.substring(19);
    return time.concat(which12hour);
}

const getHealthData = async (patient) => {
    for (let i = 0; i < patient.patientHealthEntries.length; i++) {
        data = await HealthDataEntry.findById(patient.patientHealthEntries[i]).lean()
        today = getDateTime().slice(0, 10)
        if (today === data.date) {
            return data
        }
    }
    return null
}
const calculateEngagement = async (patient) => {
    const oneDay = 24 * 60 * 60 * 1000
    
    const data = await User.findById(patient.user).lean()
    //console.log(data)
    dayCreated = data.dateCreated.substring(0, 10)
    //console.log(dayCreated)
    today = getDateTime().substring(0,10)
    //console.log(today)
    //dayCreated = "07/05/2022"
    dateOne = new Date(dayCreated.substring(6,10), dayCreated.substring(3,5), dayCreated.substring(0,2))
    dateTwo = new Date(today.substring(6,10), today.substring(3,5), today.substring(0,2))
    
    diffDays = Math.round(Math.abs((dateOne - dateTwo) / oneDay))
    //console.log(diffDays)
    numEntries = patient.patientHealthEntries.length
    let engagementRate
    if (diffDays == 0){
        if (patient.patientHealthEntries.length > 0){
            engagementRate = 100
        } else {
            engagementRate = 0
        }
    } else{
        engagementRate = (numEntries/diffDays) * 100
    }
    
    
    await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()
    console.log("Updated " + data.email + "'s engagement, new value: " + engagementRate)
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
                patient = await Patient.findById(doc._id)
                await calculateEngagement(patient)
                
            }

            // create dictionary of scores sorted by screen names
            var dict = {}
            for await (const doc of User.find({onModel: "Patient"}).sort('nameScreen')){
                screenName = doc.nameScreen

                currPatient = await Patient.findById(doc.model)
                dict[screenName] = currPatient.engagement

            }
            
            //console.log(dict)
            var items = Object.keys(dict).map((key) => { return [key, dict[key]] });
            items.sort((first, second) => { return first[1] - second[1] });
            var keys = items.map((e) => { return e[0] });

            keys = keys.slice(-5)
            keys = keys.reverse()

            console.log(keys)
            patient = await getPatient(req.user.toJSON().model)
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
        else
            patient = await getPatient(req.user.toJSON().model)
            engagementRate = await calculateEngagement(patient)
            await Patient.findOneAndUpdate({_id: patient._id}, {$set: {engagement: engagementRate}}).lean()
            return res.render('settings.hbs', {user: req.user.toJSON(), patient: patient, darkMode: req.user.darkMode})
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

const updateBloodGlucose = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueBloodGlucoseLevel: req.body.bloodGlucoseValue,
                    commentBloodGlucoseLevel: req.body.bloodGlucoseComment,
                    timeBloodGlucoseLevel: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueBloodGlucoseLevel: req.body.bloodGlucoseValue,
                        commentBloodGlucoseLevel: req.body.bloodGlucoseComment,
                        timeBloodGlucoseLevel: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
    }
    catch (e) {
        return next(e)
    }
}

const updateWeight = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueWeight: req.body.weightValue,
                    commentWeight: req.body.weightComment,
                    timeWeight: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueWeight: req.body.weightValue,
                        commentWeight: req.body.weightComment,
                        timeWeight: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
    }
    catch (e) {
        return next(e)
    }
}

const updateExercise = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueExercise: req.body.exerciseValue,
                    commentExercise: req.body.exerciseComment,
                    timeExercise: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueExercise: req.body.exerciseValue,
                        commentExercise: req.body.exerciseComment,
                        timeExercise: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
    }
    catch (e) {
        return next(e)
    }
}

const updateInsulin = async (req, res, next) => {
    try {
        if (req.user.onModel == 'Clinician') {
            res.redirect('/clinician/dashboard')
        } 
        else {
            today = getDateTime()
            if (healthData === null) {
                newHealthData = await HealthDataEntry.insertMany({
                    date: today.slice(0, 10),
                    valueDosesOfInsulinTaken: req.body.dosesOfInsulinValue,
                    commentDosesOfInsulinTaken: req.body.dosesOfInsulinComment,
                    timeDosesOfInsulinTaken: displayDate(today)
                })
                newId = newHealthData[0]._id
                await Patient.findOneAndUpdate(
                    {_id: patient._id},
                    {$push: {
                        patientHealthEntries: newId
                    }}
                ).lean()
            }
            else {
                await HealthDataEntry.findOneAndUpdate(
                    {_id: healthData._id},
                    {$set: {
                        valueDosesOfInsulinTaken: req.body.dosesOfInsulinValue,
                        commentDosesOfInsulinTaken: req.body.dosesOfInsulinComment,
                        timeDosesOfInsulinTaken: displayDate(today)
                    }}
                ).lean()
            }
            return res.redirect('/patient/edit-data')
        }
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
    getPatientUser,
    getPatientUserEdit,
    getLeaderboard,
    getPatientSettings,
    getPatientChangePassword,
    updateBloodGlucose,
    updateWeight,
    updateExercise,
    updateInsulin,
    getHealthData,
    turnOnDarkMode,
}
