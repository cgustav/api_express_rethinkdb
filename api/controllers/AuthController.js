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
    }, (err, user, info) => {
        try {

            if ((err) || (!user)) return res.status(400).send({
                message: info.message,
                user
            });

            let options = {
                issuer: 'My API info',
                subject: 'me@example.com',
                audience: 'http://this.api'
            }

            let token = jwtSign(user, options)

            if (token.error) return res.serverError(token.error)

            let response = {
                user,
                token
            }

            return res.send(response).status(200) //OK

        } catch (error) {
            //console.log(error)
            return res.status(500).send(error) //TODO improve responses
        }
    })(req, res)
}
module.exports = auth_controller;