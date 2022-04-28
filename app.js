const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        isEq: (x, y) => x == y
    }
}))

app.set('view engine', 'hbs')


/* ------------------------------------------------------------------------- */
/* debugger, log message */
app.use((req, res, next) => {
    console.log('msg: ' + req.method + req.path)
    next()
})


/* ========================================================================= */
const PORT = process.env.PORT || 8080
const HOSTNAME = ''

/* Routers */
const adminRouter = require('./routes/adminRouter')
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

/* Patient */
app.use('/patient', patientRouter)

/* Clinician */
app.use('/clinician', clinicianRouter)

/* ------------------------------------------------------------------------- */
app.listen(PORT, HOSTNAME => {
    console.log('Diabetes@Home is listening on port ' + PORT)
})
