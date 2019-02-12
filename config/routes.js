const express = require('express');
const router = express.Router();

//controllers
const users = require('../api/controllers/UsersController');
const auth = require('../api/controllers/AuthController');
const home = require('../api/controllers/HomeController');

module.exports = app => {

    /*=============================================
    =                   HOME                     =
    =============================================*/
    router.get('/', home.home)


    /*=============================================
    =                   LOGIN                     =
    =============================================*/

    router.get('/login', auth.serve)
    router.post('/login', auth.login)
    router.get('/success', home.success)
    router.get('/forbidden', auth.forbidden)

    /*=============================================
    =                   OAUTH                     =
    =============================================*/

    router.get('/oauth/github', auth.github)


    /*=============================================
    =                   USERS                     =
    =============================================*/
    router.get('/users/', users.list)
    router.get('/users?username=:username', users.search)
    router.get('/users/:username', users.search)
    router.post('/users/', users.create)

    app.use(router)
}