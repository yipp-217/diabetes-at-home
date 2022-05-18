const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongooseClient = require('./models/db')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        isEq: (x, y) => x === y,
        checkThreshold: (data, min, max) => data < min || data > max,
        getValue: (dict, key) => {return dict[key]},
        getBadge: (engagement) => engagement >= 80
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
/* ==========================================CLEAN==========================================*/
app.use(
    session({
        
        secret: process.env.SESSION_SECRET,
        name: 'Diabetes@Home', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
        store: MongoStore.create({ clientPromise: mongooseClient })
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
const userRouter = require('./routes/userRouter')
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


/* User */
app.use('/user', userRouter)

/* Patient */
app.use('/patient', patientRouter)

/* Clinician */
app.use('/clinician', clinicianRouter)

/* ------------------------------------------------------------------------- */
app.listen(PORT, HOSTNAME => {
    console.log('Diabetes@Home is listening on port ' + PORT)
})
