const getHome = (req, res) => {
    res.render('index.hbs')
}

const getLogin = (req, res) => {
    res.render('login.hbs')
}

const getAboutDiabetes = (req, res) => {
    res.render('about_diabetes.hbs')
}

const getAboutWebsite = (req, res) => {
    res.render('about_website.hbs')
}

module.exports = {
    getHome,
    getLogin,
    getAboutDiabetes,
    getAboutWebsite
}
