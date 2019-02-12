const passport = require('passport');
const local_trategy = require('passport-local');

module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());


    console.log('ejecutando passport!')
    


}