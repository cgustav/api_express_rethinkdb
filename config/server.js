const dotenv = require('dotenv').config()

module.exports = app => {

    /*=============================================
    =                 DATASTORE                   =
    =============================================*/
    const db = require('./database')
    const models = require('./models')


    db.ready();
    models.init();

    /*=============================================
    =                 MIDDLEWARE                 =
    =============================================*/
    const logger = require('morgan')
    const bodyParser = require('body-parser')
    const cookieParser = require('cookie-parser');


    app.use(logger('dev'))
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.use(cookieParser())

    /*=============================================
    =                     AUTH                    =
     =============================================*/
    const passportConfig = require('./passport')
    passportConfig(app)

    /*=============================================
    =                 ROUTING                     =
    =============================================*/
    const router = require('./routes')


    router(app)



    return app
}