const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        isEq: (x, y) => x == y,
        checkThreshold: (data, min, max) => data < min || data > max,
        displayDate: (x) => {
            const time = x.substring(11, 16);
            const which12hour = x.substring(19);
            return time.concat(which12hour);
        }
    }
}))

app.set('view engine', 'hbs')


/* ------------------------------------------------------------------------- */
/* get env for session secret */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


/* ------------------------------------------------------------------------- */
/* debugger, log message */
app.use((req, res, next) => {
    console.log('msg: ' + req.method + req.path)
    next()
})

// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash())

// Track authenticated users through login sessions
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        
        secret: process.env.SESSION_SECRET,
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}

// Initialise Passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'))

/* ========================================================================= */
const PORT = process.env.PORT || 8080
const HOSTNAME = ''

/* Routers */
const adminRouter = require('./routes/adminRouter')
const apiRouter = require('./routes/apiRouter')

const homeRouter = require('./routes/homeRouter')
const patientRouter = require('./routes/patientRouter')
const clinicianRouter = require('./routes/clinicianRouter')

/* Models */
require('./models/db')


/* ========================================================================= */
/* Root & Home */
app.use('/', homeRouter)

/* Admin for api testing and reset database */
app.use('/admin', adminRouter)

/* For testing api */
app.use('/api', apiRouter)

/* Patient */
app.use('/patient', patientRouter)

/* Clinician */
app.use('/clinician', clinicianRouter)

/* ------------------------------------------------------------------------- */
app.listen(PORT, HOSTNAME => {
    console.log('Diabetes@Home is listening on port ' + PORT)
})
