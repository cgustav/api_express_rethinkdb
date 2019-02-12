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
    const methodOverride = require('method-override')

    app.use(logger('dev'))
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(methodOverride())

    /*=============================================
    =                     AUTH                    =
     =============================================*/
    const passport = require('passport')

    //const passportConfig = require('./passport')
    //passportConfig(app)

    require('./passport')(passport)
    app.use(passport.initialize())
    app.use(passport.session())

    /*=============================================
    =                 ROUTING                     =
    =============================================*/
    const router = require('./routes')


    router(app)



    return app
}