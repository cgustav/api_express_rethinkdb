const passport = require('passport')
const jwtSign = require('../helpers/jwtSign')

const {
    user
} = require('../models/index')

const auth_controller = {

    serve: (req, res) => {
        return res.send("In maintainance").status(500)
    },

    // =====================================
    // LOGIN ===============================
    // =====================================

    login: async (req, res) => {
        passportHandler('local', req, res)

    },

    // =====================================
    // GITHUB OAUTH ========================
    // =====================================

    gitHubCB: (req, res) => {
        passportHandler('github', req, res)

    },

    // =====================================
    // GITLAB OAUTH ========================
    // =====================================

    gitLabCB: (req, res) => {
        passportHandler('gitlab', req, res)

    },


}

function passportHandler(strategyName, req, res) {
    return passport.authenticate(strategyName, {
        session: false
    }, async(err, _user, info) => {
        try {

            if ((err) || (!_user)) return res.status(400).send({
                message: info.message,
                user
            }); //BAD REQUEST

            if (_user.isDisabled) return res.sendStatus(404) //Banned

            //TODO modifications
            if (!_user.isActive) {
                await user.update(_user.id,{
                    isActive: true,
                    lastUpdateAt: new Date()
                })
                _user.isActive = true
                console.log(`user turned to active: ${_user.isActive}`)
            }

            let options = {
                issuer: 'My API info',
                subject: 'me@example.com',
                audience: 'http://this.api'
            }

            let token = jwtSign(_user, options)

            let response = {
                user:_user,
                token
            }

            return res.send(response).status(200) //OK

        } catch (error) {
            console.log(error)
            //if(error.name) console.log(error.name)
            return res.sendStatus(500) //TODO improve responses
        }
    })(req, res)
}
module.exports = auth_controller;