const logger = require('morgan')
const body_parser = require('body-parser')
const router = require('./routes')
const dotenv = require('dotenv').config()

module.exports = app => {


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