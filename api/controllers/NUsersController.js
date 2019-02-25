const isEmpty = require('../../lib/queryValidator')
    //const findOrCreate = require('../../lib/findOrCreate')
const {
    r,
    think
} = require('../../config/database');

const {
    USER
} = require('../models/index')

const user_controller = {

    list: async(req, res) => {
        let data = await USER.getAllView()

        return res.status(200).json(data)
    },

    search: async(req, res) => {

        let username = req.param('username')
        try {

            let data = await USER.getView(username)

            if (!data) return res.sendStatus(404)
            else return res.status(200).send(data) //found

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

            let data = await USER.filter(r.row('username').eq(username)
                .or(r.row('email').eq(email)))

            if (data[0])
                return res.status(409).send('ERROR: Existing username/email!') //conflict

            let created_user = await new USER(_user).save()

            return res.status(201).json({
                    title: 'User created',
                    content: created_user
                }) //created!


        } catch (error) {
            console.log(error)
            return res.sendStatus(500) //Internal error
        }

    },

    update: async(req, res) => {
        try {


            let credentials = req.auth_user
            let username = req.params.username

            let data = await USER.getUserBy('username', username)

            if (!data) return res.sendStatus(404) //Not found

            if (credentials.username != username) {
                if (!data.isDeveloper) return res.sendStatus(403) //Forbidden
            }

            let body = req.body
            let container = require('../../lib/fieldParser')(body, res)

            if (container === null) return; //stop context code 
            //error responses came from fieldParser function

            let match_user
            if (container.username) {
                match_user = await USER.getUserBy('username', container.username)

                if (match_user)
                    return res.status(400).send("input username already exists")

            } else if (container.email) {
                match_user = await USER.getUserBy('email', container.email)

                if (match_user)
                    return res.status(400).send("input email already exists")
            }

            console.log('El container es :', container)

            let newObject = await data.update(container)

            console.log('El nuevo objeto es :', newObject)
                //console.log("ESTO NO SE DEBE EJECUTAR")
            return res.status(200).send("todo pulento")


        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }


};

module.exports = user_controller;