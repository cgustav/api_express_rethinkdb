const express = require('express');
const router = express.Router();
//const passport = require('passport');//deprecated
//controllers
const users = require('../api/controllers/UsersController');
const auth = require('../api/controllers/AuthController');
const home = require('../api/controllers/HomeController');
//helpers
const policy = require('../api/helpers/policy');

module.exports = app => {

    /*=============================================
    =                   HOME                     =
    =============================================*/
    router.get('/', home.home)


    /*=============================================
    =                   LOGIN                     =
    =============================================*/
    router.get('/login', auth.serve)
    router.post('/login', policy.handler('local', '/forbidden'),
        policy.callback('/success'), auth.login)

    router.get('/success', auth.success)
    router.get('/forbidden', auth.forbidden)


    /*=============================================
    =                   OAUTH                     =
    =============================================*/
    router.get('/auth/github', policy.apply('github'), auth.github)

    router.get('/auth/github/callback', policy.handler('github', '/forbidden'),
        policy.callback('/success'), auth.github)

    /*=============================================
    =                   USERS                     =
    =============================================*/
    router.get('/users/', users.list)
    router.get('/users?username=:username', users.search)
    router.get('/users/:username', users.search)
    router.post('/users/', users.create)
    router.patch('/users/:username', users.update)

    app.use(router)
}