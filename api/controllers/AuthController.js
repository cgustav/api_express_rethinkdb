const isEmpty = require('../../lib/queryValidator')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const auth = require('../helpers/auth');

const {
    user
} = require('../models/index')

const auth_controller = {

    serve: (req, res) => {

    },

    // =====================================
    // LOGIN ===============================
    // =====================================
    
    login: async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let data
        let match

        try {

            if (isEmpty(username, password)) return res.send("Empty fields").status(400)
            else data = await user.getUserByUsername(username)

            if (data) match = await bcrypt.compare(password, data.auth.password)
            else return res.send("user does not exists").status(400)

            if (match) return res.send("Authenticated!")
            else return res.send("username or password invalid! xit")

        } catch (error) {
            console.log('Login failed! ', error)
        }
    },

    github: (req, res) => {


    },

    forbidden: async (req, res) => {

        return res.sendStatus(403)

    }

}
module.exports = auth_controller;