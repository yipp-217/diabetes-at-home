if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'diabetes-at-home'
})

const db = mongoose.connection.on('error', err => {
    console.error(err);
    process.exit(1)
})
