const express = require('express');
const router = express.Router();

//controllers
const users = require('../api/controllers/UsersController');
const auth = require('../api/controllers/AuthController');
const home = require('../api/controllers/HomeController');

module.exports = app => {
    router.get('/', home.host)
    router.get('/login', auth.serve)
    router.post('/login', auth.login)
    router.get('/users/:username', users.search)
    router.get('/users/', users.list)
    router.post('/users/', users.create)

    app.use(router)
}