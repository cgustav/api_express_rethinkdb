const isEmpty = require('../../lib/queryValidator')
const findOrCreate = require('../../lib/findOrCreate')

const {
    hashThis
} = require('../../lib/hash_util')

const {
    user
} = require('../models/index')

const user_controller = {

    list: async(req, res) => {
        let data = await user.getAllView()

        return res.status(200).json(data)
    },

    search: async(req, res) => {

        let username = req.param('username')
        try {

            let data = await user.getView(username)

            if (!data) return res.send(404)
            else return res.status(200).send(data)

        } catch (error) {
            //console.log('controller ERROR: ', error)
            res.status(500).send("Internal Error")
        }
    },

    create: async(req, res) => {
        try {


            let email = req.body.email;
            let name = req.body.name;
            let username = req.body.username;
            let password = req.body.password;

            if (isEmpty(email, name, username, password)) return res.send("Empty fields!").status(400)

            let _user = {
                email,
                name,
                username,
                auth: {
                    password
                },
            }

            let data = await user.getUserBy('username', username);

            if (data) return res.status(400).send('ERROR: Existing username!')
            else data = await user.getUserBy('email', email);

            if (data) return res.status(400).send('ERROR: Existing email!')
                //_user.auth.password = await hashThis(password)

            let created_user = await new user(_user).save()

            return res.json({
                title: 'User created',
                content: created_user
            }).status(200)


        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }

    },

    update: async(req, res) => {

    }

};

module.exports = user_controller;