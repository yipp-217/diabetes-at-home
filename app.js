const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')


/* ------------------------------------------------------------------------- */
/* debugger, log message */
app.use((req, res, next) => {
    console.log('msg: ' + req.method + req.path)
    next()
})


/* ========================================================================= */
const PORT = 8080
const HOSTNAME = ''

/* Routers */
const homeRouter = require('./routes/homeRouter')

/* ========================================================================= */
/* Root & Home */
app.use('/', homeRouter)


/* ------------------------------------------------------------------------- */
app.listen(PORT, HOSTNAME => {
    console.log('Diabetes@Home is listening on port ' + PORT)
})
