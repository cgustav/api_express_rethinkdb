const passport = require('passport')
const auth = require('../helpers/jwt');

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
        passport.authenticate('local', function(err, user, info) {
            console.log("en el login")
            try {


                if ((err) || (!user)) return res.status(400).send({
                    message: info.message,
                    user
                });


                //   let response = {
                //     user,
                //     token
                //   }

                return res.send(response).status(200) //OK
            } catch (error) {
                console.log(error)
                return res.send("OUCH").status(500)
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