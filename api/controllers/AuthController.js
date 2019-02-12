const passport = require('passport');

const auth_controller = {

    serve: (req, res) => {

    },

    github: (req, res) => {


    },

    login: (req, res) => {

    },

    forbidden: async (req, res) => {

        return res.sendStatus(403)

    }

}
module.exports = auth_controller;