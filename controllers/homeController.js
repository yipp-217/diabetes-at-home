const getHome = (req, res) => {
    res.render('index.hbs')
}

const getAboutDiabetes = (req, res) => {
    res.render('about_diabetes.hbs')
}

const getAboutWebsite = (req, res) => {
    res.render('about_website.hbs')
}

module.exports = {
    getHome,
    getAboutDiabetes,
    getAboutWebsite
}
