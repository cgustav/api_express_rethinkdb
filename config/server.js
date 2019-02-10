const logger = require('morgan')

module.exports = app => {


    /*=============================================
    =                 MIDDLEWARE                 =
    =============================================*/
    app.use(logger('dev'))

    return app
}