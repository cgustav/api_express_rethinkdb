const express = require('express');
const router = express.Router();
const passport = require('passport'); //deprecated
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
    router.post('/login', policy.complexHandler('local', '/forbidden', '/success'))

    router.get('/success', auth.success)
    router.get('/forbidden', auth.forbidden)


    /*=============================================
    =                   OAUTH                     =
    =============================================*/
    app.get('/auth/github', policy.apply('github'))
    app.get('/auth/github/callback', policy.complexHandler('github', '/forbidden', '/success'))
   
    app.get('/auth/gitlab', policy.apply('gitlab'))
    app.get('/auth/gitlab/callback', policy.complexHandler('gitlab', '/forbidden', '/success'))

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