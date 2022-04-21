const cdb = require('../models/clinicians')

const getClinician = (req, res) => {
    const data = cdb.find(data => data.id === req.params.userId)

    if (data) {
        res.send(data)
    }
    else {
        res.send([])
    }
}

module.exports = {
    getClinician
}
