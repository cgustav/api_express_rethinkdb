const passport = require('passport')

const policy = {
    //Apply passport any strategy
    apply: function (strategyName) {
        return passport.authenticate(strategyName)
    },
    //Setup one handler for selected strategy
    handler: function (strategyName, failureRedirect) {
        return passport.authenticate(strategyName, {
            failureRedirect // : failureRedirect
        })
    },
    //Calllback strategy
    callback: function (successRedirect) {
        return function (req, res) {
            //console.log('[log] USER LOGGING: ', req.body.username)
            res.redirect(successRedirect)
        }
    },


    //DONT USE THESE METHODS YET (EXPERIMENTAL)
    complexApply: function (strategyName, failureFlashMessage) {
        return passport.authenticate(strategyName, {
            failureFlash: failureFlashMessage
        });
    },
    //For more complex passport auth algorithm: incomplete
    complexHandler: function (strategyName, failureRedirect, successRedirect) {
        passport.authenticate(strategyName, {
            successRedirect,
            failureRedirect,
            failureFlash: true
        })

    }


}



module.exports = policy