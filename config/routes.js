const express = require('express');
const router = express.Router();
//controllers
const users = require('../api/controllers/UsersController');
const auth = require('../api/controllers/AuthController');
const home = require('../api/controllers/HomeController');
//helpers
const policy = require('../api/policies/policy');
const isAuth = require('../api/policies/isAuth')

module.exports = app => {

    /*=============================================
    =                   HOME                     =
    =============================================*/
    router.get('/', home.home)

    /*=============================================
    =                   LOGIN                     =
    =============================================*/
    router.get('/login', )
    router.post('/login', auth.login)

    /*=============================================
    =                   OAUTH                     =
    =============================================*/
    app.get('/auth/github', policy.apply('github'))
    app.get('/auth/github/callback', auth.gitHubCB)

    app.get('/auth/gitlab', policy.apply('gitlab'))
    app.get('/auth/gitlab/callback', auth.gitLabCB)

    /*=============================================
    =                   USERS                     =
    =============================================*/
    router.get('/users/', isAuth, users.list)
    router.get('/users?username=:username', users.search)
    router.get('/users/:username', users.search)
    router.post('/users/', users.create)
    router.patch('/users/:username', isAuth, users.update)

    app.use(router)
}