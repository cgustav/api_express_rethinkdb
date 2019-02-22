const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const {
    user
} = require('../api/models/index')

module.exports = (app) => {

    app.use(passport.initialize());
    //app.use(passport.session());

    /*=============================================
    =                LOCAL STRATEGY              =
    =============================================*/

    console.log('configuring weas')

    passport.use(new LocalStrategy({
        usernameField: 'username'
    }, async(username, password, done) => {
        console.log('executing local strategy')
        try {

            let match
            let data = await user.getUserBy('username', username)

            if (data) match = await bcrypt.compare(password, data.auth.password)
            if (match) return done(null, data)

            return done(null, false, {
                errors: 'username or password is invalid'
            })

        } catch (error) {
            console.log('passport cannot validate :  ', error)
            done(null, false, {
                errors: 'fatal server response'
            })
        }
    }));

    /*=============================================
     =                OTHER STRATEGY              =
    =============================================*/

    //console.log('ejecutando passport!')

}