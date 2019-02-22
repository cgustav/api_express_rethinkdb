const passport = require('passport')
const auth = require('../helpers/jwtSign');
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

    login: async(req, res) => {

        return passport.authenticate('local', {
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
    },

    // =====================================
    // GITHUB OAUTH ========================
    // =====================================
    github: (req, res) => {


    },
    githubCB: (req, res) => {
        return res.send("All Ok").status(200)

    },
    forbidden: async(req, res) => {

        return res.sendStatus(403)

    },
    success: async(req, res) => {

        return res.send("authenticated!").status(200)

    }

}
module.exports = auth_controller;