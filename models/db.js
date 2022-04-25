const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    /* for db login */
    require('dotenv').config()
}

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'info30005'
})

const db = mongoose.connection.on('error', err => {
    console.error(err);
    process.exit(1)
})

db.once('open', async() => {
    console.log(`Mongo connection started on ${db.host}:${db.port}`)
})


require('./clinician')
require('./patient')
require('./healthData')
