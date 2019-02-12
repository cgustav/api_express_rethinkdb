const isEmpty = require('../../lib/queryValidator')
const {
    hashThis
} = require('../../lib/hash_util')

const {
    user
} = require('../models/index')

const user_controller = {

    list: async (req, res) => {
        const data = await user.run()

        res.json(data).status(200)
    },

    search: async (req, res) => {
        const username = req.param('username')
        /* FIXME THIS
        const data = await user.filter({
            username
        })
        */
        //data = await user.getPublicDocument(username)

        return res.sendStatus(200)
    },

    create: async (req, res) => {

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
            }
        }

        let data = await user.filter({
            username: _user.username
        })

        if (isEmpty(data[0])) {
            data = await user.filter({
                email: _user.email
            })
        } else return res.send('ERROR: Existing username!').status(400)


        if (isEmpty(data[0])) {

            _user.auth.password = await hashThis(password)

            let created_user = await new user(_user).save()

            return res.json({
                title: 'User created',
                content: created_user
            }).status(200)

        } else return res.send('ERROR: Existing email!').status(400)

    }

};

module.exports = user_controller;