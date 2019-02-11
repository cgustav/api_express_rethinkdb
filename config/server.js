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
    const body_parser = require('body-parser')

    app.use(logger('dev'))
    app.use(body_parser.urlencoded({
        extended: true
    }));
    app.use(body_parser.json());



    /*=============================================
    =                 ROUTING                     =
    =============================================*/
    const router = require('./routes')


    router(app)



    return app
}