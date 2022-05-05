const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Hardcode user for now
const USER = { id: 003, username: 'PEEPEE', password: '123', secret: 'shhh' }

// serialize
passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user.id)
})

// desserialize
passport.deserializeUser((userId, done) => {
    // match with hardcoded user
    if (userId === USER.id) {
        done(undefined, USER)
    } else {
        done(new Error('Bad User'), undefined)
    }
})

// local authentication strategy for Passport
passport.use(
    new LocalStrategy((username, password, done) => {
        // check if user exists and password matches the hash (hardcoded)
        if (username !== USER.username || password !== USER.password) {
            return done(undefined, false, {
                message: 'Incorrect username/password',
            })
        }
        // return user in callback
        return done(undefined, USER)
    })
)

module.exports = passport