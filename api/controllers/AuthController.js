const isEmpty = require('../../lib/queryValidator')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const auth = require('../helpers/auth');

const {
    user
} = require('../models/index')

const auth_controller = {

    serve: (req, res) => {
        return res.send("In maintainance").status('500')
    },

    // =====================================
    // LOGIN ===============================
    // =====================================

    login: async (req, res) => {
        res.sendStatus(300)
    },

    // =====================================
    // GITHUB OAUTH ========================
    // =====================================
    github: (req, res) => {


    },

    forbidden: async (req, res) => {

        return res.sendStatus(403)

    },
    success: async (req, res) => {

        return res.send("authenticated!").status(200)

    }

}
module.exports = auth_controller;