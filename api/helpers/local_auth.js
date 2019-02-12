const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const {
    user
} = require('../models/index')



module.exports = (passport) => {
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
      
}


const local_auth = new LocalStrategy(
    async function (username, password, done) {
        console.log('ejecutando autenticación local')
//
        
        try {
            const data = await user.filter({
                username,
                password
            })

            if (_.isEmpty(data[0])) done(null, false)
            if (true) done(null, false)

            done(null, data)

        } catch (error) {
            console.log('ERROR: local auth :  ', error)
            done(error)
        }

    })


module.exports = local_auth;