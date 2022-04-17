// Import express
const express = require('express')

// Set your app up as an express app
const app = express()

// Set up Handlebars
app.use(express.static(__dirname + '/public'))
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        isEq: (x, y) => x == y
    }
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/about_diabetes', (req, res) => {
    res.render('about_diabetes.hbs', {context: {
        'login': false,
        'page': 'about_diabetes'
    }})
})

app.get('/about_website', (req, res) => {
    res.render('about_website.hbs', {context: {
        'login': false,
        'page': 'about_website'
    }})
})

app.get('/login', (req, res) => {
    res.render('login.hbs', {context: {
        'login': false,
        'page': 'login'
    }})
})

app.get('/change_password', (req, res) => {
    res.render('change_password.hbs')
})

app.get('/clinician_data_history', (req, res) => {
    res.render('clinician_data_history.hbs')
})

app.get('/clinician_patient_notes', (req, res) => {
    res.render('clinician_patient_notes.hbs')
})

app.get('/patient_leaderboard', (req, res) => {
    res.render('patient_leaderboard.hbs', {context: {
        'login': true,
        'page': 'patient_leaderboard'
    }})
})

app.get('/patient_edit_data', (req, res) => {
    res.render('patient_edit_data.hbs', {context: {
        'login': true,
        'page': 'patient_edit_data'
    }})
})

app.get('/patient_main', (req, res) => {
    res.render('patient_main.hbs', {context: {
        'login': true,
        'page': 'patient_main'
    }})
})

app.post('/patient_main', (req, res) => {
    res.render('patient_main.hbs', {context: {
        'login': true,
        'page': 'patient_main'
    }})
})

app.get('/patient_messages', (req, res) => {
    res.render('patient_messages.hbs', {context: {
        'login': true,
        'page': 'patient_messages'
    }})
})

// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(3000, () => {
    console.log('Diabetes@Home app is listening on port 3000!')
});

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req,res,next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})
