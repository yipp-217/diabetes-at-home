const passport = require('passport')
const {User} = require('./models/user')
const LocalStrategy = require('passport-local').Strategy
/* ==========================================CLEAN==========================================*/
// serialize
passport.serializeUser((user, done) => {
    done(undefined, user._id)
})

// desserialize
passport.deserializeUser((userId, done) => {
    User.findById(userId, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined)
        }
        return done(undefined, user)
    })
})

// local authentication strategy for Passport
passport.use(
    new LocalStrategy((email, password, done) => {
        User.findOne({ email }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password',
                })
            }

            // Check password
            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect username or password',
                    })
                }
            
                // If user exists and password matches the hash in the database
                return done(undefined, user)
            })
        })
    })
)
/* ==========================================CLEAN==========================================*/
/*
User.find({}, (err, users) => {
    User.create({ email: 'user', password: 'hashed!', secret: "N^T_ev6D-+Pus4T5fB?z6&dM9YQ?fPtC", nameFamily: "testFam", nameScreen: "usertest" }, (err) => {
        if (err) { console.log(err); return; }
        console.log('Dummy user inserted')
    })
})*/


module.exports = passport