const logger = require('morgan')
const body_parser = require('body-parser')
const router = require('./routes')
// const prob =  require('../lib/probing')
// const _probe = new prob()
const dotenv = require('dotenv').config()
const db = require('./database')
const models =  require('./models')

module.exports = app => {

    models.init()
    db.ready()

    /*=============================================
    =                 MIDDLEWARE                 =
    =============================================*/

    app.use(logger('dev'))
    app.use(body_parser.urlencoded({
        extended: false
    }));
    app.use(body_parser.json());


    router(app)



    return app
}